import React, {useState,useEffect} from 'react';
import {SafeAreaView,StyleSheet,Text,View} from 'react-native';
import {NavigationContainer, useFocusEffect, useScrollToTop} from '@react-navigation/native'
import Navigation from './src/navigation/Navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import { Provider } from 'react-native-paper/lib/typescript/core/settings';



export default function App(){

  return(
    <PaperProvider>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </PaperProvider>
    

  );
}

const styles = StyleSheet.create({
  background:{
    height:'100%',

  },
})