import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white, purple } from '../utils/colors'

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
          <View style={styles.row}>
            <Text style={styles.title}>{deck.title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.subTitle}>{totalCards} cards</Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <View>
            <TouchableOpacity style={styles.iosSubmitBtn}
                              onPress={() => this.props.navigation.navigate('AddCard', { deck })}>
              <Text style={styles.submitBtnText}>Add Card</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.iosSubmitBtn}
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
  title: {
    fontSize: 30,
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: 'pink',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})
