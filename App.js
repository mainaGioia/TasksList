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


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View>
        <TasksList data={[
          { id : '1', title: 'Apples' },
          { id : '2', title: 'Oranges' },
          { id : '3', title: 'Strawberries' },
          { id : '4', title: 'Bananas' },
          { id : '5', title: 'Avocados' },
        ]}/>
      </View>
      
    </>
  );
};


export default App;
