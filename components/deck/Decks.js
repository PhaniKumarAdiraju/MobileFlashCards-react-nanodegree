import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import { fetchDecks } from '../../utils/storeAPI'
import { getDecks } from '../../actions/index'
import DeckTile from './DeckTile'

class Decks extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        fetchDecks().then(decks => dispatch(getDecks(decks)))
            .then(() => this.setState(() => ({ready: true})));
    }

    renderItem = ({item}) => (
        <View>
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('Deck', item)}>
                <DeckTile
                    questions={item.questions}
                    title={item.title} />
            </TouchableOpacity>
        </View>
    );

    render() {
        return (
            <View style={styles.deck}>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={Object.values(this.props.decks)}
                    renderItem={this.renderItem}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        height: Dimensions.get('window').height
    },
});

export default connect(mapStateToProps)(Decks);
