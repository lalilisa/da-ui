import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import RegistrationSVG from '../assets/images/misc/registration.svg';
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
import { API_LOGIN, API_REGISTER } from '../constants/api.consts';
import axios from 'axios';
import { handleRestapi } from '../constants/common';


const RegisterScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const showToastWithGravityAndOffset = (txt) => {
    ToastAndroid.showWithGravityAndOffset(
      txt,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const handleRegister = async () => {

    const headers = { 'Content-Type': 'application/json' };
    if (password !== confirmPassword) {
      showToastWithGravityAndOffset("Xác nhận mật khẩu không đúng");
    }
    else {
      const data = { username: username, password: password, phoneNumber: phone, fullName: fullName, dob: dobLabel, emai: 'trimai' };
      const response = (await handleRestapi(API_REGISTER, "POST", data, headers));
      if (response?.status === 200) {
        setDate("")
        setFullName("")
        setPassword("")
        setConfirmPassword("")
        setPhone("")
        setUsername("")
        setDobLabel("")
        showToastWithGravityAndOffset("Đăng kí tài khoản thành công");
      }
      console.log(response?.data?.errorMap?.errorCode)
      if (response?.data?.errorMap?.errorCode === "E0001") {
        showToastWithGravityAndOffset("Số điện thoại hoặc Username đã tồn tại");
      }
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={require('../assets/ic_launcher.png')} style={{ height: 100, width: 100, alignSelf: 'center' }} />

        </View>

        <Text
          style={{
            position: 'relative',
            top: 20,
            fontFamily: 'Roboto-Medium',
            fontSize: 30,
            fontWeight: '700',
            color: '#333',
            textAlign: 'center',
            marginBottom: 15,
          }}>
          Register
        </Text>



        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          {/* Or, register with email ... */}
        </Text>

        <InputField
          onChange={setFullName}
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />

        <InputField
          onChange={setUsername}
          label={'Username'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />
        <InputField
          onChange={setPhone}
          label={'Phone'}
          icon={
            <MaterialIcons
              name="phone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />
        <InputField
          onChange={setPassword}
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
        />

        <InputField
          onChange={setConfirmPassword}
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{ color: '#666', marginLeft: 5, marginTop: 5 }}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date('2005-01-01')}
          minimumDate={new Date('1980-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <CustomButton label={'Register'} onPress={handleRegister} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: 'black', fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
