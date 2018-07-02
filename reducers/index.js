import { GET_DECKS, ADD_DECK, CLEAR_DECKS, SET_CURRENT_DECK, SET_DECKS } from '../actions'

const initialState = {
  decks: {},
  currentDeck: null,
}
function decks(state = initialState, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        decks: action.decks,
      }
    case SET_DECKS:
      return {
        ...state,
        decks: action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        deck: action.deck,
        decks: {
          ...state.decks,
          [action.deck['id']]: action.deck,
        }
      }
    case CLEAR_DECKS:
      return {
        ...state,
        decks: {},
      }
    case SET_CURRENT_DECK:
      return {
        ...state,
        currentDeck: action.deck
      }
    default:
      return state;
  }
}

export default decks;
