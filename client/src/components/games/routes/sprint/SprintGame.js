import React from "react";
import styles from "./sprint.module.css";
import RSLangContext from "../../../context/context";
import soundImage from "../../../../assets/sound.png";
import tickImage from "../../../../assets/check.png";
function SprintGame() {
  const { statistics, dispatch, gameInfo } = React.useContext(RSLangContext);
  const { sprint } = statistics;
  const [foundWords, setFoundWords] = React.useState([]);
  const [failedWords, setFailedWords] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [points, setPoints] = React.useState(10);
  const [numberOfLights, setNumberOfLights] = React.useState([0, 0, 0]);
  const [birds, setBirds] = React.useState([1, 0, 0, 0]);
  const [stageSuccessInARow, setStageSuccesInARow] = React.useState(0);
  const [word, setWord] = React.useState("");
  const [translation, setTranslation] = React.useState("");
  const [showCorrectTranslation, setShowCorrectTranslation] = React.useState(
    true
  );
  const [foundCorrectInARow, setFoundCorrectInARow] = React.useState(0);
  const [next, setNext] = React.useState(0);
  const [countDown, setCountDown] = React.useState(60);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [showLevels, setShowLevels] = React.useState(gameInfo.showLevels);
  const [level, setLevel] = React.useState(gameInfo.wordGroup);
  const [page, setPage] = React.useState(gameInfo.page);
  const [wordNumber, setWordNumber] = React.useState(1);
  const [words, setWords] = React.useState([]);
  async function getWords() {
    let response = await fetch(
      `https://react-learnwords-example.herokuapp.com/words?group=${level}&page=${page}`
    );
    let data = await response.json();
    return data;
  }
  React.useEffect(() => {
    const intervalFunction = () => {
      if (countDown - 1 > 0 && !showLevels) {
        setCountDown(countDown - 1);
      } else if (showLevels) {
        setCountDown(60);
      } else {
        setCountDown(0);
        setIsPlaying(false);
        if (score > sprint.record) {
          dispatch({ type: "SET_NEW_SPRINT_RECORD", payload: score });
        }
      }
    };
    const interval = setInterval(intervalFunction, 1000);
    return () => clearInterval(interval);
  }, [countDown, dispatch, showLevels]);
  React.useEffect(() => {
    getWords().then((resp) => {
      setWords(resp);
    });
  }, [level]);
  React.useEffect(() => {
    console.log(wordNumber);
    if ((wordNumber + 1) % 20 === 0) {
      if (page + 1 < 30) {
        console.log(page + 1);
        setPage(page + 1);
        getWords().then((resp) => {
          setWords(resp);
          setShowCorrectTranslation(() => {
            if (Math.floor(Math.random() * 2) === 1) {
              const tempWord = words[wordNumber];
              setWord(tempWord);
              setTranslation(tempWord);
              return true;
            } else {
              const tempNumber = Math.floor(Math.random() * 19);
              setWord(words[tempNumber]);
              let translationIndex = Math.floor(Math.random() * 19);
              while (translationIndex === tempNumber) {
                translationIndex = Math.floor(Math.random() * 19);
              }
              setTranslation(words[translationIndex]);
              return false;
            }
          });
        });
      } else {
        setIsPlaying(false);
      }
    } else {
      getWords().then((resp) => {
        setWords(resp);
        setShowCorrectTranslation(() => {
          if (Math.floor(Math.random() * 2) === 1) {
            const tempWord = resp[wordNumber];
            setWord(tempWord);
            setTranslation(tempWord);
            return true;
          } else {
            const tempNumber = Math.floor(Math.random() * 19);
            setWord(resp[tempNumber]);
            let translationIndex = Math.floor(Math.random() * 19);
            while (translationIndex === tempNumber) {
              translationIndex = Math.floor(Math.random() * 19);
            }
            setTranslation(resp[translationIndex]);
            return false;
          }
        });
      });
    }
  }, [next]);
  return (
    <div className={styles.game_wrapper}>
      {showLevels ? (
        <div className={styles.levels}>
          <h2>Уровень Сложности</h2>
          <div>
            <button
              onClick={() => {
                setLevel(0);
                setShowLevels(false);
              }}
            >
              1
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setLevel(1);
                setShowLevels(false);
              }}
            >
              2
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setLevel(2);
                setShowLevels(false);
              }}
            >
              3
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setLevel(3);
                setShowLevels(false);
              }}
            >
              4
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setLevel(4);
                setShowLevels(false);
              }}
            >
              5
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setLevel(5);
                setShowLevels(false);
              }}
            >
              6
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {!isPlaying ? (
        <div className={styles.result}>
          <h1>{score} очков</h1>
          <h3>Ваш рекорд : {sprint.record} очков</h3>
          <div className={styles.wrongAnswers}>
            <h3>
              Ошибок{" "}
              <span className={styles.failedCount}>{failedWords.length}</span>
            </h3>
            {failedWords.map((word, index) => {
              return (
                <div className={styles.resultWord} key={index}>
                  <button
                    onClick={() => {
                      const audio = new Audio(`${word.audio}`);
                      audio.play();
                    }}
                    style={{
                      width: "30px",
                      height: "20px",
                      backgroundColor: "inherit",
                      margin: "10px",
                    }}
                  >
                    <img
                      src={soundImage}
                      alt="sound-icon"
                      style={{ width: "100%", height: "140%" }}
                    />
                  </button>
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {word.word} -{" "}
                    <i style={{ fontWeight: "lighter" }}>
                      {word.wordTranslate}
                    </i>
                  </span>
                </div>
              );
            })}
          </div>
          <div className={styles.wrongAnswers}>
            <h3>
              Правильно{" "}
              <span className={styles.foundCount}>{foundWords.length}</span>
            </h3>
            {foundWords.map((word, index) => {
              const audio = new Audio(`${word.audio}`);
              return (
                <div className={styles.resultWord} key={index}>
                  <button
                    onClick={() => {
                      audio.play();
                    }}
                    style={{
                      width: "30px",
                      height: "20px",
                      backgroundColor: "inherit",
                      margin: "10px",
                    }}
                  >
                    <img
                      src={soundImage}
                      alt="sound-icon"
                      style={{ width: "100%", height: "140%" }}
                    />
                  </button>
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {word.word} -{" "}
                    <i style={{ fontWeight: "lighter" }}>
                      {word.wordTranslate}
                    </i>
                  </span>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              setFoundWords([]);
              setFailedWords([]);
              setIsPlaying(true);
              setNumberOfLights([0, 0, 0]);
              setPoints(10);
              setScore(0);
              setCountDown(60);
              setFoundCorrectInARow(0);
              setBirds([1, 0, 0, 0]);
              setStageSuccesInARow(0);
            }}
          >
            Попробывать еще раз
          </button>
        </div>
      ) : (
        ""
      )}
      <div className={styles.score}>{score}</div>
      <div className={styles.countDown}>{countDown}</div>
      <div className={styles.game_display}>
        <div
          style={{
            background: `${
              stageSuccessInARow === 0
                ? "inherit"
                : stageSuccessInARow === 1
                ? "orange"
                : stageSuccessInARow === 2
                ? "brown"
                : "hotpink"
            }`,
            textAlign: "center",
          }}
        >
          <div className={styles.lights}>
            {numberOfLights.map((light, index) => {
              if (light === 1) {
                return (
                  <div
                    className={styles.light}
                    style={{
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <img src={tickImage} alt="checked" />
                  </div>
                );
              }
              return <div className={styles.light}></div>;
            })}
          </div>
          <div
            style={{
              paddingBottom: "5px",
              opacity: `${points !== 10 ? "1" : "0"}`,
            }}
          >
            {`+${points} очков за слово `}
          </div>
        </div>
        <div className={styles.birds}>
          {birds
            .filter((bird) => {
              return bird === 1;
            })
            .map((bird, index) => {
              return <div className={styles.bird} key={index}></div>;
            })}
        </div>
        <div className={styles.branch}></div>
        <div className={styles.word_section}>
          <div className={styles.word}>{word.word}</div>
          <div className={styles.word}>{translation.wordTranslate}</div>
        </div>
        <div className={styles.underline}></div>
        <div className={styles.answer_section}>
          <button
            className={styles.wrong}
            onClick={() => {
              dispatch({ type: "ADD_TO_LEARNING_WORDS", payload: word });
              if (showCorrectTranslation === false) {
                if (foundWords.length === 0) {
                  setFoundWords([word]);
                } else {
                  setFoundWords([...foundWords, word]);
                }
                if ((foundCorrectInARow + 1) % 4 === 0) {
                  if (points < 70) {
                    setPoints(20 * (stageSuccessInARow + 1) + 10);
                  }
                  if (JSON.stringify(birds) !== JSON.stringify([1, 1, 1, 1])) {
                    setBirds(() => {
                      let newBirds = [...birds];
                      newBirds.pop();
                      newBirds.unshift(1);
                      return newBirds;
                    });
                  }
                  setStageSuccesInARow(stageSuccessInARow + 1);
                }
                dispatch({
                  type: "INCREMENT_WORD_ALLTIMEFOUND",
                  payload: word,
                });
                setFoundCorrectInARow(foundCorrectInARow + 1);
                setScore(score + points);
                setNumberOfLights(() => {
                  if (stageSuccessInARow > 2) {
                    return [1];
                  } else if (
                    JSON.stringify(numberOfLights) ===
                      JSON.stringify([1, 1, 1]) &&
                    stageSuccessInARow < 2
                  ) {
                    return [0, 0, 0];
                  }
                  let newLights = [...numberOfLights];
                  newLights.pop();
                  newLights.unshift(1);
                  return newLights;
                });
              } else {
                dispatch({
                  type: "INCREMENT_WORD_ALLTIMEFAILED",
                  payload: word,
                });
                if (failedWords.length === 0) {
                  setFailedWords([word]);
                } else {
                  setFailedWords([...failedWords, word]);
                }
                setFoundCorrectInARow(0);
                setStageSuccesInARow(0);
                setNumberOfLights([0, 0, 0]);
                setPoints(10);
                setBirds([1, 0, 0, 0]);
              }
              setWordNumber(() => {
                if ((wordNumber + 1) % 20 === 0) {
                  return 1;
                } else {
                  return wordNumber + 1;
                }
              });
              setNext(next + 1);
            }}
          >
            Неверно
          </button>
          <button
            className={styles.correct}
            onClick={() => {
              if (showCorrectTranslation === true) {
                if (foundWords.length === 0) {
                  setFoundWords([word]);
                } else {
                  setFoundWords([...foundWords, word]);
                }
                if ((foundCorrectInARow + 1) % 4 === 0) {
                  if (points < 70) {
                    setPoints(20 * (stageSuccessInARow + 1) + 10);
                  }
                  if (JSON.stringify(birds) !== JSON.stringify([1, 1, 1, 1])) {
                    setBirds(() => {
                      let newBirds = [...birds];
                      newBirds.pop();
                      newBirds.unshift(1);
                      return newBirds;
                    });
                  }
                  setStageSuccesInARow(stageSuccessInARow + 1);
                }
                dispatch({
                  type: "INCREMENT_WORD_ALLTIMEFOUND",
                  payload: word,
                });
                setFoundCorrectInARow(foundCorrectInARow + 1);
                setScore(score + points);
                setNumberOfLights(() => {
                  if (stageSuccessInARow > 2) {
                    return [1];
                  } else if (
                    JSON.stringify(numberOfLights) ===
                      JSON.stringify([1, 1, 1]) &&
                    stageSuccessInARow < 2
                  ) {
                    return [0, 0, 0];
                  }
                  let newLights = [...numberOfLights];
                  newLights.pop();
                  newLights.unshift(1);
                  return newLights;
                });
              } else {
                dispatch({
                  type: "INCREMENT_WORD_ALLTIMEFAILED",
                  payload: word,
                });
                if (failedWords.length === 0) {
                  setFailedWords([word]);
                } else {
                  setFailedWords([...failedWords, word]);
                }
                setFoundCorrectInARow(0);
                setStageSuccesInARow(0);
                setNumberOfLights([0, 0, 0]);
                setPoints(10);
                setBirds([1, 0, 0, 0]);
              }
              setWordNumber(() => {
                if ((wordNumber + 1) % 20 === 0) {
                  return 1;
                } else {
                  return wordNumber + 1;
                }
              });
              setNext(next + 1);
            }}
          >
            Правильно
          </button>
        </div>
      </div>
    </div>
  );
}

export default SprintGame;
