import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

import { defaultStyles } from '../utils/styles'

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
    const percentage = Math.round((totalCorrect/totalCards) * 100);
    const thumbsUpIcon = (Platform.OS == 'ios') ? 'ios-thumbs-up' : 'md-thumbs-up';
    const thumbsDownIcon = (Platform.OS == 'ios') ? 'ios-thumbs-down' : 'md-thumbs-down';
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.subTitle}>Total Percentage Correct</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.percentage}>{percentage} %</Text>
        </View>
        { percentage >= 75 &&
          (<View style={styles.row}>
            <Ionicons name={thumbsUpIcon} size={50} color={'green'} />
          </View>)
        }
        { percentage >= 50 && percentage < 75 &&
        (<View style={styles.row}>
          <Ionicons name={thumbsUpIcon} size={50} color={'yellow'} />
        </View>)
        }
        { percentage < 50 &&
        (<View style={styles.row}>
          <Ionicons name={thumbsDownIcon} size={50} color={'red'} />
        </View>)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...defaultStyles,
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
  percentage: {
    fontSize: 50,
    fontWeight: "bold",
  }
})
