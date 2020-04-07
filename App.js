import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main.js';
import Chat from './components/Chat.js';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const navigator = createStackNavigator({
	Main: { screen: Main }, 
	Chat: { screen: Chat },
});


// fix for the  code. 
const App = createAppContainer(navigator);

export default App

