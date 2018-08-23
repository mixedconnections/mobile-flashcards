import {AsyncStorage} from 'react-native';

export const DECKS_STORAGE_KEY = 'decks:mobile-flashcards';

let data = {
    Udacicards: {
        title: 'Udacicards',
        questions: [
            {
                question: 'What is Udacity?',
                answer: 'An online educational company'
            },
            {
                question: 'What is the Udacity Nanodegree program?',
                answer: 'A paid credential program'
            }
        ]
    },
    Perl: {
        title: 'Perl',
        questions: [
            {
                question: 'What is a pumpking?',
                answer: 'The person responsible for a particular Perl release.'
            },
            {
                question: 'How old is Perl?',
                answer: '31 years.'
            }
        ]
    }
};

export function savedData() {
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    return data;
}

export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
        return results === null ? savedData() : JSON.parse(results)
    });
}

export function createDeck(deck) {
    let newDeck = JSON.stringify(deck);	
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, newDeck);
}

export function addQuestionForDeck({question, deckName}) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        let decks = JSON.parse(result);

        let newQuestions = JSON.parse(JSON.stringify(decks[deckName].questions));
        newQuestions[newQuestions.length] = question;

        const value = JSON.stringify({
           [deckName]: {title: deckName, questions: newQuestions}
        });

        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, value);
    });
}
