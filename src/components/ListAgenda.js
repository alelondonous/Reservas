import React, {useEffect, useState } from 'react';
import {View, Text, StyleSheet,TouchableOpacity, SectionList} from 'react-native';



export default function ListAgenda(props){
  const {title} = props;
  
  return(
  
        <View
            accessible={true}
              style={{
                flexDirection: "column",
                height: 100,
                padding: 20,
                alignContent:'space-between',
        
              }}
            >
          <View label="7" style={{ backgroundColor:'red', flex: 0.2 }}><Text> {title}</Text></View>  
        
        </View>
        
    


  
  );
  
}









const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    flexDirection:'row',
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  

});
