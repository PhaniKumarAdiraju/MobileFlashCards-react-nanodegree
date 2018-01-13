import * as Types from './actionTypes'

export const addDeck = deck => ({
    type: Types.ADD_DECK,
    deck,
})

export const getDecks = decks => ({
    type: Types.GET_DECKS,
    decks,
})

export const addCard = params => ({
    type: Types.ADD_CARD,
    params,
})
