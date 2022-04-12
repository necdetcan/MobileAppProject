import React, { useLayoutEffect, useRef, useState ,useEffect} from "react";
import { Text, View, Image, Dimensions, TouchableHighlight,StyleSheet ,ImageBackground} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: viewportWidth } = Dimensions.get("window");



export default function CampaignDetails(props) {
  const { navigation, route } = props;
  
  const item = route.params?.item;
 //console.log(item);
 

  const [deneme, setDeneme] = useState(item);
  
  


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
         
<Text>Geri Dön</Text>
</TouchableOpacity>
      ),
      headerRight: () => <View />,
    });
  }, []);

 
  return (
    <View style={styles.container}>
      <View style={styles.detay_ust}>
      <ImageBackground source={{
          uri: deneme.photo_url,
        }} resizeMode="cover" style={styles.image}>
      
    </ImageBackground>
      </View>
      
      <View style={styles.detay_alt}>
        <Text style={styles.infoCampaignName}>{deneme.kampanyaAdi}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoCampaignDetais}>{deneme.kampanyaMetni}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1
    },
   
    detay_ust:{
      flex:0.4,
    },
    detay_alt:{
      flex:0.6,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
     
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      width: viewportWidth,
      height: 250
    },
    paginationContainer: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      paddingVertical: 8,
      marginTop: 200
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 0
    },
    infoRecipeContainer: {
      flex: 1,
      margin: 25,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    
    
   
    
    infoCampaignDetais: {
      textAlign: 'left',
      fontSize: 16,
      marginTop: 30,
      margin: 15
    },
    infoCampaignName: {
      fontSize: 28,
      margin: 10,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center'
    }
  });
