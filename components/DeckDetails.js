import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { defaultStyles, getButtonStyle } from '../utils/styles'

export class DeckDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('deck').title}`,
    };
  };

  render() {
    const { deck } = this.props;
    const totalCards =  deck.cards ? deck.cards.length : 0;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <View>
            <Text style={styles.title}>{deck.title}</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>{totalCards} cards</Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <View>
            <TouchableOpacity style={getButtonStyle()}
                              onPress={() => this.props.navigation.navigate('AddCard', { deck })}>
              <Text style={styles.submitBtnText}>Add Card</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={getButtonStyle()}
                              onPress={() => this.props.navigation.navigate('Quiz', { deck })}>
              <Text style={styles.submitBtnText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  const { currentDeck } = state;

  return {
    deck: currentDeck,
  }
}

export default connect(mapStateToProps)(DeckDetails);

const styles = StyleSheet.create({
  ...defaultStyles
})
