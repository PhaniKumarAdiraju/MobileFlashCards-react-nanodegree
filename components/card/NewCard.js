import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import { connect } from 'react-redux'

import { addCardToDeck } from '../../utils/storeAPI'
import { addCard } from '../../actions/index'

class NewCard extends Component {
    state = {
        question: '',
        answer: ''
    };

    submitCard = () => {
        const {question, answer} = this.state;
        const {questions, title} = this.props.navigation.state.params;

        if (question === '') {
            Alert.alert('Please specify Question')
            return
        }
        if (answer === '') {
            Alert.alert('Please specify Answer')
            return
        }
        const params = {questions, title, question, answer};

        this.props.dispatch(addCard(params));

        addCardToDeck({
            deckName: title,
            card: {question, answer},
        });

        Alert.alert('Success','Successfully Added Card',
            [
                {
                    text: 'OK', onPress: () =>
                    this.props.navigation.goBack()
                }
            ],);
    };

    render() {
        const {question, answer} = this.state;

        return (
            <KeyboardAvoidingView behavior='padding' style={style.container}>
                <TextInput
                    placeholder="Enter Question"
                    placeholderTextColor="grey"
                    style={style.input}
                    value={question}
                    onChangeText={question => this.setState({question})}/>
                <TextInput
                    placeholder="Enter Answer"
                    placeholderTextColor="grey"
                    style={style.input}
                    value={answer}
                    onChangeText={answer => this.setState({answer})}/>
                <TouchableOpacity
                    style={style.submitButton}
                    onPress={this.submitCard}>
                    <Text style={style.submitText}>Submit</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 20,
    },
    input: {
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        padding: 15,
        margin: 15,
    },
    submitText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
        padding: 25,
    },
    submitButton: {
        backgroundColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        margin: 20,
    },
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(NewCard);