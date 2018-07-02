import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { purple, white } from '../utils/colors'

import { QuizSummary } from './QuizSummary'

export class QuizCard extends Component {
  componentWillMount = () => {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) =>  {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 800
      }).start();
    }
    else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        duration: 800
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    };

    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    let { card, onPressCorrect, onPressIncorrect} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 2, alignItems: 'center'}}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.question}> -- {card.question} -- </Text>
            <Text style={styles.label} >Question</Text>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
            <Text style={styles.answer}>-- {card.answer} --</Text>
            <Text style={styles.label} >Answer</Text>
          </Animated.View>
        </View>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={ this.flipCard }>
            <Text style={styles.flipLink} >Flip Card!</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={[styles.iosSubmitBtn, styles.greenBtn]}
                              onPress={ onPressCorrect }>
              <Text style={styles.submitBtnText}>Correct</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={[styles.iosSubmitBtn, styles.redBtn]}
                              onPress={ onPressIncorrect }>
              <Text style={styles.submitBtnText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
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
  question: {
    fontSize: 40,
  },
  answer: {
    fontSize: 40,
    color: 'gray',
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    margin: 20,
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
  greenBtn: {
    backgroundColor: 'green',
  },
  redBtn: {
    backgroundColor: 'red',
  },
  flipCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    left: 6,
    right: 6,
    bottom: 0,
  },
  flipLink: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});