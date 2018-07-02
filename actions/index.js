import { getDecksFromStorage, clearAllDecksFromStorage, saveDeckInStorage } from '../utils/api'

export const ADD_DECK = 'ADD_DECK'
export const CLEAR_DECKS = 'CLEAR_DECKS'
export const GET_DECKS = 'GET_DECKS'
export const SET_DECKS = 'GET_DECKS'
export const SET_CURRENT_DECK = 'SET_CURRENT_DECK'


export function loadDecks () {
  return (dispatch) => {
    return getDecksFromStorage().then((decks) => {
      dispatch(setDecks(decks));
    });
  }
}

export function setDecks(decks) {
  return {
    type: SET_DECKS,
    decks
  }
}

export function addDeck(deck) {
  return (dispatch) => {
    return saveDeckInStorage(deck).then((deck) => {
      dispatch({
        type: ADD_DECK,
        deck,
      })
    })
  }
}

export function setCurrentDeck(deck) {
  return (dispatch) => {
    return dispatch({
      type: SET_CURRENT_DECK,
      deck
    });
  }
}

export function clearDecks() {
  return (dispatch) => {
    return clearAllDecksFromStorage().then(() => {
      dispatch({
        type: CLEAR_DECKS,
      });
    });
  }
}
