import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import { saveDeck } from '../../utils/storeAPI'
import { addDeck } from '../../actions/index'

class NewDeck extends Component {

    componentWillMount() {
        this.setState({
            text: ''
        })
    }

    createNewDeck = () => {
        const {decks} = this.props
        const input = this.state

        if (!input.text) {
            Alert.alert('Please specify Deck Name')
        } else {
            if (decks[input.text]) {
                Alert.alert('Deck Name Already exists')
            } else {
                const newDeck = {[input.text]: {questions: [], title: input.text}}

                this.props.dispatch(addDeck(newDeck))
                saveDeck(newDeck)

                Alert.alert(
                    'Success', 'Added Deck',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('Deck', {
                            title: input.text,
                            questions : []
                        })},
                    ],
                )

                this.setState({text: ''})
            }
        }
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={style.container}>
                <Text style={style.deckTitle}>What is the title of your new deck ?</Text>

                <TextInput
                    placeholder="Deck Title"
                    placeholderTextColor="grey"
                    value={this.state.text}
                    style={style.input}
                    onChangeText={text => this.setState({text})}/>
                <TouchableOpacity
                    onPress={this.createNewDeck}
                    style={style.submitButton}>
                    <Text style={style.submitText}>Submit</Text>

                </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    deckTitle: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 40,
    },
    input: {
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        padding: 15,
        margin: 15
    },
    submitButton: {
        backgroundColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        margin: 20,
    },
    submitText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
        padding: 25,
    },
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(NewDeck);
