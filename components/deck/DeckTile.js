import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class DeckTile extends Component {
    render() {
        const {title, questions} = this.props;

        return (
            <View style={styles.deck}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.deckCards}>
                        {questions && questions.length} cards
                    </Text>
                </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 140,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        elevation: 4,
    },
    deckTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    deckCards: {
        fontSize: 18,
        marginTop: 12,
        color: 'grey',
    },
});

export default DeckTile