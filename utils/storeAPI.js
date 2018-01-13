import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'MobileFlashCard:decks'

let data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

export function initData() {
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    return data
}

export function saveDeck(deck) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck))
}

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(results => {
         return results === null ? initData() : JSON.parse(results)
        })
}

export function addCardToDeck({card, deckName}) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY, (err, result) => {
        let decks = JSON.parse(result);

        let newCards = JSON.parse(JSON.stringify(decks[deckName].questions));
        newCards[newCards.length] = card;

        const value = JSON.stringify({
            [deckName]: {title: deckName, questions: newCards},
        });

        AsyncStorage.mergeItem(DECK_STORAGE_KEY, value);
    });
}