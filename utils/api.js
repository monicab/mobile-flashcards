import { AsyncStorage } from "react-native"

DECKS_STORAGE_KEY = 'MobileFlashcards::decks'


export function getDecksFromStorage() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((decks) => {
      if (decks == null) {
        return null
      }
      return JSON.parse(decks);
    });
}

export function saveDeckInStorage(deck) {
  if (deck['id'] !== undefined) {
    return updateDeck(deck);
  }
  else {
    return addDeck(deck);
  }
}

export function clearAllDecksFromStorage() {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY);
}

function addDeck (deck) {
  return getNewDeckId().then((newId) => {
    const newDeck = {
      ...deck,
      id: newId,
    }
    return updateDeck(newDeck);
  });
}

function updateDeck (deck) {
  const deckId = deck['id'];
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckId]: deck
  })).then(() => {
    return deck;
  });
}


function getNewDeckId () {
  return getDecksFromStorage().then((decks) => {
    if (decks !== null) {
      const decksIds = Object.keys(decks).map(Number).sort();
      return decksIds[decksIds.length-1] + 1;
    }
    return 0;
  })
}