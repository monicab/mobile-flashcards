import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

import { saveDeckInStorage } from '../utils/api'
import { addDeck } from '../actions'

export class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }

  createDeck = () => {
    const deck = {
      title: this.state.text,
      cards: [],
    }
    saveDeckInStorage(deck).then((deck) => {
      this.props.dispatch(addDeck(deck));
      this.props.navigation.goBack();
    })
  }

  render() {
    return (
      <View style={styles.center}>
        <Text>What is the title of your new deck?</Text>
        <View style={styles.row}>
          <TextInput style={styles.input}
                     placeholder={'Deck Title'}
                     onChangeText={(text) => this.setState({text})}
                     value={this.state.text}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.iosSubmitBtn}
                            onPress={ this.createDeck }>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    margin: 40,
    borderRadius: 5,
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

export default connect()(NewDeck)