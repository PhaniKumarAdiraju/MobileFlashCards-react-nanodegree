import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {StackNavigator, TabNavigator} from 'react-navigation';

import reducer from './reducers/index'
import NewCard from './components/card/NewCard'
import Decks from './components/deck/Decks'
import Deck from './components/deck/Deck'
import NewDeck from './components/deck/NewDeck'
import Quiz from './components/quiz/Quiz'
import { setLocalNotification } from './utils/notificationAPI'

const Tabs = TabNavigator({
        Decks: {
            screen: Decks,
            navigationOptions: {
                tabBarLabel: 'DECKS'
            },
        },
        NewDeck: {
            screen: NewDeck,
            navigationOptions: {
                tabBarLabel: 'NEW DECK',
            },
        },
    }
);

const AppNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {title: 'Home'},
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: 'black',
        },
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: 'black',
        },
    },
    NewCard: {
        screen: NewCard,
        navigationOptions: {
            title: 'Add Question',
            headerTintColor: 'black',
        },
    },
});


export default class App extends Component {
    componentDidMount(){
        setLocalNotification()
    }
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={styles.container}>
                    <AppNavigator/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
