import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';





import CustomButton from '../components/CustomButton';

import PhoneInput, { isValidNumber } from "react-native-phone-number-input";
import { handleRestapi } from '../constants/common';
import { SEND_OTP } from '../constants/api.consts';
import showToastWithGravityAndOffset from '../components/ToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RequestOtpScreen = ({ navigation }) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef("");

    const requestOtp = async () => {
        const data = { "phonenumber": value }
        const headers = { 'Content-Type': 'application/json' };
        const response = await handleRestapi(SEND_OTP, "POST", data, headers);
        const transaction = { transactionId: response?.data?.transactionId, otp: response?.data?.otp };
        navigation.navigate("VerifiOpt",transaction)

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
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#333',
                        textAlign: 'center',
                        marginTop: 20,
                        marginBottom: 30,
                    }}>
                    Đăng nhập bằng số điện thoại
                </Text>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="VN"
                    layout="first"
                    disableArrowIcon={true}
                    onChangeText={(text) => {
                        setValue(text);
                    }}
                    onChangeFormattedText={(text) => {
                        setFormattedValue(text);
                        isValidNumber(value, "VN");
                    }}
                    withDarkTheme={true}
                    withShadow={true}
                    autoFocus={true}
                    countryPickerProps="VN"
                    // flagButtonStyle = {}
                    // disabled = {true}
                    countryPickerButtonStyle={
                        {
                            alignItems: 'center',
                            borderRightColor: '#808080',
                            borderRightWidth: 1,
                            opacity: 1,
                            // pointerEvents: 'none',

                        }
                    }
                    containerStyle={
                        {
                            textAlign: 'center',
                            fontWeight: '500',
                            fontSize: 14,
                            borderRadius: 10,
                            // height : 50,
                            width: '99%',
                            padding: 0,
                            marginBottom: 20,
                            borderColor: 'black',
                            borderWidth: 1,

                        }
                    }
                    textInputStyle={{
                        padding: 0,
                    }}
                    textContainerStyle={{
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10
                    }}


                />
                <CustomButton label={"Get OTP"} onPress={() => { requestOtp() }} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        // marginBottom: 30,
                    }}>
                    {/* <Text>New to the app?</Text> */}
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        {/* <Text style={{ color: 'black', fontWeight: '700' }}> Register</Text> */}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default RequestOtpScreen;
