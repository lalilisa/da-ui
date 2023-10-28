import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { FONTS, COLORS, SIZES } from '../constants'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { TouchableOpacity } from 'react-native'
import { handleRestapi } from '../constants/common'
import { VERIFI_OTP } from '../constants/api.consts'
import showToastWithGravityAndOffset from '../components/ToastMessage'
import { useRoute } from '@react-navigation/native';

const VerifiOpt = ({ navigation }) => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const route = useRoute();
    const verifiOpt = async () => {
        const transaction =  route.params?.transaction; // Receiving Value
        const headers = { 'Content-Type': 'application/json' }; {
            const response = await handleRestapi(VERIFI_OTP, "POST", transaction, headers);
            if (response?.status === 200) {
                await AsyncStorage.setItem('accessToken', response?.data?.accessToken);
                navigation.navigate("Tab")
            }
            if (response?.status === 400) {
                showToastWithGravityAndOffset("OTP không hợp lệ")
            }
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : ""}
                style={{
                    height: "100%",
                    width: "100%",
                    background: "#fff",
                }}
            >
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 36, marginVertical: 60, color: "#111" }}>
                        Xác nhận OTP
                    </Text>
                    <Text style={{ fontSize: 15, color: "#111" }}>
                        Vui lòng không cấp OTP cho bất kì ai
                    </Text>
                    {/* <Text style={{ fontSize: 15, color: "#111" }}>
                        Xác nhận OTP
                    </Text>
                    <Text style={{ fontSize: 16, color: "#111", marginTop: 10 }}>
                        Xác nhận OTP
                    </Text > */}
                    <View style={{ width: "100%", paddingHorizontal: 22 }}>
                        <OTPInputView style={{ width: "100%", height: 150, paddingHorizontal: 10 }}
                            editable={true}
                            pinCount={6}
                            autoFocusOnLoad
                            codeInputFieldStyle={{
                                width: 40,
                                height: 45,
                                color: "black",
                                marginLeft: 4,
                                marginRight: 4,
                                borderWidth: 0,
                                borderBottomWidth: 3,
                                borderBottomColor: "#E5E4E2",
                                fontSize: 20
                            }}
                            codeInputHighlightStyle={{
                                borderColor: "#2ab12f"
                            }}
                            onCodeFilled={
                                (code) => {
                                    console.log(`Code is ${code}`)
                                }
                            }
                        >
                        </OTPInputView>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "black",
                                paddingVertical: 12,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 8,
                                paddingVertical: 16,
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: '600' }} onPress={()=>{verifiOpt}}>Xác nhận</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "center",
                                paddingTop: 8,
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}> Gửi lại OTP </Text>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#342342",
                                    paddingVertical: 12,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 8,
                                    paddingVertical: 16,
                                }}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


export default VerifiOpt;