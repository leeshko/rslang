if (localStorage.getItem("state") === null) {
  localStorage.setItem(
    "state",
    JSON.stringify({
      showWordTranslationAndTranslatedExampleSentence: true,
      showAddToHardOrDeletedWordsButtons: true,
      currentWordGroup: 0,
      currentWordGroupPage: 0,
      wordsToDisplay: [],
      savedWords: [],
      deletedWords: [],
      learningWords: [],
      showSettings: false,
      currentSection: "learning_words",
      deletedPages: {},
      numberOfLearningWordsPages: 1,
      numberOfDeletedWordsPages: 1,
      numberOfSavedWordsPages: 1,
      dictionaryInfo: {
        learningWordsWordGroup: 0,
        learningWordsStart: 0,
        learningWordsStop: 0,
        deletedWordsWordGroup: 0,
        deletedWordsStart: 0,
        deletedWordsStop: 0,
        savedWordsWordGroup: 0,
        savedWordsStart: 0,
        savedWordsStop: 0,
      },
      allWords: {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
      },
      statistics: {
        wordsLearnt: 0,
        correctFound: 0,
        wrongFound: 0,
        sprint: {
          record: 0,
          allTimeFound: 0,
          allTimeFailed: 0,
        },
        savanna: {
          record: 0,
          allTimeFound: 0,
          allTimeFailed: 0,
        },
        audioCall: {
          record: 0,
          allTimeFound: 0,
          allTimeFailed: 0,
        },
        customGame: {
          record: 0,
          allTimeFound: 0,
          allTimeFailed: 0,
        },
      },
      gameInfo: {
        showLevels: true,
        wordGroup: 0,
        page: 0,
      },
    })
  );
}

export const defaultState = JSON.parse(localStorage.getItem("state"));

export const reducer = (state, action) => {
  switch (action.type) {
    case "WORDS_TO_DISPLAY_LOADED":
      let words = action.payload.filter((word) => {
        let isFound = false;
        for (let i = 0; i < state.deletedWords.length; i++) {
          if (state.deletedWords[i].id === word.id) {
            isFound = true;
            break;
          }
        }
        if (isFound) {
          return false;
        }
        return true;
      });
      words = words.map((word) => {
        for (let k = 0; k < state.savedWords.length; k++) {
          if (state.savedWords[k].id === word.id) {
            return { ...word, isSavedWord: true };
          }
        }
        return word;
      });
      localStorage.setItem(
        "state",
        JSON.stringify({ ...state, wordsToDisplay: words })
      );
      return { ...state, wordsToDisplay: words };
    case "TOGGLE_BUTTONS":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          showAddToHardOrDeletedWordsButtons: !state.showAddToHardOrDeletedWordsButtons,
        })
      );
      return {
        ...state,
        showAddToHardOrDeletedWordsButtons: !state.showAddToHardOrDeletedWordsButtons,
      };
    case "ADD_TO_LEARNING_WORDS":
      let isFound = false;
      let newLearnWords = state.learningWords;
      for (let i = 0; i < newLearnWords.length; i++) {
        if (newLearnWords[i].id === action.payload.id) {
          isFound = true;
          break;
        }
      }
      if (isFound) {
        return { ...state };
      }
      newLearnWords.push(action.payload);
      newLearnWords = newLearnWords.sort((a, b) => a.group - b.group);
      return { ...state, learningWords: newLearnWords };
    case "TOGGLE_SAVED_WORD":
      let savedWord = {};
      let found = false;
      let newSavedWords = state.savedWords;
      let newLearningWords = state.learningWords;
      let newDictionaryInfo = state.dictionaryInfo;
      let tempWords = state.wordsToDisplay.map((word) => {
        if (word.id === action.payload) {
          savedWord.word = word;
          savedWord.isSaved = !word.isSavedWord;
          return {
            ...word,
            isSavedWord: !word.isSavedWord,
          };
        }
        return word;
      });
      if (!savedWord.isSaved) {
        newSavedWords = state.savedWords.filter((word) => {
          return word.id !== action.payload;
        });
      } else {
        newSavedWords.push({
          ...savedWord.word,
          isSavedWord: savedWord.isSaved,
        });
        let tmp = newSavedWords.filter(
          (word) => word.group === savedWord.word.group
        );
        if (
          tmp.length <= 20 &&
          savedWord.word.group === state.dictionaryInfo.savedWordsWordGroup
        ) {
          newDictionaryInfo = {
            ...newDictionaryInfo,
            savedWordsStop: tmp.length,
          };
        }
        let tmpl = newLearningWords.filter(
          (word) => word.group === savedWord.word.group
        );
        if (
          tmpl.length <= 20 &&
          savedWord.word.group === state.dictionaryInfo.learningWordsWordGroup
        ) {
          newDictionaryInfo = {
            ...newDictionaryInfo,
            learningWordsStop: state.dictionaryInfo.learningWordsStop + 1,
          };
        }
      }
      if (newLearningWords.length !== 0) {
        newLearningWords = state.learningWords.map((word) => {
          if (word.id === action.payload) {
            found = true;
            return {
              ...word,
              isSavedWord: !word.isSavedWord,
            };
          }
          return word;
        });
      }
      if (!found) {
        newLearningWords.push({
          ...savedWord.word,
          isSavedWord: savedWord.isSaved,
        });
      }
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          wordsToDisplay: tempWords,
          savedWords: newSavedWords.sort((a, b) => a.group - b.group),
          learningWords: newLearningWords.sort((a, b) => a.group - b.group),
          dictionaryInfo: newDictionaryInfo,
        })
      );
      return {
        ...state,
        wordsToDisplay: tempWords,
        savedWords: newSavedWords.sort((a, b) => a.group - b.group),
        learningWords: newLearningWords.sort((a, b) => a.group - b.group),
        dictionaryInfo: newDictionaryInfo,
      };
    case "DELETE_WORD":
      let deletedWord = {};
      let temporaryWords = state.wordsToDisplay.filter((word) => {
        if (word.id === action.payload) {
          deletedWord.word = word;
          deletedWord.isDeleted = !word.isDeletedWord;
        }
        return word.id !== action.payload;
      });
      let newDeletedWords = state.deletedWords;
      let newLWords = state.learningWords;
      let newDictInfo = state.dictionaryInfo;
      if (!deletedWord.isDeleted) {
        newDeletedWords = state.deletedWords.filter((word) => {
          return word.id !== action.payload;
        });
      } else {
        newDeletedWords.push({
          ...deletedWord.word,
          isDeletedWord: deletedWord.isDeleted,
        });
        let tp = newDeletedWords.filter(
          (word) => word.group === deletedWord.word.group
        );
        if (
          tp.length <= 20 &&
          deletedWord.word.group === state.dictionaryInfo.deletedWordsWordGroup
        ) {
          newDictInfo = {
            ...newDictInfo,
            deletedWordsStop: tp.length,
          };
        }
        let tpl = newLWords.filter(
          (word) => word.group === deletedWord.word.group
        );
        if (
          tpl.length <= 20 &&
          deletedWord.word.group === state.dictionaryInfo.learningWordsWordGroup
        ) {
          newDictInfo = {
            ...newDictInfo,
            learningWordsStop: state.dictionaryInfo.learningWordsStop + 1,
          };
        }
      }
      let isWordPresent = false;
      for (let i = 0; i < newLWords.length; i++) {
        if (deletedWord.word.id === newLWords[i].id) {
          isWordPresent = true;
        }
      }
      if (!isWordPresent) {
        newLWords.push({
          ...deletedWord.word,
          isDeletedWord: deletedWord.isDeleted,
        });
      }
      if (temporaryWords.length === 0) {
        if (state.currentWordGroup === 5 && state.currentWordGroupPage === 29) {
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              deletedPages: {
                ...state.deletedPages,
                [state.currentWordGroup]:
                  state.deletedPages[state.currentWordGroup] !== undefined
                    ? {
                        ...state.deletedPages[state.currentWordGroup],
                        [state.currentWordGroupPage]: true,
                      }
                    : { [state.currentWordGroupPage]: true },
              },
              wordsToDisplay: temporaryWords,
              deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
              learningWords: newLWords.sort((a, b) => a.group - b.group),
              currentWordGroupPage: 28,
              dictionaryInfo: newDictInfo,
            })
          );
          return {
            ...state,
            deletedPages: {
              ...state.deletedPages,
              [state.currentWordGroup]:
                state.deletedPages[state.currentWordGroup] !== undefined
                  ? {
                      ...state.deletedPages[state.currentWordGroup],
                      [state.currentWordGroupPage]: true,
                    }
                  : { [state.currentWordGroupPage]: true },
            },
            wordsToDisplay: temporaryWords,
            deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
            learningWords: newLWords.sort((a, b) => a.group - b.group),
            currentWordGroupPage: 28,
            dictionaryInfo: newDictInfo,
          };
        } else if (
          state.currentWordGroup === 0 &&
          state.currentWordGroupPage === 0
        ) {
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              deletedPages: {
                ...state.deletedPages,
                [state.currentWordGroup]:
                  state.deletedPages[state.currentWordGroup] !== undefined
                    ? {
                        ...state.deletedPages[state.currentWordGroup],
                        [state.currentWordGroupPage]: true,
                      }
                    : { [state.currentWordGroupPage]: true },
              },
              wordsToDisplay: temporaryWords,
              deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
              learningWords: newLWords.sort((a, b) => a.group - b.group),
              currentWordGroupPage: 1,
              dictionaryInfo: newDictInfo,
            })
          );
          return {
            ...state,
            deletedPages: {
              ...state.deletedPages,
              [state.currentWordGroup]:
                state.deletedPages[state.currentWordGroup] !== undefined
                  ? {
                      ...state.deletedPages[state.currentWordGroup],
                      [state.currentWordGroupPage]: true,
                    }
                  : { [state.currentWordGroupPage]: true },
            },
            wordsToDisplay: temporaryWords,
            deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
            learningWords: newLWords.sort((a, b) => a.group - b.group),
            currentWordGroupPage: 1,
            dictionaryInfo: newDictInfo,
          };
        } else if (state.currentWordGroupPage === 0) {
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              deletedPages: {
                ...state.deletedPages,
                [state.currentWordGroup]:
                  state.deletedPages[state.currentWordGroup] !== undefined
                    ? {
                        ...state.deletedPages[state.currentWordGroup],
                        [state.currentWordGroupPage]: true,
                      }
                    : { [state.currentWordGroupPage]: true },
              },
              wordsToDisplay: temporaryWords,
              deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
              learningWords: newLWords.sort((a, b) => a.group - b.group),
              currentWordGroup: state.currentWordGroup - 1,
              currentWordGroupPage: 29,
              dictionaryInfo: newDictInfo,
            })
          );
          return {
            ...state,
            deletedPages: {
              ...state.deletedPages,
              [state.currentWordGroup]:
                state.deletedPages[state.currentWordGroup] !== undefined
                  ? {
                      ...state.deletedPages[state.currentWordGroup],
                      [state.currentWordGroupPage]: true,
                    }
                  : { [state.currentWordGroupPage]: true },
            },
            wordsToDisplay: temporaryWords,
            deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
            learningWords: newLWords.sort((a, b) => a.group - b.group),
            currentWordGroup: state.currentWordGroup - 1,
            currentWordGroupPage: 29,
            dictionaryInfo: newDictInfo,
          };
        } else {
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              deletedPages: {
                ...state.deletedPages,
                [state.currentWordGroup]:
                  state.deletedPages[state.currentWordGroup] !== undefined
                    ? {
                        ...state.deletedPages[state.currentWordGroup],
                        [state.currentWordGroupPage]: true,
                      }
                    : { [state.currentWordGroupPage]: true },
              },
              wordsToDisplay: temporaryWords,
              deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
              learningWords: newLWords.sort((a, b) => a.group - b.group),
              currentWordGroupPage: state.currentWordGroupPage - 1,
              dictionaryInfo: newDictInfo,
            })
          );
          return {
            ...state,
            deletedPages: {
              ...state.deletedPages,
              [state.currentWordGroup]:
                state.deletedPages[state.currentWordGroup] !== undefined
                  ? {
                      ...state.deletedPages[state.currentWordGroup],
                      [state.currentWordGroupPage]: true,
                    }
                  : { [state.currentWordGroupPage]: true },
            },
            wordsToDisplay: temporaryWords,
            deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
            learningWords: newLWords.sort((a, b) => a.group - b.group),
            currentWordGroupPage: state.currentWordGroupPage - 1,
            dictionaryInfo: newDictInfo,
          };
        }
      }
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          wordsToDisplay: temporaryWords,
          deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
          learningWords: newLWords.sort((a, b) => a.group - b.group),
          dictionaryInfo: newDictInfo,
        })
      );
      return {
        ...state,
        wordsToDisplay: temporaryWords,
        deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
        learningWords: newLWords.sort((a, b) => a.group - b.group),
        dictionaryInfo: newDictInfo,
      };
    case "RETURN_WORD":
      let newDWords = state.deletedWords.filter((word) => {
        return word.id !== action.payload;
      });
      let lWords = state.learningWords.filter((word) => {
        return word.id !== action.payload;
      });
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          deletedWords: newDWords,
          learningWords: lWords,
        })
      );
      return { ...state, deletedWords: newDWords, learningWords: lWords };
    case "REMOVE_FROM_LEARNING_WORDS":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          learningWords: state.learningWords.filter(
            (word) => word.id !== action.payload
          ),
        })
      );
      return {
        ...state,
        learningWords: state.learningWords.filter(
          (word) => word.id !== action.payload
        ),
      };
    case "DECREASE_PAGE_NUMBER":
      window.scrollTo(0, 0);
      if (
        state.currentWordGroupPage === 0 ||
        (state.currentWordGroupPage === 1 && state.currentWordGroup === 0)
      ) {
        if (state.currentWordGroup !== 0) {
          let tempWordGroup = state.currentWordGroup - 1;
          let tempWordGroupPage = 29;
          while (
            state.deletedPages[tempWordGroup] !== undefined &&
            state.deletedPages[tempWordGroup][tempWordGroupPage] !== undefined
          ) {
            if (tempWordGroupPage === 0) {
              tempWordGroupPage = 29;
              tempWordGroup--;
              continue;
            }
            tempWordGroupPage--;
          }
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              currentWordGroup: tempWordGroup,
              currentWordGroupPage: tempWordGroupPage,
            })
          );
          return {
            ...state,
            currentWordGroup: tempWordGroup,
            currentWordGroupPage: tempWordGroupPage,
          };
        } else {
          return { ...state };
        }
      } else {
        let tempWordGroup = state.currentWordGroup;
        let tempWordGroupPage = state.currentWordGroupPage - 1;
        while (
          state.deletedPages[tempWordGroup] !== undefined &&
          state.deletedPages[tempWordGroup][tempWordGroupPage] !== undefined
        ) {
          if (tempWordGroupPage === 0) {
            tempWordGroupPage = 29;
            tempWordGroup--;
            continue;
          }
          tempWordGroupPage--;
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            currentWordGroup: tempWordGroup,
            currentWordGroupPage: tempWordGroupPage,
          })
        );
        return {
          ...state,
          currentWordGroupPage: tempWordGroupPage,
          currentWordGroup: tempWordGroup,
        };
      }
    case "INCREASE_PAGE_NUMBER":
      window.scrollTo(0, 0);
      if (state.currentWordGroupPage === 29) {
        if (state.currentWordGroup !== 5) {
          let temporaryWordGroup = state.currentWordGroup + 1;
          let temporaryWordGroupPage = 0;
          while (
            state.deletedPages[temporaryWordGroup] !== undefined &&
            state.deletedPages[temporaryWordGroup][temporaryWordGroupPage] !==
              undefined
          ) {
            if (temporaryWordGroupPage === 29) {
              temporaryWordGroupPage = 0;
              temporaryWordGroup++;
              continue;
            }
            console.log("loop");
            temporaryWordGroupPage++;
            console.log(temporaryWordGroup, temporaryWordGroupPage);
          }
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              currentWordGroupPage: temporaryWordGroupPage,
              currentWordGroup: temporaryWordGroup,
            })
          );
          return {
            ...state,
            currentWordGroupPage: temporaryWordGroupPage,
            currentWordGroup: temporaryWordGroup,
          };
        } else {
          return { ...state };
        }
      } else {
        let temporaryWordGroup = state.currentWordGroup;
        let temporaryWordGroupPage = state.currentWordGroupPage + 1;
        while (
          state.deletedPages[temporaryWordGroup] !== undefined &&
          state.deletedPages[temporaryWordGroup][temporaryWordGroupPage] !==
            undefined
        ) {
          if (temporaryWordGroupPage === 29) {
            temporaryWordGroupPage = 0;
            temporaryWordGroup++;
            continue;
          }
          temporaryWordGroupPage++;
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            currentWordGroupPage: temporaryWordGroupPage,
            currentWordGroup: temporaryWordGroup,
          })
        );
        return {
          ...state,
          currentWordGroupPage: temporaryWordGroupPage,
          currentWordGroup: temporaryWordGroup,
        };
      }
    case "TOGGLE_ADD_OR_DELETE_BUTTON":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          showAddToHardOrDeletedWordsButtons: !state.showAddToHardOrDeletedWordsButtons,
        })
      );
      return {
        ...state,
        showAddToHardOrDeletedWordsButtons: !state.showAddToHardOrDeletedWordsButtons,
      };
    case "TOGGLE_TRANSLATION_BUTTON":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          showWordTranslationAndTranslatedExampleSentence: !state.showWordTranslationAndTranslatedExampleSentence,
        })
      );
      return {
        ...state,
        showWordTranslationAndTranslatedExampleSentence: !state.showWordTranslationAndTranslatedExampleSentence,
      };
    case "TOGGLE_SHOW_SETTINGS":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          showSettings: !state.showSettings,
        })
      );
      return {
        ...state,
        showSettings: !state.showSettings,
      };
    case "CHANGE_SECTION":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          currentSection: action.payload,
        })
      );
      return {
        ...state,
        currentSection: action.payload,
      };
    case "CHANGE_SUBSECTION":
      let cwg = action.payload;
      let cwgp = 0;
      while (
        state.deletedPages[cwg] !== undefined &&
        state.deletedPages[cwg][cwgp] !== undefined
      ) {
        if (cwg === 5) {
          break;
        }
        if (cwgp === 29) {
          cwg++;
          cwgp = 0;
          continue;
        }
        cwgp++;
      }
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          currentWordGroupPage: cwgp,
          currentWordGroup: cwg,
        })
      );
      return {
        ...state,
        currentWordGroupPage: cwgp,
        currentWordGroup: cwg,
      };
    case "CHANGE_PAGE":
      return { ...state, currentWordGroupPage: action.payload - 1 };
    case "INCREASE_SAVED_WORDS_PAGE":
      let nxtGroup = state.savedWords.filter(
        (word) => word.group === state.dictionaryInfo.savedWordsWordGroup + 1
      );
      let temp = state.savedWords.filter(
        (word) => word.group === state.dictionaryInfo.savedWordsWordGroup
      );
      if (
        state.savedWords[state.dictionaryInfo.savedWordsStop - 1].word ===
        temp[temp.length - 1].word
      ) {
        if (nxtGroup.length === 0) {
          return { ...state };
        } else {
          let nxtStart = state.dictionaryInfo.savedWordsStop;
          let nxtStop = state.dictionaryInfo.savedWordsStop;
          for (let i = 1; i <= 20; i++) {
            if (
              nxtStop + i ===
                state.savedWords.indexOf(nxtGroup[nxtGroup.length - 1]) + 1 ||
              (nxtStop + i) % 20 === 0
            ) {
              nxtStop = nxtStop + i;
              break;
            }
          }
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              dictionaryInfo: {
                ...state.dictionaryInfo,
                savedWordsStart: nxtStart,
                savedWordsStop: nxtStop,
                savedWordsWordGroup:
                  state.dictionaryInfo.savedWordsWordGroup + 1,
              },
              numberOfSavedWordsPages: state.numberOfSavedWordsPages + 1,
            })
          );
          return {
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              savedWordsStart: nxtStart,
              savedWordsStop: nxtStop,
              savedWordsWordGroup: state.dictionaryInfo.savedWordsWordGroup + 1,
            },
            numberOfSavedWordsPages: state.numberOfSavedWordsPages + 1,
          };
        }
      } else if (
        state.savedWords.indexOf(temp[temp.length - 1]) >
        state.dictionaryInfo.savedWordsStop - 1
      ) {
        let ntStr = state.dictionaryInfo.savedWordsStop;
        let ntStp = state.dictionaryInfo.savedWordsStop;
        for (let i = 1; i <= 20; i++) {
          if (
            ntStp + i === state.savedWords.indexOf(temp[temp.length - 1]) + 1 ||
            (ntStp + i) % 20 === 0
          ) {
            ntStp = ntStp + i;
            break;
          }
        }
        if (ntStp === state.dictionaryInfo.savedWordsStop) {
          ntStp += 20;
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              savedWordsStart: ntStr,
              savedWordsStop: ntStp,
            },
            numberOfSavedWordsPages: state.numberOfSavedWordsPages + 1,
          })
        );
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            savedWordsStart: ntStr,
            savedWordsStop: ntStp,
          },
          numberOfSavedWordsPages: state.numberOfSavedWordsPages + 1,
        };
      } else {
        return { ...state };
      }
    case "INCREASE_DELETED_WORDS_PAGE":
      let nextGroup = state.deletedWords.filter(
        (word) => word.group === state.dictionaryInfo.deletedWordsWordGroup + 1
      );
      let tempo = state.deletedWords.filter(
        (word) => word.group === state.dictionaryInfo.deletedWordsWordGroup
      );
      if (
        state.deletedWords[state.dictionaryInfo.deletedWordsStop - 1].word ===
        tempo[tempo.length - 1].word
      ) {
        if (nextGroup.length === 0) {
          return { ...state };
        } else {
          let nextStart = state.dictionaryInfo.deletedWordsStop;
          let nextStop = state.dictionaryInfo.deletedWordsStop;
          for (let i = 1; i <= 20; i++) {
            if (
              nextStop + i ===
                state.deletedWords.indexOf(nextGroup[nextGroup.length - 1]) +
                  1 ||
              (nextStop + i) % 20 === 0
            ) {
              nextStop = nextStop + i;
              break;
            }
          }
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              dictionaryInfo: {
                ...state.dictionaryInfo,
                deletedWordsStart: nextStart,
                deletedWordsStop: nextStop,
                deletedWordsWordGroup:
                  state.dictionaryInfo.deletedWordsWordGroup + 1,
              },
              numberOfDeletedWordsPages: state.numberOfDeletedWordsPages + 1,
            })
          );
          return {
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              deletedWordsStart: nextStart,
              deletedWordsStop: nextStop,
              deletedWordsWordGroup:
                state.dictionaryInfo.deletedWordsWordGroup + 1,
            },
            numberOfDeletedWordsPages: state.numberOfDeletedWordsPages + 1,
          };
        }
      } else if (
        state.deletedWords.indexOf(tempo[tempo.length - 1]) >
        state.dictionaryInfo.deletedWordsStop - 1
      ) {
        let ntStrt = state.dictionaryInfo.deletedWordsStop;
        let ntStop = state.dictionaryInfo.deletedWordsStop;
        for (let i = 1; i <= 20; i++) {
          if (
            ntStop + i ===
              state.deletedWords.indexOf(tempo[tempo.length - 1]) + 1 ||
            (ntStop + i) % 20 === 0
          ) {
            ntStop = ntStop + i;
            break;
          }
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              deletedWordsStart: ntStrt,
              deletedWordsStop: ntStop,
            },
            numberOfDeletedWordsPages: state.numberOfDeletedWordsPages + 1,
          })
        );
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            deletedWordsStart: ntStrt,
            deletedWordsStop: ntStop,
          },
          numberOfDeletedWordsPages: state.numberOfDeletedWordsPages + 1,
        };
      } else {
        return { ...state };
      }
    case "INCREASE_LEARNING_WORDS_PAGE":
      let nextWGroup = state.learningWords.filter(
        (word) => word.group === state.dictionaryInfo.learningWordsWordGroup + 1
      );
      let tempor = state.learningWords.filter(
        (word) => word.group === state.dictionaryInfo.learningWordsWordGroup
      );
      if (
        state.learningWords[state.dictionaryInfo.learningWordsStop - 1].word ===
        tempor[tempor.length - 1].word
      ) {
        if (nextWGroup.length === 0) {
          return { ...state };
        } else {
          let nextStartIndex = state.dictionaryInfo.learningWordsStop;
          let nextStopIndex = state.dictionaryInfo.learningWordsStop;
          for (let i = 1; i <= 20; i++) {
            if (
              nextStopIndex + i ===
                state.learningWords.indexOf(nextWGroup[nextWGroup.length - 1]) +
                  1 ||
              (nextStopIndex + i) % 20 === 0
            ) {
              nextStopIndex = nextStopIndex + i;
              break;
            }
          }
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              dictionaryInfo: {
                ...state.dictionaryInfo,
                learningWordsStart: nextStartIndex,
                learningWordsStop: nextStopIndex,
                learningWordsWordGroup:
                  state.dictionaryInfo.learningWordsWordGroup + 1,
              },
              numberOfLearningWordsPages: state.numberOfLearningWordsPages + 1,
            })
          );
          return {
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              learningWordsStart: nextStartIndex,
              learningWordsStop: nextStopIndex,
              learningWordsWordGroup:
                state.dictionaryInfo.learningWordsWordGroup + 1,
            },
            numberOfLearningWordsPages: state.numberOfLearningWordsPages + 1,
          };
        }
      } else if (
        state.learningWords.indexOf(tempor[tempor.length - 1]) >
        state.dictionaryInfo.learningWordsStop - 1
      ) {
        let ntStrtIndex = state.dictionaryInfo.learningWordsStop;
        let ntStopIndex = state.dictionaryInfo.learningWordsStop;
        for (let i = 1; i <= 20; i++) {
          if (
            ntStopIndex + i ===
              state.learningWords.indexOf(tempor[tempor.length - 1]) + 1 ||
            (ntStopIndex + i) % 20 === 0
          ) {
            ntStopIndex = ntStopIndex + i;
            break;
          }
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              learningWordsStart: ntStrtIndex,
              learningWordsStop: ntStopIndex,
            },
            numberOfLearningWordsPages: state.numberOfLearningWordsPages + 1,
          })
        );
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            learningWordsStart: ntStrtIndex,
            learningWordsStop: ntStopIndex,
          },
          numberOfLearningWordsPages: state.numberOfLearningWordsPages + 1,
        };
      } else {
        return { ...state };
      }
    case "DECREASE_SAVED_WORDS_PAGE":
      let savedPrev = state.savedWords.filter(
        (word) => word.group === state.dictionaryInfo.savedWordsWordGroup - 1
      );
      let savedTemp = state.savedWords.filter(
        (word) => word.group === state.dictionaryInfo.savedWordsWordGroup
      );
      if (
        state.savedWords[state.dictionaryInfo.savedWordsStart].word ===
        savedTemp[0].word
      ) {
        if (savedPrev.length === 0) {
          return { ...state };
        } else {
          let savedPrevStart = state.dictionaryInfo.savedWordsStart;
          let savedPrevStop = state.dictionaryInfo.savedWordsStart;
          for (let i = 1; i <= 20; i++) {
            if (
              savedPrevStart - i === state.savedWords.indexOf(savedPrev[0]) ||
              (savedPrevStart - i) % 20 === 0
            ) {
              savedPrevStart = savedPrevStart - i;
              break;
            }
          }
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              dictionaryInfo: {
                ...state.dictionaryInfo,
                savedWordsStart: savedPrevStart,
                savedWordsStop: savedPrevStop,
                savedWordsWordGroup:
                  state.dictionaryInfo.savedWordsWordGroup - 1,
              },
              numberOfSavedWordsPages: state.numberOfSavedWordsPages - 1,
            })
          );
          return {
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              savedWordsStart: savedPrevStart,
              savedWordsStop: savedPrevStop,
              savedWordsWordGroup: state.dictionaryInfo.savedWordsWordGroup - 1,
            },
            numberOfSavedWordsPages: state.numberOfSavedWordsPages - 1,
          };
        }
      } else if (
        state.savedWords.indexOf(savedTemp[0]) <
        state.dictionaryInfo.savedWordsStart
      ) {
        let savedntStr = state.dictionaryInfo.savedWordsStart;
        let savedntStp = state.dictionaryInfo.savedWordsStart;
        for (let i = 1; i <= 20; i++) {
          if (
            savedntStr - i === state.savedWords.indexOf(savedTemp[0]) ||
            (savedntStr - i) % 20 === 0
          ) {
            savedntStr = savedntStr - i;
            break;
          }
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              savedWordsStart: savedntStr,
              savedWordsStop: savedntStp,
            },
            numberOfSavedWordsPages: state.numberOfSavedWordsPages - 1,
          })
        );
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            savedWordsStart: savedntStr,
            savedWordsStop: savedntStp,
          },
          numberOfSavedWordsPages: state.numberOfSavedWordsPages - 1,
        };
      } else {
        return { ...state };
      }
    case "DECREASE_DELETED_WORDS_PAGE":
      let deletedPrev = state.deletedWords.filter(
        (word) => word.group === state.dictionaryInfo.deletedWordsWordGroup - 1
      );
      let deletedTemp = state.deletedWords.filter(
        (word) => word.group === state.dictionaryInfo.deletedWordsWordGroup
      );
      if (
        state.deletedWords[state.dictionaryInfo.deletedWordsStart].word ===
        deletedTemp[0].word
      ) {
        if (deletedPrev.length === 0) {
          return { ...state };
        } else {
          let deletedPrevStart = state.dictionaryInfo.deletedWordsStart;
          let deletedPrevStop = state.dictionaryInfo.deletedWordsStart;
          for (let i = 1; i <= 20; i++) {
            if (
              deletedPrevStart - i ===
                state.deletedWords.indexOf(deletedPrev[0]) ||
              (deletedPrevStart - i) % 20 === 0
            ) {
              deletedPrevStart = deletedPrevStart - i;
              break;
            }
          }
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              dictionaryInfo: {
                ...state.dictionaryInfo,
                deletedWordsStart: deletedPrevStart,
                deletedWordsStop: deletedPrevStop,
                deletedWordsWordGroup:
                  state.dictionaryInfo.deletedWordsWordGroup - 1,
              },
              numberOfDeletedWordsPages: state.numberOfDeletedWordsPages - 1,
            })
          );
          return {
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              deletedWordsStart: deletedPrevStart,
              deletedWordsStop: deletedPrevStop,
              deletedWordsWordGroup:
                state.dictionaryInfo.deletedWordsWordGroup - 1,
            },
            numberOfDeletedWordsPages: state.numberOfDeletedWordsPages - 1,
          };
        }
      } else if (
        state.deletedWords.indexOf(deletedTemp[0]) <
        state.dictionaryInfo.deletedWordsStart
      ) {
        let deletedntStr = state.dictionaryInfo.deletedWordsStart;
        let deletedntStp = state.dictionaryInfo.deletedWordsStart;
        for (let i = 1; i <= 20; i++) {
          if (
            deletedntStr - i === state.deletedWords.indexOf(deletedTemp[0]) ||
            (deletedntStr - i) % 20 === 0
          ) {
            deletedntStr = deletedntStr - i;
            break;
          }
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              deletedWordsStart: deletedntStr,
              deletedWordsStop: deletedntStp,
            },
            numberOfDeletedWordsPages: state.numberOfDeletedWordsPages - 1,
          })
        );
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            deletedWordsStart: deletedntStr,
            deletedWordsStop: deletedntStp,
          },
          numberOfDeletedWordsPages: state.numberOfDeletedWordsPages - 1,
        };
      } else {
        return { ...state };
      }
    case "DECREASE_LEARNING_WORDS_PAGE":
      let learningPrev = state.learningWords.filter(
        (word) => word.group === state.dictionaryInfo.learningWordsWordGroup - 1
      );
      let learningTemp = state.learningWords.filter(
        (word) => word.group === state.dictionaryInfo.learningWordsWordGroup
      );
      if (
        state.learningWords[state.dictionaryInfo.learningWordsStart].word ===
        learningTemp[0].word
      ) {
        if (learningPrev.length === 0) {
          return { ...state };
        } else {
          let learningPrevStart = state.dictionaryInfo.learningWordsStart;
          let learningPrevStop = state.dictionaryInfo.learningWordsStart;
          for (let i = 1; i <= 20; i++) {
            if (
              learningPrevStart - i ===
                state.learningWords.indexOf(learningPrev[0]) ||
              (learningPrevStart - i) % 20 === 0
            ) {
              learningPrevStart = learningPrevStart - i;
              break;
            }
          }
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              dictionaryInfo: {
                ...state.dictionaryInfo,
                learningWordsStart: learningPrevStart,
                learningWordsStop: learningPrevStop,
                learningWordsWordGroup:
                  state.dictionaryInfo.learningWordsWordGroup - 1,
              },
              numberOfLearningWordsPages: state.numberOfLearningWordsPages - 1,
            })
          );
          return {
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              learningWordsStart: learningPrevStart,
              learningWordsStop: learningPrevStop,
              learningWordsWordGroup:
                state.dictionaryInfo.learningWordsWordGroup - 1,
            },
            numberOfLearningWordsPages: state.numberOfLearningWordsPages - 1,
          };
        }
      } else if (
        state.learningWords.indexOf(learningTemp[0]) <
        state.dictionaryInfo.learningWordsStart
      ) {
        let learningntStr = state.dictionaryInfo.learningWordsStart;
        let learningntStp = state.dictionaryInfo.learningWordsStart;
        for (let i = 1; i <= 20; i++) {
          if (
            learningntStr - i ===
              state.learningWords.indexOf(learningTemp[0]) ||
            (learningntStr - i) % 20 === 0
          ) {
            learningntStr = learningntStr - i;
            break;
          }
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              learningWordsStart: learningntStr,
              learningWordsStop: learningntStp,
            },
            numberOfLearningWordsPages: state.numberOfLearningWordsPages - 1,
          })
        );
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            learningWordsStart: learningntStr,
            learningWordsStop: learningntStp,
          },
          numberOfLearningWordsPages: state.numberOfLearningWordsPages - 1,
        };
      } else {
        return { ...state };
      }
    case "SET_NEW_SPRINT_RECORD":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          statistics: {
            ...state.statistics,
            sprint: { ...state.statistics.sprint, record: action.payload },
          },
        })
      );
      return {
        ...state,
        statistics: {
          ...state.statistics,
          sprint: { ...state.statistics.sprint, record: action.payload },
        },
      };
    case "SET_NEW_SAVANNA_RECORD":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          statistics: {
            ...state.statistics,
            savanna: { ...state.statistics.savanna, record: action.payload },
          },
        })
      );
      return {
        ...state,
        statistics: {
          ...state.statistics,
          savanna: { ...state.statistics.savanna, record: action.payload },
        },
      };
    case "SET_NEW_AUDIOCALL_RECORD":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          statistics: {
            ...state.statistics,
            audioCall: {
              ...state.statistics.audioCall,
              record: action.payload,
            },
          },
        })
      );
      return {
        ...state,
        statistics: {
          ...state.statistics,
          audioCall: { ...state.statistics.audioCall, record: action.payload },
        },
      };
    case "SET_NEW_MATCH_RECORD":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          statistics: {
            ...state.statistics,
            customGame: {
              ...state.statistics.customGame,
              record: action.payload,
            },
          },
        })
      );
      return {
        ...state,
        statistics: {
          ...state.statistics,
          customGame: {
            ...state.statistics.customGame,
            record: action.payload,
          },
        },
      };
    case "OPEN_GAME_FROM_OUTSIDE":
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          showLevels: false,
          wordGroup: state.currentWordGroup,
          page: state.currentWordGroupPage,
        },
      };
    case "ADD_TO_ALL_WORDS":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          allWords: {
            ...state.allWords,
            [action.payload.group]: {
              ...state.allWords[action.payload.group],
              [action.payload.word]: {
                ...action.payload,
                isSavedWord: false,
                isDeletedWord: false,
                allTimeFound: 0,
                allTimeFailed: 0,
              },
            },
          },
        })
      );
      return {
        ...state,
        allWords: {
          ...state.allWords,
          [action.payload.group]: {
            ...state.allWords[action.payload.group],
            [action.payload.word]: {
              ...action.payload,
              isSavedWord: false,
              isDeletedWord: false,
              allTimeFound: 0,
              allTimeFailed: 0,
            },
          },
        },
      };
    case "INCREMENT_WORD_ALLTIMEFOUND":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          allWords: {
            ...state.allWords,
            [action.payload.group]: {
              ...state.allWords[action.payload.group],
              [action.payload.word]: {
                ...action.payload,
                allTimeFound:
                  state.allWords[action.payload.group] === undefined ||
                  state.allWords[action.payload.group][action.payload.word] ===
                    undefined ||
                  state.allWords[action.payload.group][action.payload.word]
                    .allTimeFound === undefined
                    ? 1
                    : state.allWords[action.payload.group][action.payload.word]
                        .allTimeFound + 1,
              },
            },
          },
        })
      );
      return {
        ...state,
        allWords: {
          ...state.allWords,
          [action.payload.group]: {
            ...state.allWords[action.payload.group],
            [action.payload.word]: {
              ...action.payload,
              allTimeFound:
                state.allWords[action.payload.group] === undefined ||
                state.allWords[action.payload.group][action.payload.word] ===
                  undefined ||
                state.allWords[action.payload.group][action.payload.word]
                  .allTimeFound === undefined
                  ? 1
                  : state.allWords[action.payload.group][action.payload.word]
                      .allTimeFound + 1,
            },
          },
        },
      };
    case "INCREMENT_WORD_ALLTIMEFAILED":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          allWords: {
            ...state.allWords,
            [action.payload.group]: {
              ...state.allWords[action.payload.group],
              [action.payload.word]: {
                ...action.payload,
                allTimeFailed:
                  state.allWords[action.payload.group] === undefined ||
                  state.allWords[action.payload.group][action.payload.word] ===
                    undefined ||
                  state.allWords[action.payload.group][action.payload.word]
                    .allTimeFailed === undefined
                    ? 1
                    : state.allWords[action.payload.group][action.payload.word]
                        .allTimeFailed + 1,
              },
            },
          },
        })
      );
      return {
        ...state,
        allWords: {
          ...state.allWords,
          [action.payload.group]: {
            ...state.allWords[action.payload.group],
            [action.payload.word]: {
              ...action.payload,
              allTimeFailed:
                state.allWords[action.payload.group] === undefined ||
                state.allWords[action.payload.group][action.payload.word] ===
                  undefined ||
                state.allWords[action.payload.group][action.payload.word]
                  .allTimeFailed === undefined
                  ? 1
                  : state.allWords[action.payload.group][action.payload.word]
                      .allTimeFailed + 1,
            },
          },
        },
      };
    case "INCREMENT_CORRECT_FOUND":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          statistics: {
            ...state.statistics,
            correctFound: state.statistics.correctFound + 1,
          },
        })
      );
      return {
        ...state,
        statistics: {
          ...state.statistics,
          correctFound: state.statistics.correctFound + 1,
        },
      };
    case "INCREMENT_WRONG_FOUND":
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          statistics: {
            ...state.statistics,
            wrongFound: state.statistics.wrongFound + 1,
          },
        })
      );
      return {
        ...state,
        statistics: {
          ...state.statistics,
          wrongFound: state.statistics.wrongFound + 1,
        },
      };
    case "INCREMENT_WORDS_LEARNT":
      if (
        state.allWords[action.payload.group] === undefined ||
        state.allWords[action.payload.group][action.payload.word] ===
          undefined ||
        state.allWords[action.payload.group][action.payload.word]
          .allTimeFound === undefined ||
        state.allWords[action.payload.group][action.payload.word]
          .allTimeFound === 0
      ) {
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            statistics: {
              ...state.statistics,
              wordsLearnt: state.statistics.wordsLearnt + 1,
            },
          })
        );
        return {
          ...state,
          statistics: {
            ...state.statistics,
            wordsLearnt: state.statistics.wordsLearnt + 1,
          },
        };
      } else if (
        state.allWords[action.payload.group][action.payload.word].allTimeFound >
        0
      ) {
        return { ...state };
      }
      return { ...state };
    default:
      break;
  }
  return state;
};
