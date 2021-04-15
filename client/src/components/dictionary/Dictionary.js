import React from "react";
import styles from "./dictionary.module.css";
import RSLangContext from "../context/context";
import soundImage from "../../assets/sound.png";
import saveImage from "../../assets/floppy-disk.png";
import deleteImage from "../../assets/trash.png";
import leftArrowImage from "../../assets/left-arrow.png";
import rightArrowImage from "../../assets/right-arrow.png";
import settingsImage from "../../assets/settings.png";
import undoImage from "../../assets/undo.png";
function Dictionary() {
  const {
    currentSection,
    dispatch,
    savedWords,
    deletedWords,
    learningWords,
    showWordTranslationAndTranslatedExampleSentence,
    numberOfLearningWordsPages,
    numberOfDeletedWordsPages,
    numberOfSavedWordsPages,
    dictionaryInfo,
  } = React.useContext(RSLangContext);
  return (
    <div className={styles.dictionary}>
      <div className={styles.wordList}>
        <div className={styles.navigation}>
          <nav>
            <ul>
              <li>
                <button
                  onClick={(event) => {
                    dispatch({
                      type: "CHANGE_SECTION",
                      payload: event.target.id,
                    });
                  }}
                  className={
                    currentSection === "learning_words"
                      ? styles.activeButton
                      : ""
                  }
                  id="learning_words"
                >
                  Изучаемые Слова
                </button>
              </li>
              <li>
                <button
                  onClick={(event) => {
                    dispatch({
                      type: "CHANGE_SECTION",
                      payload: event.target.id,
                    });
                  }}
                  className={
                    currentSection === "difficult_words"
                      ? styles.activeButton
                      : ""
                  }
                  id="difficult_words"
                >
                  Сложные Слова
                </button>
              </li>
              <li>
                <button
                  onClick={(event) => {
                    dispatch({
                      type: "CHANGE_SECTION",
                      payload: event.target.id,
                    });
                  }}
                  className={
                    currentSection == "deleted_words" ? styles.activeButton : ""
                  }
                  id="deleted_words"
                >
                  Удаленные Слова
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {currentSection === "learning_words"
          ? learningWords
              .slice(
                dictionaryInfo.learningWordsStart,
                dictionaryInfo.learningWordsStop
              )
              .map((word) => {
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
                          {!word.isDeletedWord ? (
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
                          <button
                            style={{
                              backgroundColor: "inherit",
                            }}
                            onClick={() => {
                              dispatch({
                                type: `${
                                  word.isDeletedWord
                                    ? "RETURN_WORD"
                                    : "REMOVE_FROM_LEARNING_WORDS"
                                }`,
                                payload: word.id,
                              });
                            }}
                          >
                            <img src={undoImage} alt="" />
                          </button>
                        </p>
                        <p className={styles.section}>
                          {" "}
                          Раздел {word.group + 1}
                        </p>
                      </div>
                      <p style={{ fontWeight: "bold" }}>
                        {showWordTranslationAndTranslatedExampleSentence
                          ? word.wordTranslate
                          : ""}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{ __html: word.textMeaning }}
                      ></p>
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
              })
          : currentSection === "difficult_words"
          ? savedWords
              .slice(
                dictionaryInfo.savedWordsStart,
                dictionaryInfo.savedWordsStop
              )
              .map((word) => {
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
                        </p>
                        <p className={styles.section}>
                          {" "}
                          Раздел {word.group + 1}
                        </p>
                      </div>
                      <p style={{ fontWeight: "bold" }}>
                        {showWordTranslationAndTranslatedExampleSentence
                          ? word.wordTranslate
                          : ""}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{ __html: word.textMeaning }}
                      ></p>
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
              })
          : currentSection === "deleted_words"
          ? deletedWords
              .slice(
                dictionaryInfo.deletedWordsStart,
                dictionaryInfo.deletedWordsStop
              )
              .map((word) => {
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
                          <button
                            style={{
                              backgroundColor: "inherit",
                            }}
                            onClick={() => {
                              dispatch({
                                type: "RETURN_WORD",
                                payload: word.id,
                              });
                            }}
                          >
                            <img src={undoImage} alt="" />
                          </button>
                        </p>
                        <p className={styles.section}>
                          {" "}
                          Раздел {word.group + 1}
                        </p>
                      </div>
                      <p style={{ fontWeight: "bold" }}>
                        {showWordTranslationAndTranslatedExampleSentence
                          ? word.wordTranslate
                          : ""}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{ __html: word.textMeaning }}
                      ></p>
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
              })
          : ""}
        <div className={styles.bottom}>
          <h3>
            {currentSection === "learning_words"}
            {currentSection === "learning_words" && learningWords.length !== 0
              ? `Номер Страницы : ${numberOfLearningWordsPages}`
              : currentSection === "difficult_words" && savedWords.length !== 0
              ? `Номер Страницы : ${numberOfSavedWordsPages}`
              : currentSection === "deleted_words" && deletedWords.length !== 0
              ? `Номер Страницы : ${numberOfDeletedWordsPages}`
              : "Вы еще не добавили слов в текущий раздел вашего словаря ."}
          </h3>
          <button
            style={{
              width: "40px",
              height: "30px",
              backgroundColor: "inherit",
            }}
            onClick={() => {
              dispatch({
                type: `${
                  currentSection === "difficult_words"
                    ? "DECREASE_SAVED_WORDS_PAGE"
                    : currentSection === "learning_words"
                    ? "DECREASE_LEARNING_WORDS_PAGE"
                    : currentSection === "deleted_words"
                    ? "DECREASE_DELETED_WORDS_PAGE"
                    : ""
                }`,
              });
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
              dispatch({
                type: `${
                  currentSection === "difficult_words"
                    ? "INCREASE_SAVED_WORDS_PAGE"
                    : currentSection === "learning_words"
                    ? "INCREASE_LEARNING_WORDS_PAGE"
                    : currentSection === "deleted_words"
                    ? "INCREASE_DELETED_WORDS_PAGE"
                    : ""
                }`,
              });
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
  );
}

export default Dictionary;
