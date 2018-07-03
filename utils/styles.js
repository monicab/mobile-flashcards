import { purple, white, red } from './colors'
import { Platform } from 'react-native'

export const defaultStyles = {
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    color: red,
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
    marginLeft: 40,
    marginRight: 40,
  },

  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },

  title: {
    fontSize: 30,
    margin: 30,
    textAlign: 'center',
  },

  subTitle: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
  },
}

export const getButtonStyle = () => {
  return Platform.OS == 'ios' ? defaultStyles.iosSubmitBtn : defaultStyles.AndroidSubmitBtn;
}
