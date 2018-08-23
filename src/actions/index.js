import * as Types from './actionTypes';

export const addDeck = deck => ({
    type: Types.ADD_DECK,
    deck
});

export const addQuestion = params => ({
    type: Types.ADD_QUESTION,
    params
});

export const getDecks = decks => ({
    type: Types.FETCH_DECKS,
    decks
});
