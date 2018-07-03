import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { DeckItem } from './DeckItem'

import { loadDecks, clearDecks, setCurrentDeck } from '../actions'
import { purple, white } from '../utils/colors'
import { defaultStyles, getButtonStyle } from '../utils/styles'

export class DeckList extends Component {
  componentDidMount = () => {
    this.props.loadDecks();
  }

  onPressDeck = (deck) => {

    this.props.setCurrentDeck(deck);
    this.props.navigation.navigate(
      'DeckDetails',
      { deck: deck }
    )
  }

  clearAllDecks = () => {
    this.props.clearDecks();
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
      <View style={{flex: 1}}>
        <View style={[{flex: 1}, styles.topBar]}>
          <TouchableOpacity style={getButtonStyle()}
                            onPress={ this.clearAllDecks }>
            <Text style={styles.submitBtnText}>Clear All Decks</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 10}}>
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
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { decks } = state
  return {
    decks
  }
}

const mapDispatchToPros = (dispatch) => {
  return bindActionCreators({ loadDecks, clearDecks, setCurrentDeck }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToPros,
)(DeckList)

const styles = StyleSheet.create({
  ...defaultStyles,

  topBar: {
    flex: 1,
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white'
  }

});
