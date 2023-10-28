import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import messaging from '@react-native-firebase/messaging'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_LOGIN } from '../constants/api.consts';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleRestapi } from '../constants/common';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const showToastWithGravityAndOffset = (txt) => {
    ToastAndroid.showWithGravityAndOffset(
      txt,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const handleLogin = async () => {

    const getFcmToken = async () => {
      const token = await messaging().getToken();
      return token;
    }
    const deviceUUID = await getFcmToken();
    const headers = { 'Content-Type': 'application/json', 'deviceUUID': deviceUUID };
    const data = { username: username, password: password };
    const response = await handleRestapi(API_LOGIN, "POST", data, { headers: headers });
    if (response?.status === 400) {
      showToastWithGravityAndOffset("Thông tin đầu vào không hợp lệ")
    }
    else if (response?.status === 200) {
      await AsyncStorage.setItem('accessToken', response?.data?.accessToken);
      navigation.navigate("Tab")
    }


  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white', height: '100%' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Image source={require('../assets/ic_launcher.png')} style={{ height: 100, width: 100 }} />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 30,
            fontWeight: '700',
            color: '#333',
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Username'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          onChange={setUsername}
          // onChange={()=>{setUsername()}}
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => { }}
          onChange={setPassword}
        />

        <CustomButton label={"Login"} onPress={() => { handleLogin() }} />

        <TouchableOpacity onPress={() => { navigation.navigate('RequestOtp') }}>
          <Text
            style={{ textAlign: 'center', color: 'black', marginBottom: 10, fontWeight: '800' }}
          >
            Login with OPT
          </Text>
        </TouchableOpacity>


        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
      
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>

          </TouchableOpacity>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: 'black', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  );
};

export default LoginScreen;
