import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { white, purple } from '../utils/colors'

import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

export class QuizSummary extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz Summary`,
    };
  };

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    const { deck, totalCorrect } = this.props;
    const totalCards =  deck.cards ? deck.cards.length : 0;
    return (
      <View>
        <View style={styles.row}>
          <Text>Total Percentage Correct</Text>
        </View>
        <View style={styles.row}>
          <Text>{(totalCorrect/totalCards) * 100} %</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  space: {
    flex: 1,
    padding: 10
  }
})