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
function EBook() {
  const {
    currentWordGroup,
    currentWordGroupPage,
    showWordTranslationAndTranslatedExampleSentence,
    showAddToHardOrDeletedWordsButtons,
    wordsToDisplay,
    showSettings,
    savedWords,
    deletedWords,
    currrentSection,
    dispatch,
  } = React.useContext(RSLangContext);
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
          return { ...word, isSavedWord: false, isDeletedWord: false };
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
                  onClick={() => {
                    console.log(currrentSection, "deleted_words");
                    dispatch({
                      type: "CHANGE_CURRENT_SECTION",
                      payload: "learning_words",
                    });
                  }}
                  className={
                    currrentSection === "learning_words"
                      ? styles.activeButton
                      : ""
                  }
                >
                  Изучаемые Слова
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    console.log(currrentSection, "deleted_words");
                    dispatch({
                      type: "CHANGE_CURRENT_SECTION",
                      payload: "difficult_words",
                    });
                  }}
                  className={
                    currrentSection === "difficult_words"
                      ? styles.activeButton
                      : ""
                  }
                >
                  Сложные Слова
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    console.log(currrentSection, "deleted_words");
                    dispatch({
                      type: "CHANGE_CURRENT_SECTION",
                      payload: "deleted_words",
                    });
                  }}
                  className={
                    currrentSection == "deleted_words"
                      ? styles.activeButton
                      : ""
                  }
                >
                  Удаленные Слова
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
                    currrentSection === "settings"
                      ? `${styles.activeButton}`
                      : ""
                  }
                >
                  Настройки Э-Книги
                </button>
              </li>
            </ul>
          </nav>
          <div className={styles.sectionButtons}>
            <button
              className={currentWordGroup == 0 ? styles.activeButton : ""}
              onClick={() => {
                dispatch({ type: "CHANGE_SECTION", payload: 0 });
              }}
            >
              Раздел 1
            </button>
            <button
              className={currentWordGroup == 1 ? styles.activeButton : ""}
              onClick={() => {
                dispatch({ type: "CHANGE_SECTION", payload: 1 });
              }}
            >
              Раздел 2
            </button>
            <button
              className={currentWordGroup == 2 ? styles.activeButton : ""}
              onClick={() => {
                dispatch({ type: "CHANGE_SECTION", payload: 2 });
              }}
            >
              Раздел 3
            </button>
            <button
              className={currentWordGroup == 3 ? styles.activeButton : ""}
              onClick={() => {
                dispatch({ type: "CHANGE_SECTION", payload: 3 });
              }}
            >
              Раздел 4
            </button>
            <button
              className={currentWordGroup == 4 ? styles.activeButton : ""}
              onClick={() => {
                dispatch({ type: "CHANGE_SECTION", payload: 4 });
              }}
            >
              Раздел 5
            </button>
            <button
              className={currentWordGroup == 5 ? styles.activeButton : ""}
              onClick={() => {
                dispatch({ type: "CHANGE_SECTION", payload: 5 });
              }}
            >
              Раздел 6
            </button>
          </div>
          {wordsToDisplay.length === 0 ? (
            <div style={{ textAlign: "center", color: "#000" }}>
              <h2>
                Вы переместиле все слова с текущей страницы в "Удалённые Слова"
              </h2>
            </div>
          ) : (
            ""
          )}
          {wordsToDisplay.map((word, index) => {
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
              </div>
            );
          })}
          <div className={styles.bottom}>
            <p>Номер Раздела Слов : {currentWordGroup + 1}</p>
            <p>Номер Страницы Слов : {currentWordGroupPage + 1}</p>
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
