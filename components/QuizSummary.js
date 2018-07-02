import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { white, purple } from '../utils/colors'

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
  subTitle: {
    fontSize: 20,
    color: 'gray',
  },
  percentage: {
    fontSize: 50,
    fontWeight: "bold",
  }
})
