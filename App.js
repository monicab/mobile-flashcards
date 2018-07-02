import React from 'react'
import { Provider } from 'react-redux'
import { setLocalNotification } from './utils/helpers'

import store from './store'

import { View, StatusBar, Platform } from 'react-native'

import { Constants } from 'expo'
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import AddCard from './components/AddCard'
import DeckDetails from './components/DeckDetails'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import { Quiz } from './components/Quiz'

import { blue, white, purple, pink, gray } from './utils/colors'

function FlashCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

function Tabs () {
  const paramOne = {
    Decks: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
      },
    }
  }

  const paramTwo = {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }

  if (Platform.OS === 'ios') {
    return createBottomTabNavigator(paramOne, paramTwo)
  }
  else {
    return createMaterialTopTabNavigator(paramOne, paramTwo)
  }
}

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs(),
    navigationOptions: {
      header: null
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions:
      {
        headerTintColor: white,
        headerStyle:
          {
            backgroundColor: gray,
          }
      }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions:
      {
        headerTintColor: white,
        headerStyle:
          {
            backgroundColor: gray,
          }
      }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions:
      {
        title: 'Add Card',
        headerTintColor: white,
        headerStyle:
          {
            backgroundColor: gray,
          }
      }
  }
})


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashCardsStatusBar backgroundColor={blue} barStyle="light-content" />
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
