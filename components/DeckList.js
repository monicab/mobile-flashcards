import React, { Component } from 'react';
import { connect } from 'react-redux'

import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { DeckItem } from './DeckItem'

import { getDecksFromStorage, clearAllDecksFromStorage } from '../utils/api'
import { getDecks, clearDecks, setCurrentDeck } from '../actions'
import { purple, white } from '../utils/colors'

export class DeckList extends Component {
  componentDidMount = () => {
    getDecksFromStorage().then((decks) => {
      this.props.dispatch(getDecks(decks));
    });
  }

  onPressDeck = (deck) => {
    this.props.dispatch(setCurrentDeck(deck));
    this.props.navigation.navigate(
      'DeckDetails',
      { deck: deck }
    )
  }

  clearAllDecks = () => {
    clearAllDecksFromStorage().then(() => {
      this.props.dispatch(clearDecks())
    })
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.row}>
        <View containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
          <FlatList
            data={Object.values(this.props.decks || {})}
            keyExtractor={item => '' + item.id}
            renderItem={({item}) => (
              <DeckItem deck={item} onPressDeck={this.onPressDeck}/>
            )}
            ItemSeparatorComponent={this.renderSeparator}
          />

        </View>
        <View>
          <TouchableOpacity style={styles.iosSubmitBtn}
                            onPress={ this.clearAllDecks }>
            <Text style={styles.submitBtnText}>Clear All Decks</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps (state) {
  const { decks } = state

  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },

  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },

  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },

});