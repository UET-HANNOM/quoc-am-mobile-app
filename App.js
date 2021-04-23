/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import Camera from './src/Camera';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Result from './src/Result';
import PreviewPicture from './src/PreviewPicture';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Preview"
          component={PreviewPicture}
          options={{
            title: 'Xem lại ảnh',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Result"
          component={Result}
          options={{
            title: 'Dịch',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
