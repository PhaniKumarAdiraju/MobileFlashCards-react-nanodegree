import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'

export default class Quiz extends Component {

    state = {
        score: 0,
        questionID: 0,
        shouldDisplayAnswer: false,
    };

    startQuiz = () => {
        this.setState({
            score: 0,
            questionID: 0,
            shouldDisplayAnswer: false});
    };

    revealAnswer = () => {
        this.setState({
            shouldDisplayAnswer: !this.state.shouldDisplayAnswer
        });
    };

    onRightAnswer = () => {
        const {score, questionID} = this.state;
        this.setState({
            score: score + 1,
            questionID: questionID + 1,
            shouldDisplayAnswer: false
        });
    };

    onWrongAnswer = () => {
        this.setState({
            questionID: this.state.questionID + 1
        });
    };

    backToDeck = () => {
        this.props.navigation.goBack();

    }

    render() {
        const {questionID, score, shouldDisplayAnswer} = this.state;
        let {questions} = this.props.navigation.state.params;
        const questionsRemaining = questions.length - questionID;

        return (
            <View style={{flex: 1}}>
                {questionID < questions.length ? (
                    <View style={styles.container}>

                        <View style={{justifyContent: 'flex-start'}}>
                            <View>
                                <Text> {questionsRemaining} / {questions.length} </Text>
                            </View>
                        </View>

                        <View style={styles.qAndA}>
                            <View>
                                {shouldDisplayAnswer ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={styles.title}>{questions[questionID].answer}</Text>

                                        <TouchableOpacity onPress={this.revealAnswer}>
                                            <Text style={styles.subtitle}>Question</Text>
                                        </TouchableOpacity>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={styles.title}>{questions[questionID].question}</Text>

                                        <TouchableOpacity onPress={this.revealAnswer}>
                                            <Text style={styles.subtitle}>Answer</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={styles.optionsSection}>
                            <View style={styles.container}>
                                <TouchableOpacity onPress={this.onRightAnswer} style={[styles.optionButton, {backgroundColor: 'green'}]}>
                                    <Text style={styles.optionText}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onWrongAnswer} style={[styles.optionButton, {backgroundColor: 'red'}]}>
                                    <Text style={styles.optionText}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                ) : (
                    <View style={styles.container}>
                        <Text> Your Score: {score}</Text>
                        {Alert.alert('Quiz Completed')}
                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>
                                <TouchableOpacity onPress={this.startQuiz} style={[styles.optionButton, {backgroundColor: 'green'}]}>
                                    <Text style={styles.optionText}>Start Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.backToDeck} style={[styles.optionButton, {backgroundColor: 'red'}]}>
                                    <Text style={styles.optionText}>Back to Deck</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        margin: 20,
    },
    title: {
        fontSize: 36
    },
    subtitle: {
        fontSize: 18,
        color: 'green',
    },
    qAndA: {
        marginTop: 25
    },
    optionsSection: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    optionButton: {
        borderWidth: 3,
        borderRadius: 10,
        margin: 20,
    },
    optionText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
        padding: 25,
    },

});
