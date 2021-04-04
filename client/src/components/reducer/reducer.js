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
    case "TOGGLE_SAVED_WORD":
      let savedWord = {};
      let found = false;
      let newSavedWords = state.savedWords;
      let newLearningWords = state.learningWords;
      let tempWords = state.wordsToDisplay.map((word) => {
        if (word.id === action.payload) {
          savedWord.word = word;
          savedWord.isSaved = !word.isSavedWord;
          return { ...word, isSavedWord: !word.isSavedWord };
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
      }
      if (newLearningWords.length !== 0) {
        newLearningWords = state.learningWords.map((word) => {
          if (word.id === action.payload) {
            found = true;
            return { ...word, isSavedWord: !word.isSavedWord };
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
          savedWords: newSavedWords,
          learningWords: newLearningWords,
        })
      );
      return {
        ...state,
        wordsToDisplay: tempWords,
        savedWords: newSavedWords,
        learningWords: newLearningWords,
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
              deletedWords: newDeletedWords,
              learningWords: newLWords,
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
            deletedWords: newDeletedWords,
            learningWords: newLWords,
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
              deletedWords: newDeletedWords,
              learningWords: newLWords,
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
            deletedWords: newDeletedWords,
            learningWords: newLWords,
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
              deletedWords: newDeletedWords,
              learningWords: newLWords,
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
            deletedWords: newDeletedWords,
            learningWords: newLWords,
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
              deletedWords: newDeletedWords,
              learningWords: newLWords,
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
            deletedWords: newDeletedWords,
            learningWords: newLWords,
            currentWordGroupPage: state.currentWordGroupPage - 1,
          };
        }
      }
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          wordsToDisplay: temporaryWords,
          deletedWords: newDeletedWords,
          learningWords: newLWords,
        })
      );
      return {
        ...state,
        wordsToDisplay: temporaryWords,
        deletedWords: newDeletedWords,
        learningWords: newLWords,
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
    default:
      break;
  }
  return state;
};
