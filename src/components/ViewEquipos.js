import React, {useEffect, useState } from 'react';
import {View, Text, StyleSheet,TouchableOpacity,FlatList,Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import EquipoNoDisponible from './EquipoNoDisponible';
import moment from 'moment';
import 'moment/locale/es';
import _ from 'lodash';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;
export default function ViewEquipos(props){
  
    const {setIdequipo, result, setProveedor, setMarca, setEquprovmar}=props;
    const [selectedId, setSelectedId] = useState(null);
    console.log('lo que vamos a mostrar ',result);

 

    const EnviarPcReserva=(idequipo,proveedor,marca,equprovmar)=>{
      setSelectedId(idequipo);
      setIdequipo(idequipo);
      setProveedor(proveedor);
      setMarca(marca);
      setEquprovmar(equprovmar);
      console.log(idequipo);
      

    };
      const Item = ({ item, onPress, }) => (
        <TouchableOpacity onPress={onPress} style={styles.item}>
          <Icon
                name='desktop-outline'
                type='ionicon'
                color= {item.equlug_equipo === selectedId ? '#00b5be' : '#f1573d'}
                size={0.1*dwidth} 
                  
            />
            <Text style={styles.title}>{item.equ_nombre}</Text>
        </TouchableOpacity>
      );
   
        
      
        const renderItem = ({ item }) => {
          
          return (
            <Item
              item={item}
              onPress={() =>EnviarPcReserva(item.equlug_equipo, item.equlug_proveedor, item.equlug_marca_equipo, item.equlug_equipo_marca_proveedor_id)}
              
            />
          );
        };
      
        return (
          <>
            
            {(result.length != 0)?
                <>
                    <View style={styles.contenedor}>
                      <FlatList
                      //key={':'}
                      data={result}
                      numColumns={3}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.equlug_equipo}
                      horizontal={false}
                      extraData={selectedId}
                      />
                    </View>
                </>:
                <>
                    <EquipoNoDisponible/>
                </>
  
            }
              
        </>
      );
      
    
      
      
      
}

const styles = StyleSheet.create({
    contenedor:{
        alignItems:'center',
        justifyContent:'center',
        width:0.9*dwidth,
        height:0.45*dheight,
        marginTop:0.01*dwidth,
        marginLeft:0.025*dwidth,
        marginBottom: 0.03*dwidth,
    },
    
    item: {
      
      width:0.25*dwidth,
      height:0.1*dheight,
      alignItems:'center',
    },
    title: {
      fontSize: 0.035*dwidth,
      marginTop:-0.01*dwidth,
      fontFamily:'FiraSans-Light',
      color:'#032A3F',
      fontWeight:'bold',
    },
  });