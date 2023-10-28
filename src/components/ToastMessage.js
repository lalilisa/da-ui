import {
    ToastAndroid,
  } from 'react-native';

const showToastWithGravityAndOffset = (txt) => {
    ToastAndroid.showWithGravityAndOffset(
      txt,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

export default showToastWithGravityAndOffset;