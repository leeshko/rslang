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

// export const defaultState = {
//   showWordTranslationAndTranslatedExampleSentence: true,
//   showAddToHardOrDeletedWordsButtons: true,
//   currentWordGroup: 0,
//   currentWordGroupPage: 0,
//   wordsToDisplay: [],
//   savedWords: [],
//   deletedWords: [],
//   showSettings: false,
// };
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
        // else if (newDictionaryInfo.savedWordsStop !== 0) {
        //   newDictionaryInfo = { ...newDictionaryInfo, savedWordsStop: 20 };
        // }
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
      if (!deletedWord.isDeleted) {
        newDeletedWords = state.deletedWords.filter((word) => {
          return word.id !== action.payload;
        });
      } else {
        newDeletedWords.push({
          ...deletedWord.word,
          isDeletedWord: deletedWord.isDeleted,
        });
      }
      newLWords.push({
        ...deletedWord.word,
        isDeletedWord: deletedWord.isDeleted,
      });
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
        })
      );
      return {
        ...state,
        wordsToDisplay: temporaryWords,
        deletedWords: newDeletedWords.sort((a, b) => a.group - b.group),
        learningWords: newLWords.sort((a, b) => a.group - b.group),
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
              // currentWordGroup: state.currentWordGroup - 1,
              // currentWordGroupPage: 29,
              currentWordGroup: tempWordGroup,
              currentWordGroupPage: tempWordGroupPage,
            })
          );
          return {
            ...state,
            // currentWordGroup: state.currentWordGroup - 1,
            // currentWordGroupPage: 29,
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
            // currentWordGroupPage: state.currentWordGroupPage - 1,
            currentWordGroup: tempWordGroup,
            currentWordGroupPage: tempWordGroupPage,
          })
        );
        return {
          ...state,
          // currentWordGroupPage: state.currentWordGroupPage - 1,
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
              // currentWordGroup: state.currentWordGroup + 1,
              // currentWordGroupPage: 0,
              currentWordGroupPage: temporaryWordGroupPage,
              currentWordGroup: temporaryWordGroup,
            })
          );
          return {
            ...state,
            // currentWordGroup: state.currentWordGroup + 1,
            // currentWordGroupPage: 0,
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
            // currentWordGroupPage: state.currentWordGroupPage + 1,
            currentWordGroupPage: temporaryWordGroupPage,
            currentWordGroup: temporaryWordGroup,
          })
        );
        return {
          ...state,
          // currentWordGroupPage: state.currentWordGroupPage + 1,
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
          // currentWordGroup: action.payload,
          // currentWordGroupPage: 0,
          currentWordGroupPage: cwgp,
          currentWordGroup: cwg,
        })
      );
      return {
        ...state,
        // currentWordGroup: action.payload,
        // currentWordGroupPage: 0,
        currentWordGroupPage: cwgp,
        currentWordGroup: cwg,
      };
    case "CHANGE_PAGE":
      return { ...state, currentWordGroupPage: action.payload - 1 };
    case "INCREASE_SAVED_WORDS_PAGE":
      const temp = state.savedWords.filter(
        (word) => word.group === state.dictionaryInfo.savedWordsWordGroup
      );
      if (temp.length < 20) {
        console.log("if");
        const nextGroup = state.savedWords.filter(
          (word) => word.group === state.dictionaryInfo.savedWordsWordGroup + 1
        );
        if (nextGroup.length === 0) {
          return { ...state };
        }
        let newStart = state.dictionaryInfo.savedWordsStop;
        let newStop = state.dictionaryInfo.savedWordsStop;
        const newGroupNumber = nextGroup[0].group;
        for (let i = 1; i <= 20; i++) {
          if (
            (newStop + i) % 20 === 0 ||
            newStop + i === state.savedWords.length ||
            newGroupNumber !== state.savedWords[newStop + i].group
          ) {
            newStop = newStop + i;
            break;
          }
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              savedWordsStart: newStart,
              savedWordsStop: newStop,
              savedWordsWordGroup: state.dictionaryInfo.savedWordsWordGroup + 1,
            },
            numberOfSavedWordsPages: state.numberOfSavedWordsPages + 1,
          })
        );
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            savedWordsStart: newStart,
            savedWordsStop: newStop,
            savedWordsWordGroup: state.dictionaryInfo.savedWordsWordGroup + 1,
          },
          numberOfSavedWordsPages: state.numberOfSavedWordsPages + 1,
        };
        // return { ...state };
      } else if (temp.length === state.dictionaryInfo.savedWordsStop) {
        console.log("else if");
        if (state.dictionaryInfo.savedWordsWordGroup === 5) {
          return { ...state };
        } else {
          const nextGroup = state.savedWords.filter(
            (word) =>
              word.group === state.dictionaryInfo.savedWordsWordGroup + 1
          );
          if (nextGroup.length === 0) {
            return { ...state };
          }
          console.log(nextGroup[0]);
          let newStart = state.dictionaryInfo.savedWordsStop;
          let newStop = state.savedWords.savedWordsStop;
          console.log(newStop);
          for (let i = 1; i <= 20; i++) {
            if (
              (newStop + i) % 20 === 0 ||
              newStop + i === state.savedWords.length ||
              state.savedWords.length <= newStop + i
              // newGroupNumber !== state.savedWords[newStop + i].group
            ) {
              newStop = newStop + i;
              break;
            }
          }
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              dictionaryInfo: {
                ...state.dictionaryInfo,
                savedWordsStart: newStart,
                savedWordsStop: newStop,
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
              savedWordsStart: newStart,
              savedWordsStop: newStop,
              savedWordsWordGroup: state.dictionaryInfo.savedWordsWordGroup + 1,
            },
            numberOfSavedWordsPages: state.numberOfSavedWordsPages + 1,
          };
        }
      } else {
        console.log("else");
        if (state.dictionaryInfo.savedWordsStart >= state.savedWords.length) {
          return { ...state };
        }
        let newStart = state.dictionaryInfo.savedWordsStop;
        let newStop = state.dictionaryInfo.savedWordsStop;
        for (let i = 1; i <= 20; i++) {
          if (
            (newStop + i) % 20 === 0 ||
            newStop + i === state.savedWords.length ||
            state.savedWords.length < newStop + i
          ) {
            newStop = newStop + i;
            break;
          }
        }
        // console.log(newStart, newStop, state.savedWords.length);
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              savedWordsStart: newStart,
              savedWordsStop: newStop,
            },
            numberOfSavedWordsPages: state.numberOfSavedWordsPages + 1,
          })
        );
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            savedWordsStart: newStart,
            savedWordsStop: newStop,
          },
          numberOfSavedWordsPages: state.numberOfSavedWordsPages + 1,
        };
      }
    case "INCREASE_DELETED_WORDS_PAGE":
      const tempo = state.deletedWords.filter(
        (word) => word.group === state.dictionaryInfo.deletedWordsWordGroup
      );
      if (tempo.length < 20) {
        return { ...state };
      } else if (tempo.length - 1 === state.dictionaryInfo.deletedWordsStop) {
        if (state.dictionaryInfo.deletedWordsWordGroup === 5) {
          return { ...state };
        } else {
          const nextGroup = state.deletedWords.filter(
            (word) =>
              word.group === state.dictionaryInfo.deletedWordsWordGroup + 1
          );
          if (nextGroup.length === 0) {
            return { ...state };
          }
          let newStart = state.dictionaryInfo.deletedWordsStart + 20;
          let newStop = state.dictionaryInfo.deletedWordsStop;
          for (let i = 0; i < 20; i++) {
            if (newStop - i === 20) {
              newStop = newStop + i;
              break;
            }
          }
          return {
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              deletedWordsStart: newStart,
              deletedWordsStop: newStop,
              deletedWordsWordGroup:
                state.dictionaryInfo.deletedWordsWordGroup + 1,
            },
          };
        }
      } else {
        let newStart = state.dictionaryInfo.deletedWordsStart + 20;
        let newStop = state.dictionaryInfo.deletedWordsStop;
        for (let i = 0; i < 20; i++) {
          if (newStop - i === 20) {
            newStop = newStop + i;
            break;
          }
        }
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            deletedWordsStart: newStart,
            deletedWordsStop: newStop,
          },
        };
      }
    case "DECREASE_SAVED_WORDS_PAGE":
      const tmp = state.savedWords.filter(
        (word) => word.group === state.dictionaryInfo.savedWordsWordGroup
      );
      if (tmp.length < 20) {
        console.log("if");
        const prevGroup = state.savedWords.filter(
          (word) => word.group === state.dictionaryInfo.savedWordsWordGroup - 1
        );
        if (prevGroup.length === 0) {
          return { ...state };
        }
        let newStart = state.dictionaryInfo.savedWordsStart;
        let newStop = state.dictionaryInfo.savedWordsStart;
        const newPrevNumber = prevGroup[0].group;
        for (let i = 0; i < 20; i++) {
          if (
            (newStart - i) % 20 === 0 ||
            newStart - i === state.savedWords.length ||
            newPrevNumber !== state.savedWords[newStart - i - 1].group
          ) {
            newStart = newStart - i;
            break;
          }
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              savedWordsStart: newStart,
              savedWordsStop: newStop,
              savedWordsWordGroup: state.dictionaryInfo.savedWordsWordGroup - 1,
            },
            numberOfSavedWordsPages: state.numberOfSavedWordsPages - 1,
          })
        );
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            savedWordsStart: newStart,
            savedWordsStop: newStop,
            savedWordsWordGroup: state.dictionaryInfo.savedWordsWordGroup - 1,
          },
          numberOfSavedWordsPages: state.numberOfSavedWordsPages - 1,
        };
        // return { ...state };
      } else {
        console.log("else");
        if (state.dictionaryInfo.savedWordsStart === 0) {
          return { ...state };
        }
        let newStart = state.dictionaryInfo.savedWordsStart;
        let newStop = state.dictionaryInfo.savedWordsStart;
        const prevGroup = state.savedWords.filter(
          (word) => word.group === state.dictionaryInfo.savedWordsWordGroup - 1
        );
        console.log(newStart);
        if (state.dictionaryInfo.savedWordsWordGroup !== 0) {
          const newPrevNumber = prevGroup[0].group;
          for (let i = 0; i < 20; i++) {
            if (
              state.savedWords[newStart - i].group === newPrevNumber ||
              newStart - i === 0 ||
              (newStart - i) % 20 === 0
            ) {
              newStart = newStart - i + 1;
              break;
            }
          }
        } else {
          for (let i = 0; i < 20; i++) {
            if ((newStart - i) % 20 === 0 || newStart - i === 0) {
              newStart = newStart - i;
              break;
            }
          }
        }
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            dictionaryInfo: {
              ...state.dictionaryInfo,
              savedWordsStart: newStart,
              savedWordsStop: newStop,
            },
            numberOfSavedWordsPages: state.numberOfSavedWordsPages - 1,
          })
        );
        return {
          ...state,
          dictionaryInfo: {
            ...state.dictionaryInfo,
            savedWordsStart: newStart,
            savedWordsStop: newStop,
          },
          numberOfSavedWordsPages: state.numberOfSavedWordsPages - 1,
        };
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
      console.log(state.allWords[action.payload.group]);
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          allWords: {
            ...state.allWords,
            [action.payload.group]: {
              ...state.allWords[action.payload.group],
              [action.payload.word]: {
                ...state.allWords[action.payload.group][action.payload.word],
                allTimeFound:
                  state.allWords[action.payload.group][action.payload.word]
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
              ...state.allWords[action.payload.group][action.payload.word],
              allTimeFound:
                state.allWords[action.payload.group][action.payload.word]
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
                ...state.allWords[action.payload.group][action.payload.word],
                allTimeFailed:
                  state.allWords[action.payload.group][action.payload.word]
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
              ...state.allWords[action.payload.group][action.payload.word],
              allTimeFailed:
                state.allWords[action.payload.group][action.payload.word]
                  .allTimeFailed + 1,
            },
          },
        },
      };
    default:
      break;
  }
  return state;
};
