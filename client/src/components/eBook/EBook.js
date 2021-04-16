import React from "react";
import RSLangContext from "../context/context";
import styles from "./ebook.module.css";
import soundImage from "../../assets/sound.png";
import saveImage from "../../assets/floppy-disk.png";
import deleteImage from "../../assets/trash.png";
import leftArrowImage from "../../assets/left-arrow.png";
import rightArrowImage from "../../assets/right-arrow.png";
import settingsImage from "../../assets/settings.png";
import timesImage from "../../assets/remove.png";
import tickImage from "../../assets/check.png";
import savannahImage from "../../assets/savannah.png";
import sprintImage from "../../assets/agile.png";
import audioCallImage from "../../assets/headphone.png";
import Savanna from "../games/routes/savanna-g1/index";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
function EBook() {
  const {
    currentWordGroup,
    currentWordGroupPage,
    showWordTranslationAndTranslatedExampleSentence,
    showAddToHardOrDeletedWordsButtons,
    wordsToDisplay,
    showSettings,
    currentSection,
    allWords,
    dispatch,
  } = React.useContext(RSLangContext);
  const match = useRouteMatch();
  async function getWords() {
    let response = await fetch(
      `https://react-learnwords-example.herokuapp.com/words?group=${currentWordGroup}&page=${currentWordGroupPage}`
    );
    let data = await response.json();
    return data;
  }
  React.useEffect(() => {
    getWords().then((resp) =>
      dispatch({
        type: "WORDS_TO_DISPLAY_LOADED",
        payload: resp.map((word) => {
          if (allWords[word.group][word.word] === undefined) {
            dispatch({ type: "ADD_TO_ALL_WORDS", payload: word });
            return {
              ...word,
              isSavedWord: false,
              isDeletedWord: false,
              allTimeFound: 0,
              allTimeFailed: 0,
            };
          }
          return {
            ...word,
            isSavedWord: false,
            isDeletedWord: false,
            allTimeFound: allWords[word.group][word.word].allTimeFound,
            allTimeFailed: allWords[word.group][word.word].allTimeFailed,
          };
        }),
      })
    );
  }, [currentWordGroupPage, currentWordGroup]);

  return (
    <div className={styles.eBook}>
      {showSettings ? (
        <div className={styles.settings}>
          <div style={{ position: "relative" }}>
            <div className={styles.settingsButton}>
              <button
                style={{
                  width: "50px",
                  height: "40px",
                  backgroundColor: "inherit",
                }}
                onClick={() => {
                  dispatch({ type: "TOGGLE_SHOW_SETTINGS" });
                }}
              >
                <img
                  src={settingsImage}
                  alt="settings-icon"
                  style={{ width: "100%", height: "100%" }}
                />
              </button>
            </div>
            <h1>Настройки</h1>
            <div className={styles.settingsDivButtons}>
              <div className={styles.settingsButton}>
                <button
                  style={{
                    width: "50px",
                    height: "40px",
                    backgroundColor: "inherit",
                  }}
                  onClick={() => {
                    dispatch({ type: "TOGGLE_SHOW_SETTINGS" });
                  }}
                >
                  <img
                    src={settingsImage}
                    alt="settings-icon"
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
              </div>
              <p>
                {showWordTranslationAndTranslatedExampleSentence
                  ? "Показывать Перевод Слова и Перевод Предложения Со Словом"
                  : "Спрятать Перевод Слова и Перевод Предложения Со Словом"}
              </p>
              <button
                onClick={() => {
                  dispatch({ type: "TOGGLE_TRANSLATION_BUTTON" });
                }}
              >
                <img
                  src={
                    showWordTranslationAndTranslatedExampleSentence
                      ? tickImage
                      : timesImage
                  }
                  alt=""
                />
              </button>
            </div>
            <div className={styles.settingsDivButtons}>
              <p>
                {showAddToHardOrDeletedWordsButtons
                  ? "Показывать Кнопки 'Добавить в Сложные Слова' и 'Добавить в Удалённые Слова'"
                  : "Спрятать Кнопки 'Добавить в Сложные Слова' и 'Добавить в Удалённые Слова'"}
              </p>
              <button
                onClick={() => {
                  dispatch({ type: "TOGGLE_ADD_OR_DELETE_BUTTON" });
                }}
              >
                <img
                  src={
                    showAddToHardOrDeletedWordsButtons ? tickImage : timesImage
                  }
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={styles.wordList}>
        <div className={styles.navigation}>
          <nav>
            <ul>
              <li>
                <button
                  className={currentWordGroup === 0 ? styles.activeButton : ""}
                  onClick={() => {
                    dispatch({ type: "CHANGE_SUBSECTION", payload: 0 });
                  }}
                >
                  Раздел 1
                </button>
              </li>
              <li>
                <button
                  className={currentWordGroup === 1 ? styles.activeButton : ""}
                  onClick={() => {
                    dispatch({ type: "CHANGE_SUBSECTION", payload: 1 });
                  }}
                >
                  Раздел 2
                </button>
              </li>
              <li>
                <button
                  className={currentWordGroup === 2 ? styles.activeButton : ""}
                  onClick={() => {
                    dispatch({ type: "CHANGE_SUBSECTION", payload: 2 });
                  }}
                >
                  Раздел 3
                </button>
              </li>
              <li>
                <button
                  className={currentWordGroup === 3 ? styles.activeButton : ""}
                  onClick={() => {
                    dispatch({ type: "CHANGE_SUBSECTION", payload: 3 });
                  }}
                >
                  Раздел 4
                </button>
              </li>
              <li>
                <button
                  className={currentWordGroup === 4 ? styles.activeButton : ""}
                  onClick={() => {
                    dispatch({ type: "CHANGE_SUBSECTION", payload: 4 });
                  }}
                >
                  Раздел 5
                </button>
              </li>
              <li>
                <button
                  className={currentWordGroup === 5 ? styles.activeButton : ""}
                  onClick={() => {
                    dispatch({ type: "CHANGE_SUBSECTION", payload: 5 });
                  }}
                >
                  Раздел 6
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch({
                      type: "TOGGLE_SHOW_SETTINGS",
                    });
                  }}
                  className={
                    currentSection === "settings"
                      ? `${styles.activeButton}`
                      : ""
                  }
                >
                  Настройки Учебника
                </button>
              </li>
              <li>
                <input
                  type="number"
                  onChange={(event) => {
                    dispatch({
                      type: "CHANGE_PAGE",
                      payload: event.target.value,
                    });
                  }}
                  value={currentWordGroupPage + 1}
                  max="30"
                  min="1"
                  style={{
                    border: "none",
                    width: "40px",
                    ouline: "0px",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                />
              </li>
            </ul>
          </nav>
          {wordsToDisplay.length === 0 ? (
            <div style={{ textAlign: "center", color: "#000" }}>
              <h2>
                Вы переместиле все слова с текущей страницы в "Удалённые Слова"
              </h2>
            </div>
          ) : (
            ""
          )}
          {wordsToDisplay.map((word) => {
            const audio = new Audio(`${word.audio}`);
            const audioExample = new Audio(`${word.audioExample}`);
            const audioMeaning = new Audio(`${word.audioMeaning}`);
            return (
              <div
                className={`${styles.word} ${
                  word.isSavedWord ? `${styles.hardWord}` : ""
                }`}
                key={word.id}
              >
                <div className={styles.image}>
                  <img src={word.image} alt="image" />
                </div>
                <div className={styles.wordInfo}>
                  <div className={styles.wordInfoFirstRow}>
                    <p className={styles.wordTitle}>{word.word}</p>
                    <p className={styles.wordTranscription}>
                      {word.transcription}
                    </p>
                    <p>
                      <button
                        style={{
                          width: "30px",
                          height: "20px",
                          backgroundColor: "inherit",
                        }}
                        onClick={() => {
                          audio.play();
                          setTimeout(() => {
                            audioMeaning.play();
                          }, audio.duration * 1000 + 500);
                          setTimeout(() => {
                            audioExample.play();
                          }, audio.duration * 1000 + 1000 + audioMeaning.duration * 1000);
                        }}
                      >
                        <img
                          src={soundImage}
                          alt=""
                          style={{ width: "100%", height: "100%" }}
                        />
                      </button>
                      {showAddToHardOrDeletedWordsButtons ? (
                        <button
                          style={{
                            width: "30px",
                            height: "20px",
                            backgroundColor: "inherit",
                          }}
                          onClick={() => {
                            dispatch({
                              type: "TOGGLE_SAVED_WORD",
                              payload: word.id,
                            });
                          }}
                        >
                          <img
                            src={saveImage}
                            alt=""
                            style={{ width: "100%", height: "100%" }}
                          />
                        </button>
                      ) : (
                        ""
                      )}
                      {showAddToHardOrDeletedWordsButtons ? (
                        <button
                          style={{
                            width: "30px",
                            height: "20px",
                            backgroundColor: "inherit",
                          }}
                          onClick={() => {
                            dispatch({
                              type: "DELETE_WORD",
                              payload: word.id,
                            });
                          }}
                        >
                          <img
                            src={deleteImage}
                            alt=""
                            style={{ width: "100%", height: "100%" }}
                          />
                        </button>
                      ) : (
                        ""
                      )}
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <button
                          style={{
                            width: "30px",
                            height: "20px",
                            backgroundColor: "inherit",
                          }}
                          onClick={() => {
                            dispatch({
                              type: "OPEN_GAME_FROM_OUTSIDE",
                            });
                          }}
                        >
                          <Link to={`/games/savannah`}>
                            <img src={savannahImage} alt="" />
                          </Link>
                        </button>
                        <button
                          style={{
                            width: "30px",
                            height: "20px",
                            backgroundColor: "inherit",
                          }}
                          onClick={() => {
                            dispatch({
                              type: "OPEN_GAME_FROM_OUTSIDE",
                            });
                          }}
                        >
                          <Link to={`/games/sprint`}>
                            <img src={sprintImage} alt="" />
                          </Link>
                        </button>
                        <button
                          style={{
                            width: "30px",
                            height: "20px",
                            backgroundColor: "inherit",
                          }}
                          onClick={() => {
                            dispatch({
                              type: "OPEN_GAME_FROM_OUTSIDE",
                            });
                          }}
                        >
                          <Link to={`/games/audiochallenge`}>
                            <img src={audioCallImage} alt="" />
                          </Link>
                        </button>
                      </div>
                    </p>
                  </div>
                  <p style={{ fontWeight: "bold" }}>
                    {showWordTranslationAndTranslatedExampleSentence
                      ? word.wordTranslate
                      : ""}
                  </p>
                  <p dangerouslySetInnerHTML={{ __html: word.textMeaning }}></p>
                  {showWordTranslationAndTranslatedExampleSentence ? (
                    <p>{word.textMeaningTranslate}</p>
                  ) : (
                    ""
                  )}
                  <p
                    dangerouslySetInnerHTML={{ __html: word.textExample }}
                    style={{ fontStyle: "italic" }}
                  ></p>
                  <p>
                    {showWordTranslationAndTranslatedExampleSentence
                      ? word.textExampleTranslate
                      : ""}
                  </p>
                </div>
                <div className={styles.results}>
                  <h4>Результат в играх</h4>
                  <h5>
                    Угадано правильно : {word.allTimeFound} раз -{" "}
                    {word.allTimeFound === 0
                      ? 0
                      : (word.allTimeFound * 100) /
                        (word.allTimeFound + word.allTimeFailed)}{" "}
                    %
                  </h5>
                  <h5>
                    Угадано неправильно : {word.allTimeFailed} раз -{" "}
                    {word.allTimeFailed === 0
                      ? 0
                      : (word.allTimeFailed * 100) /
                        (word.allTimeFound + word.allTimeFailed)}{" "}
                    %
                  </h5>
                </div>
              </div>
            );
          })}
          <div className={styles.bottom}>
            <h3>Номер Страницы Слов : {currentWordGroupPage + 1}</h3>
            <button
              style={{
                width: "40px",
                height: "30px",
                backgroundColor: "inherit",
              }}
              onClick={() => {
                dispatch({ type: "DECREASE_PAGE_NUMBER" });
              }}
            >
              <img
                src={leftArrowImage}
                alt="left-arrow-icon"
                style={{ width: "100%", height: "100%" }}
              />
            </button>
            <button
              style={{
                width: "40px",
                height: "30px",
                backgroundColor: "inherit",
              }}
              onClick={() => {
                dispatch({ type: "INCREASE_PAGE_NUMBER" });
              }}
            >
              <img
                src={rightArrowImage}
                alt="right-arrow-icon"
                style={{ width: "100%", height: "100%" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EBook;
