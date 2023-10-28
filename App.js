import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabScreen from "./src/screens/TabScreen";
import WatchScreen from "./src/screens/WatchScreen";
import SelectScreen from "./src/screens/SelectScreen";
import GeneralSettingsScreen from "./src/screens/GeneralSettingsScreen";
import AboutScreen from "./src/screens/AboutScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import { Storage } from "./src/components/Storage";
import WeCimaExtractionScreen from "./src/screens/WeCimaExtractionScreen";
import { getPaletteSync } from "@assembless/react-native-material-you";
import {
	Provider as PaperProvider,
	useTheme,
	MD3DarkTheme as DefaultTheme,
} from "react-native-paper";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import RequestOtpScreen from "./src/screens/RequestOpt";
import VerifiOpt from "./src/screens/VerifiOpt";
import firebase from '@react-native-firebase/app'
const Stack = createNativeStackNavigator();

const MyStack = () => {
	const firebaseConfig = {
		apiKey: "AIzaSyBTL-aV5mcuJ9kFkgXgRR_GpQn7iFS5YoU",
		authDomain: "testnoti-97753.firebaseapp.com",
		projectId: "testnoti-97753",
		storageBucket: "testnoti-97753.appspot.com",
		messagingSenderId: "406003418859",
		appId: "1:406003418859:web:76b4df384b47519438e0ae",
		measurementId: "G-MNVWPF0C1R"
	}
	const theme = useTheme();
	//if(firebase.length === 0)
	//firebase.initializeApp(firebaseConfig)
	return (
		<Stack.Navigator
			initialRouteName={"Login"}
			screenOptions={{
				statusBarColor: theme.dark ? "black" : "white",
				statusBarStyle: theme.dark ? "light" : "dark",
				headerStyle: { backgroundColor: theme.colors.background },
				headerTintColor: theme.dark ? "white" : "black",
				headerShadowVisible: false,
				contentStyle: { backgroundColor: theme.colors.background },
			}}>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="RequestOtp"
				component={RequestOtpScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="VerifiOpt"
				component={VerifiOpt}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Tab"
				component={TabScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Watch"
				component={WatchScreen}
				options={{
					headerShown: false,
					orientation: "all",
					statusBarHidden: true,
					navigationBarHidden: true,
				}}
			/>
			<Stack.Screen
				name="Select"
				component={SelectScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Loading"
				component={LoadingScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="WeCima Extraction"
				component={WeCimaExtractionScreen}
				options={{ headerShown: false, animation: "none" }}
			/>
			<Stack.Screen name="General Settings" component={GeneralSettingsScreen} />
			<Stack.Screen name="About" component={AboutScreen} />
		</Stack.Navigator>
	);
};

const App = () => {
	if (!Storage.contains("pureBlack")) {
		Storage.set("pureBlack", true);
	} else {
		// pass
	}

	const palette = getPaletteSync();

	const theme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: palette.system_accent1[5],
			background: Storage.getBoolean("pureBlack")
				? "black"
				: "rgba(28, 27, 31, 1)",
			elevation: {
				level4: palette.system_accent1[4] + "3C",
			},
			secondaryContainer: palette.system_accent1[4] + "3C",
		},
	};

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<MyStack />
			</NavigationContainer>
		</PaperProvider>
	);
};

export default App;
