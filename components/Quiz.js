import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { purple, white } from '../utils/colors'

import { QuizSummary } from './QuizSummary'
import { QuizCard } from './QuizCard'

export class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCardIndex: 0,
      totalCorrect: 0,
    }
  }

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

  onPressCorrect = () => {
    let {currentCardIndex, totalCorrect } = this.state;
    this.setState(() => ({ totalCorrect: totalCorrect+1 }));
    this.setState(() => ({ currentCardIndex: currentCardIndex+1 }))
  }

  onPressIncorrect = () => {
    let {currentCardIndex } = this.state;
    this.setState(() => ({ currentCardIndex: currentCardIndex+1 }))
  }

  getCurrentCard = (cards, totalCards, currentCardIndex) => {
    if (currentCardIndex <= totalCards - 1) {
      return cards[currentCardIndex]
    }
  }

  getCounterText = (currentCardIndex, totalCards) => {
    const current = (currentCardIndex < totalCards) ? currentCardIndex + 1 : totalCards;
    return `${current} / ${totalCards} `
  }

  render() {
    let {currentCardIndex, totalCorrect } = this.state;
    let { deck } = this.props.navigation.state.params;
    let cards = deck.cards || [];
    let totalCards = cards.length;
    let currentCard = this.getCurrentCard(cards, totalCards, currentCardIndex);

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.counter}>{this.getCounterText(currentCardIndex, totalCards)} </Text>
        </View>
        <View style={{flex: 9}}>
          { !currentCard && totalCards > 0 && (
            <QuizSummary totalCorrect={totalCorrect} deck={deck}/>
          )}
          { currentCard && (
            <QuizCard card={currentCard}
                      onPressCorrect={this.onPressCorrect}
                      onPressIncorrect={this.onPressIncorrect} />)}
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

  counter: {
    margin: 10,
    fontSize: 15,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
  }
});
