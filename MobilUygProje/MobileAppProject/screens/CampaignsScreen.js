// ./screens/Contact.js

import { verifyBeforeUpdateEmail } from "firebase/auth";
import React, { useLayoutEffect ,useEffect ,useState} from "react";
import { View, StyleSheet, Text ,NavigationContainer ,FlatList,SafeAreaView,StatusBar,TouchableHighlight,Image,Dimensions} from "react-native";
import { collection, getDocs } from 'firebase/firestore';
import {storage,db} from '../firebase'
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const kampanyaNumColumns = 1;
// item size
const KAMPANYA_ITEM_HEIGHT = 150;
const KAMPANYA_ITEM_MARGIN = 20;

export default function CampaignsScreen(props) {
  const { navigation } = props;
  const [kampanyalar, setKampanyalar] = useState([]);
  const kampanyalarCollectionRef = collection(db, "kampanyalar");
  
  useEffect(() => {
    const getKampanyalar = async () => {
      const data = await getDocs(kampanyalarCollectionRef);
      console.log(data);
      setKampanyalar(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
     
      
    };
    getKampanyalar();
  }, [])

  

  const onPressKampanyalar = (item) => {
    navigation.navigate("Detay", { item });
    
  };

  
  


  const renderKampanyalar = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressKampanyalar(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.kampanyaAdi}</Text>
        
       
      </View>
    </TouchableHighlight>
  );


  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={kampanyalar} renderItem={renderKampanyalar} keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    width: (SCREEN_WIDTH - (kampanyaNumColumns + 1) * KAMPANYA_ITEM_MARGIN) / kampanyaNumColumns,
    height: KAMPANYA_ITEM_HEIGHT + 75,
    
    borderColor: '#cccccc',
    borderWidth: 2,
    borderRadius: 15
  },
  photo: {
    width: (SCREEN_WIDTH - (kampanyaNumColumns + 1) * KAMPANYA_ITEM_MARGIN) / kampanyaNumColumns,
    height: KAMPANYA_ITEM_HEIGHT,
    
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 20,
    marginRight: 5,
    marginLeft: 5,
    
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  }

});