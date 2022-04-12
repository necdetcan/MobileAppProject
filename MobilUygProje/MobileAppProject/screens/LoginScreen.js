import { useNavigation } from '@react-navigation/core'
import React, {useState, useEffect} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth ,db} from '../firebase'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import HomeScreen from './HomeScreen';
import { collection, getDocs, setDoc ,doc} from 'firebase/firestore';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications'; 


export default function LoginScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
       const unsubscribe =  auth.onAuthStateChanged(user => {
             if (user){
                 navigation.navigate(HomeScreen)
             }
         })
         return unsubscribe
    }, [])

    const kayitOl = () => {
       createUserWithEmailAndPassword(auth, email, password)
        .then(userCredantials => {
            const user = userCredantials.user;
            console.log(user.email);
            (()=>registerForPushNotificationsAsync())();
            
        })
        .catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
        });

        
    }
    const girisYap = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredantials => {
            const user = userCredantials.user;
            console.log(user.email);
            
        })
        .catch(error => alert(error.message))
    }
    const sendNotification = async(token) =>{
        const message = {
          to: token,
          sound: 'default',
          title: 'MOBİL UYGULAMA BİLDİRİMİ',
          body: 'Merhaba bu bildirim mobil uygulama ödevinden yollanmıştır !!',
          data: { someData: 'goes here' },
        };
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      }
      const sendNotificationToAllUsers = async()=>{
          const col = collection(db,"users");
          const snapshot = await getDocs(col);
          snapshot.forEach((doc)=>{
              sendNotification(doc.data().token);
          });
      }
      async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
        if(token){
            const Add = async ()=>{
                await setDoc(doc(db,"users",email),{
                    token:token,
                    merge:true,
                });
                console.log("Eklendi");
            }
            Add();
        }
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }
    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                />
                <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                />
                  

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={girisYap}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={kayitOl}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Kayıt Ol</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={sendNotificationToAllUsers}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Bildirim Yolla</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
       color: 'white',
       fontWeight: '700',
       fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    }

})