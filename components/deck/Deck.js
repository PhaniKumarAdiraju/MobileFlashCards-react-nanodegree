import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {

    render() {
        let {title} = this.props.navigation.state.params;
        let questions = this.props.decks[title] && this.props.decks[title].questions;

        return (
            <View style={styles.container}>
                <View style={styles.deckInfo}>
                    <Text style={styles.deckTitle}>
                        {title}
                    </Text>
                    <Text style={styles.deckCards}>
                        {questions.length} cards
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('NewCard', {
                            questions,
                            title,
                        });
                    }}
                    style={styles.addCard}>
                    <Text style={styles.addCardTitle}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Quiz', {
                            title,
                            questions,
                        });
                    }}
                    style={styles.startQuiz}>
                    <Text style={styles.startQuizTitle}>Start Quiz</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    deckInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deckTitle: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    deckCards: {
        fontSize: 22,
        marginTop: 12,
        color: 'grey',
    },
    addCard: {
        borderColor: 'black',
        borderWidth: 3,
        margin: 20,
        marginTop: 150,
        padding: 20,
        borderRadius: 10,
    },
    addCardTitle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 22,
    },
    startQuiz: {
        backgroundColor: 'black',
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },
    startQuizTitle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
    }
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(Deck);
