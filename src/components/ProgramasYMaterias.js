import React,{useState,useEffect} from 'react';
import {StyleSheet, View, Dimensions,Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'


const dwidth = Dimensions.get('window').width;
const dheight = Dimensions.get('window').height;

export default function ProgramasYMaterias(props){
    
    const {setprograma, authorization, documento,rol} = props;
    const [programa, setPrograma] = useState([]);
   // const [materia, setMateria] = useState({});
    //console.log(programa);
   
    const ErrorRed=()=>{
        Alert.alert(
            "Consulta fallida",
            "No es posible obtener el programa académico. Por favor intente mas tarde",
            [{text:'OK',style:'ok',}]
        )
    };

    useEffect(()=>{
        setPrograma([]);
        const url = 'https://reservapp.ucm.edu.co/api/1.0/programa/'+documento+'/'+rol+'/'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
            })
            .then(response => response.json())
            //.then(json => console.log(json)) 
            .then(json =>setPrograma(json))
            .catch(err => {
                console.log(err);
                ErrorRed();

            }); 
    },[]);




    return (
        <View style={styles.picker1} >
            <RNPickerSelect
                style={Pickerstyles}
                placeholder={{label: 'Programa Académico'}}
                onValueChange={(value) => setprograma(value)}
                items={
                    programa.map((item)=>(
                    {
                        label: item.pro_nombre, 
                        value:item.upf_programa,
                    }))
                        
                }
           
            />
        </View>
          
    );


};


const styles= StyleSheet.create({
    picker1:{
        borderWidth:0.008*dwidth,
        height:0.15*dwidth,
        borderColor:'#92A3AD',
        marginRight:0.02*dwidth,
        marginLeft:0.02*dwidth,
        marginTop:0.02*dwidth,
        
    }

});


const Pickerstyles = StyleSheet.create({
    inputIOS:{
        fontSize:0.05*dwidth,
        color:'#032A3F',
        
       
    },

    inputAndroid:{
        fontSize:0.05*dwidth,
        color:'#032A3F',
        
       
        

    },
});