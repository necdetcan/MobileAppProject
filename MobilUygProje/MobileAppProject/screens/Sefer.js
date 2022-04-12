import React, { useLayoutEffect, useRef, useState ,useEffect} from "react";
import { Text, View, Image, Dimensions, TouchableHighlight,StyleSheet ,FlatList} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {storage,db} from '../firebase'
import {collection,getDocs,query, where } from 'firebase/firestore';
const { width: viewportWidth } = Dimensions.get("window");


const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const kampanyaNumColumns = 1;
// item size
const KAMPANYA_ITEM_HEIGHT = 150;
const KAMPANYA_ITEM_MARGIN = 20;




export default function CampaignDetails(props) {
  const { navigation, route } = props;
  const item = route.params;
  const [load, setLoad] = useState(true);
  const [kalkis, setKalkis] = useState(item.kalkis);
  const [varis, setVaris] = useState(item.varis);
  const [sefer,setSefer] = useState([]);
  const GetSefer = async ()=>{
    const data = [];
    const seferRefs = collection(db, "seferler");
    const q = query(seferRefs, where("kalkis",'==',kalkis),where("varis","==",varis));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc)=>{
      data.push({
        ...doc.data(),
        key: doc.id,            
      });
    });
    setSefer(data);
  }

    useEffect(() => {
      GetSefer();
      setLoad(false);
    },[load])
    console.log(sefer);
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

  

  const renderItem = ({item}) => (
    <View style={styles.denemeSefer}>
    <Text style={styles.title}>{item.sefer_adi}</Text>
    <Text style={styles.title}>{item.tarih}</Text>
    <Text style={styles.title}>{item.saat}</Text>
    <Text style={styles.title}>{item.fiyat}</Text>
    <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 5,
    width:200,
  }}
/>
    </View>
    
  );
 
  return (
    <View style={styles.container}>
     
   
     <FlatList
      vertical showsVerticalScrollIndicator={false} numColumns={1}
        data={sefer}
        renderItem={renderItem}
        keyExtractor={sefer.sefer_adi}
      />
   
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
  denemeSefer:{
    borderColor:'black',
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