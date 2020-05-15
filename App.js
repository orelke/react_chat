import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main.js';
import Chat from './components/Chat.js';
import Login from './components/Login';
import Signup from './components/Signup';
import Add from './components/Add';
import Group from './components/Group'
import Req from './components/Req';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const navigator = createStackNavigator({
	Login: { screen: Login },
	Signup: { screen: Signup },
	Main: { screen: Main }, 
	Chat: { screen: Chat },
	Add: {screen : Add},
	Group: {screen: Group},
	Req:    {screen: Req}
});


// fix for the  code. 
const App = createAppContainer(navigator);

export default App

