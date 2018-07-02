import React, { Component } from 'react';
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native'

export class DeckItem extends Component {
  onPress = () => {
    this.props.onPressDeck(this.props.deck);
  }

  render() {
    const { title, cards } = this.props.deck;
    const totalCards = cards ? cards.length : 0;
    return (
      <TouchableHighlight style={styles.item} onPress={this.onPress} underlayColor={'lightblue'}>
        <View>
          <Text style={styles.title}>{ title }</Text>
          <Text style={[styles.subTitle, styles.center]}>{ totalCards } cards</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  item: {
    alignItems: 'center',
    height: 80,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
  },
});