export const defaultState = {
  showWordTranslationAndTranslatedExampleSentence: true,
  showAddToHardOrDeletedWordsButtons: true,
  currentWordGroup: 0,
  currentWordGroupPage: 0,
  wordsToDisplay: [],
  savedWords: [],
  deletedWords: [],
  showSettings: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "WORDS_TO_DISPLAY_LOADED":
      return { ...state, wordsToDisplay: action.payload };
    case "TOGGLE_BUTTONS":
      return {
        ...state,
        showAddToHardOrDeletedWordsButtons: !state.showAddToHardOrDeletedWordsButtons,
      };
    case "TOGGLE_SAVED_WORD":
      let savedWord = {};
      let tempWords = state.wordsToDisplay.map((word) => {
        if (word.id === action.payload) {
          savedWord.word = word;
          savedWord.isSaved = !word.isSavedWord;
          return { ...word, isSavedWord: !word.isSavedWord };
        }
        return word;
      });
      let newSavedWords = state.savedWords;
      if (!savedWord.isSaved) {
        newSavedWords = state.savedWords.filter((word) => {
          return word.id !== action.payload;
        });
      } else {
        newSavedWords.push(savedWord.word);
      }
      return { ...state, wordsToDisplay: tempWords, savedWords: newSavedWords };
    case "DELETE_WORD":
      let deletedWord = {};
      let temporaryWords = state.wordsToDisplay.filter((word) => {
        if (word.id === action.payload) {
          deletedWord.word = word;
          deletedWord.isDeleted = !word.isDeleted;
        }
        return word.id !== action.payload;
      });
      let newDeletedWords = state.deletedWords;
      if (!deletedWord.isDeleted) {
        newDeletedWords = state.deletedWords.filter((word) => {
          return word.id !== action.payload;
        });
      } else {
        newDeletedWords.push(deletedWord.word);
      }
      return {
        ...state,
        wordsToDisplay: temporaryWords,
        deletedWords: newDeletedWords,
      };
    case "DECREASE_PAGE_NUMBER":
      if (state.currentWordGroupPage === 0) {
        if (state.currentWordGroup !== 0) {
          return {
            ...state,
            currentWordGroup: state.currentWordGroup - 1,
            currentWordGroupPage: 29,
          };
        } else {
          return { ...state };
        }
      } else {
        return {
          ...state,
          currentWordGroupPage: state.currentWordGroupPage - 1,
        };
      }
    case "INCREASE_PAGE_NUMBER":
      if (state.currentWordGroupPage === 29) {
        if (state.currentWordGroup !== 5) {
          return {
            ...state,
            currentWordGroup: state.currentWordGroup + 1,
            currentWordGroupPage: 0,
          };
        } else {
          return { ...state };
        }
      } else {
        return {
          ...state,
          currentWordGroupPage: state.currentWordGroupPage + 1,
        };
      }
    case "TOGGLE_ADD_OR_DELETE_BUTTON":
      return {
        ...state,
        showAddToHardOrDeletedWordsButtons: !state.showAddToHardOrDeletedWordsButtons,
      };
    case "TOGGLE_TRANSLATION_BUTTON":
      return {
        ...state,
        showWordTranslationAndTranslatedExampleSentence: !state.showWordTranslationAndTranslatedExampleSentence,
      };
    case "TOGGLE_SHOW_SETTINGS":
      return {
        ...state,
        showSettings: !state.showSettings,
      };
    default:
      break;
  }
  return state;
};
