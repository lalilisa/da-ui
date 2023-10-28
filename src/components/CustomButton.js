import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '500',
          fontSize: 14,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
