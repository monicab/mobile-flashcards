import React, { Component } from 'react'
import PropTypes  from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addDeck } from '../actions'
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

export class NewDeck extends Component {
  static propTypes = {
    addDeck: PropTypes.func.isRequired,
  }

  initialState = {
    text: '',
    error: ''
  }

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.initialState)
  }

  createDeck = () => {
    if (!this.state.text) {
      this.setState(() => ({error: 'Please enter a title for your new deck'}));
      return;
    }

    const deck = {
      title: this.state.text,
      cards: [],
    }
    this.props.addDeck(deck).then(() => {
      this.setState(() => (this.initialState));
      this.props.navigation.goBack();
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.center} behavior="padding" enabled>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input}
                       placeholder={'Deck Title'}
                       onChangeText={(text) => this.setState({text})}
                       value={this.state.text}
            />
            <Text style={styles.errorText}>{this.state.error}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.iosSubmitBtn}
                            onPress={ this.createDeck }>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    margin: 30,
    textAlign: 'center',
  },

  inputContainer: {
    margin: 40,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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

  errorText: {
    color: 'red',
  }
});

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addDeck }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
