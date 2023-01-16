import React, {useEffect, useState } from 'react';
import {View, Text, StyleSheet,SafeAreaView, FlatList, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';

const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function ViewAgenda(props){
    const {dia, horarios,setlleno} = props;
    const [data, setData] = useState([{id:7,title:'7:00',access:'true',},{id:8,title:'8:00',access:'true',},{id:9,title:'9:00',access:'true',},{id:10,title:'10:00',access:'true',},{id:11,title:'11:00',access:'true',},{id:12,title:'12:00',access:'true',},{id:13,title:'13:00',access:'true',},{id:14,title:'14:00',access:'true',},{id:15,title:'15:00',access:'true',},{id:16,title:'16:00',access:'true',},{id:17,title:'17:00',access:'true',},{id:18,title:'18:00',access:'true',},{id:19,title:'19:00',access:'true',},{id:20,title:'20:00',access:'true',},{id:21,title:'21:00',access:'true',}]);
    var DATAINI = [{id:7,title:'7:00',access:'true',},{id:8,title:'8:00',access:'true',},{id:9,title:'9:00',access:'true',},{id:10,title:'10:00',access:'true',},{id:11,title:'11:00',access:'true',},{id:12,title:'12:00',access:'true',},{id:13,title:'13:00',access:'true',},{id:14,title:'14:00',access:'true',},{id:15,title:'15:00',access:'true',},{id:16,title:'16:00',access:'true',},{id:17,title:'17:00',access:'true',},{id:18,title:'18:00',access:'true',},{id:19,title:'19:00',access:'true',},{id:20,title:'20:00',access:'true',},{id:21,title:'21:00',access:'true',}];

   // console.log('los horarios son',horarios);

      useEffect(() => {
        console.log(horarios)
        ConvertirData(horarios);
        
      
      }, [])

    const ConvertirEntero=(strhoras)=>{
        let tiempo = strhoras + '';
        tiempo = tiempo.split(':');
        let horas = parseInt(tiempo[0]);
        let minutos=parseInt(tiempo[1]);
        if(minutos === 30){
            let resp = horas+1;
            resp = parseInt(resp);
            return resp;   
        }else{
          let resp = horas;
            resp = parseInt(resp);
            return resp;
          }
      };
   

      const ConvertirData=(horarios)=>{
        let contador =0;
        let bdias = horarios;
        bdias.forEach(x => {
            x.lugres_hora_final = ConvertirEntero(x.lugres_hora_final),
            x.lugres_hora_inicio= ConvertirEntero(x.lugres_hora_inicio)
            
            DATAINI.forEach(y =>{
                if(y.id == x.lugres_hora_inicio){
                  y.access='false'
                  }
                  if(y.id > x.lugres_hora_inicio && y.id < x.lugres_hora_final ){
                    y.access='false'
                    }
                if(y.id == x.lugres_hora_final){
                    y.access='false'   
                }
                });
            
            //console.log('NUEVO DATA',data);
        })
        setData(DATAINI);
        // si esta lleno debemos mandar otra bandera
        DATAINI.forEach(y=>{
          if(y.access == 'false'){
            contador++;
          }
        });
        console.log(contador);
        if(contador == 15){
          setlleno(true);
        }
        else{
          setlleno(false);
        }
      };


  const Item = ({ title, access}) => (
    <SafeAreaView style={[styles.item, (access =='false')?styles.access1:styles.access2]}>
      <Text style={[styles.title,(access =='false')?styles.title1:styles.title2]}>{title} h</Text>
    </SafeAreaView>
  );
     
  
  const renderItem = ({ item }) => (
    <Item title={item.title} id={item.id} access={item.access}/>
  );

  return(
    <>
    
      <View style={styles.contenedor}>
          <View style={styles.disponible}>
            <Text style={{ fontFamily:'Fira Sans',fontWeight:'bold', color:'#032A3F', fontSize:0.04*dwidth,}}>Disponible</Text>
              <Icon
                  name='radio-button-on'
                  type='ionicon'
                  color='#00B5BE'
                  size={0.06*dwidth} 
                   
              />
              
              <Text style={{ fontFamily:'Fira Sans',fontWeight:'bold', color:'#032A3F',fontSize:0.04*dwidth}}> No Disponible</Text>
              <Icon
                  name='radio-button-on'
                  type='ionicon'
                  color='#E4E8E9'
                  size={0.06*dwidth}   
                  
              />
             

          </View>
          <FlatList
              data={data}
              numColumns={3}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            
          />
        
      </View>
    

      </>

  );

}

const styles = StyleSheet.create({
    contenedor:{
        alignItems:'center',
        justifyContent:'center',
        width:0.9*dwidth,
        height:0.27*dheight,
        marginTop:0.02*dwidth,
        
    },
    disponible:{
      marginLeft:0.02*dwidth,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'baseline',
       
        
    },
    item: {
      marginLeft:0.007*dwidth,
      padding:0.002*dwidth,
      marginVertical:0.002*dwidth,
      width: 0.28*dwidth,
      height:0.07*dwidth,
      alignItems:'center',
    },
    access1:{
        backgroundColor: '#E4E8E9',
     
    },
    access2:{
        backgroundColor: '#00B5BE',
    },
    title: {
        fontSize:0.04*dwidth,
        fontFamily:'Fira Sans',
        fontWeight:'normal',
    }, 
    title1: {
        
        color:'#92A3AD',
    },
    title2: {
        
        color:'#FFFF',
    },
  
  });
  