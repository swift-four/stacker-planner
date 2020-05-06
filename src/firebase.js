import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBaiuVshLNmnIUBLDGV1gc3ZIpT-D18DHE",
	authDomain: "stacker-ab6c8.firebaseapp.com",
	databaseURL: "https://stacker-ab6c8.firebaseio.com",
	projectId: "stacker-ab6c8",
	storageBucket: "stacker-ab6c8.appspot.com",
	messagingSenderId: "605543736089",
	appId: "1:605543736089:web:22b6aefcc275eebb705b88",
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
const calendarsRef = db.collection("calendars");

export { calendarsRef };
