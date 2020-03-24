/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import TasksList from './app/components/TasksList';
import { StatusBar, View } from 'react-native';
import styles from './app/assets/styles';


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TasksList/>
      </View>
      
    </>
  );
};


export default App;
