import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { red, green } from '../utils/colors'

import { defaultStyles, getButtonStyle } from '../utils/styles'

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

    this.opacityFrontAnimatedValue = new Animated.Value(1);
    this.opacityBackAnimatedValue = new Animated.Value(0);
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 800
      }).start();
      Animated.timing(this.opacityFrontAnimatedValue, {
        toValue: 1,
        duration: 800,
      }).start();
      Animated.timing(this.opacityBackAnimatedValue, {
        toValue: 0,
        duration: 800,
      }).start();
    }
    else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        duration: 800
      }).start();
      Animated.timing(this.opacityFrontAnimatedValue, {
        toValue: 0,
        duration: 800,
      }).start();
      Animated.timing(this.opacityBackAnimatedValue, {
        toValue: 1,
        duration: 800,
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
    };

    const frontAnimatedOpacity = {
      opacity: this.opacityFrontAnimatedValue
    }

    const backAnimatedOpacity = {
      opacity: this.opacityBackAnimatedValue
    }

    let { card, onPressCorrect, onPressIncorrect} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 2, alignItems: 'center'}}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle, frontAnimatedOpacity]}>
            <Text style={styles.question}>{card.question}</Text>
            <Text style={styles.label} >Question</Text>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, backAnimatedOpacity]}>
            <Text style={styles.answer}>{card.answer}</Text>
            <Text style={styles.label} >Answer</Text>
          </Animated.View>
        </View>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={ this.flipCard }>
            <Text style={styles.flipLink} >FLIP CARD</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={[getButtonStyle(), styles.greenBtn]}
                              onPress={ onPressCorrect }>
              <Text style={styles.submitBtnText}>Correct</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={[getButtonStyle(), styles.redBtn]}
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
  ...defaultStyles,
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 40,
    textAlign: 'center',
  },
  answer: {
    fontSize: 40,
    color: 'gray',
    textAlign: 'center',
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: red,
    margin: 20,
  },
  greenBtn: {
    backgroundColor: green,
  },
  redBtn: {
    backgroundColor: red,
  },
  flipCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
