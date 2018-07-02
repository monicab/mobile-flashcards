export const ADD_DECK = 'ADD_DECK'
export const CLEAR_DECKS = 'CLEAR_DECKS'
export const GET_DECKS = 'GET_DECKS'
export const SET_CURRENT_DECK = 'SET_CURRENT_DECK'

export function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function setCurrentDeck(deck) {
  return {
    type: SET_CURRENT_DECK,
    deck

  }
}

export function clearDecks() {
  return {
    type: CLEAR_DECKS,
  }
}