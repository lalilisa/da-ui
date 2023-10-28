import React from "react";
import RNRestart from "react-native-restart";
import CentredActivityIndicator from "../components/CentredActivityIndicator";
import ReactNativeBlobUtil from "react-native-blob-util";

const LoadingScreen = () => {
	const common = require("../data/common.json");
	let progress = 0;
	const fileUrls = common.fileUrlsFasel;

	fileUrls.forEach(url => {
		const fileName = url.split("/").slice(-1)[0];
		ReactNativeBlobUtil.config({
			path: ReactNativeBlobUtil.fs.dirs.DocumentDir + "/" + fileName,
		})
			.fetch("GET", url)
			.then(() => {
				progress++;
				if (progress == fileUrls.length) {
					RNRestart.Restart();
				} else {
					// pass
				}
			});
	});

	return <CentredActivityIndicator />;
};

export default LoadingScreen;
