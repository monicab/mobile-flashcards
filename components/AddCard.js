import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

import { saveDeckInStorage } from '../utils/api'
import { addDeck, setCurrentDeck } from '../actions'

export class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      errors: {},
    }
  }

  addCard = () => {
    //validate inputs
    let errors = {};
    if (!this.state.question) errors['question'] = 'A card must have an question';
    if (!this.state.answer) errors['answer'] = 'A card must have an answer';

    if (Object.keys(errors).length > 0) {
      this.setState(() => ({errors: errors}))
      return;
    }

    let { deck } = this.props.navigation.state.params;
    deck.cards = deck.cards || [];
    deck.cards.push({
      question: this.state.question,
      answer: this.state.answer,
    });

    saveDeckInStorage(deck).then(() => {
      this.props.dispatch(addDeck(deck));
      this.props.dispatch(setCurrentDeck(deck));
      this.props.navigation.navigate(
        'DeckDetails',
        { deck: deck }
      )
    })
  }

  render() {
    return (
      <View style={{marginTop: 30}}>
        <View style={styles.row}>
          <TextInput style={styles.input}
                     placeholder={'Question'}
                     onChangeText={(question) => this.setState({question})}
                     value={this.state.question}
          />
          <Text style={styles.errorText}>{this.state.errors['question']}</Text>
        </View>
        <View style={styles.row}>
          <TextInput style={styles.input}
                     placeholder={'Answer'}
                     onChangeText={(answer) => this.setState({answer})}
                     value={this.state.answer}
          />
          <Text style={styles.errorText}>{this.state.errors['answer']}</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.iosSubmitBtn}
                            onPress={ this.addCard }>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  const { decks } = state

  return {
    decks
  }
}

export default connect(mapStateToProps)(AddCard)

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    color: 'red',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
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

  row: {
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
  },

  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});