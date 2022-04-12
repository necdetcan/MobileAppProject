import React, {Component, useEffect,useState, FastImage} from 'react';
import { View, StyleSheet, SafeAreaView,TouchableOpacity,Text,Animated,Picker} from "react-native";
import { SliderBox } from "react-native-image-slider-box";

import RNPickerSelect from "react-native-picker-select";


export default function HomeScreen(props) {
  const [variss, setVaris] = useState("");
  const [kalkiss,setKalkis] = useState("");
  
 const [varis, setVariss] = useState([
   {label: 'İSTANBUL', value: 'İSTANBUL'},
  {label: 'ANKARA', value: 'ANKARA'},
  {label: 'İZMİR', value: 'İZMİR'}
  ]);
 const [kalkis, setKalkiss] = useState([
    {label: 'SAMSUN', value: 'SAMSUN'},
   {label: 'TRABZON', value: 'TRABZON'},
   {label: 'RİZE', value: 'RİZE'}
  ]);


  
  const Ara = () =>{
    console.log(variss)
    props.navigation.navigate("Sefer",{
      kalkis : kalkiss,
      varis : variss,
      
    });
  }
  
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/mobilproje-d974f.appspot.com/o/istanbul_indirim%20(1).jpg?alt=media&token=370d9aab-5f93-42f3-aafd-925b456ab7cf",
    "https://firebasestorage.googleapis.com/v0/b/mobilproje-d974f.appspot.com/o/istanbul_indirim%20(2).jpg?alt=media&token=56589653-c5fd-4b0c-92dc-ee7ea6951475",
  ];
  return (
    <SafeAreaView style={styles.container}>
    
            <View style={styles.center}>
           
           <SliderBox
      ImageComponent={FastImage}
      images={images}
      sliderBoxHeight={200}
      onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
      dotColor="#FFEE58"
      inactiveDotColor="#90A4AE"
      paginationBoxVerticalPadding={20}
      autoplay
      circleLoop
      resizeMethod={'resize'}
      resizeMode={'cover'}
      paginationBoxStyle={{
        position: "absolute",
        bottom: 0,
        padding: 0,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        paddingVertical: 10
      }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        padding: 0,
        margin: 0,
        backgroundColor: "rgba(128, 128, 128, 0.92)"
      }}
      ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
      imageLoadingColor="#2196F3"
      
    />
    
          </View>
          <View styles={styles.picker}>
          <Text style={[styles.largeText,styles.textSefer]}>SEFER ARA</Text>
          <RNPickerSelect
         style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        
        onValueChange={value=>setKalkis(value)}
                 
                  items={kalkis }
  
        />
        <RNPickerSelect
         style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        
        onValueChange={value=>setVaris(value)}
                 
                  items={varis }
  
        />
     
         
             <TouchableOpacity 
                  style={[styles.btn,styles.btnPrimary,styles.btn300]} 
                  onPress={Ara}
                  >
                      <Text style={[styles.largeText,styles.textWhite]}>Ara</Text>
                </TouchableOpacity>
    
          </View>
          </SafeAreaView>
          )
}



const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:"center",
     
      
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    },
    textSefer:{
      color: 'white',
      fontWeight: "bold",
      backgroundColor:'#0096FF',
    },
    center: {
        flex: 0.7,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
    picker:{
      flex:0.3,
      justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    btn:{
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:4,
      borderColor:'transparent',
      paddingHorizontal:12,
      paddingVertical:6,
      fontWeight:'400',
      lineHeight:1.5
    },
    btnPrimary:{
      backgroundColor: '#007bff',
      borderColor: '#007bff'
    },
    btn300:{
      width:300,
      height:50,
    },
    btnText:{
      fontSize:16,
    },
    largeText:{
      fontSize:18
    },
    textWhite:{
      color: '#fff',
    },
    
})

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    marginTop:20,
    marginBottom:20,
    width:300,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#333',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
    backgroundColor:'black',
    opacity:0.7,
    
  },
});