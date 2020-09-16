import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView,View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import {MaterialIcons} from '@expo/vector-icons';


export default function Main({navigation}) {
  const [currentRegion, setcurrentRegion] = useState(null);

  useEffect(()=>{
   
    async function loadInitialPosition(){
      const {granted} = await requestPermissionsAsync();
      
      if(granted){
        const {coords} = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        setcurrentRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      }     
    }
    loadInitialPosition();
  }, []);

  if(!currentRegion){
    return null
  }


  return (
    <KeyboardAvoidingView style>
    <MapView 
    style={styles.map} 
    initialRegion={currentRegion}
    >
      <Marker  coordinate={{latitude: -3.6596731,longitude: -45.4111814,}} >
       <Image style={styles.avatar} source={{uri:'https://avatars1.githubusercontent.com/u/52615988?s=460&v=4'}} />
        <Callout onPress={() =>{navigation.navigate('Profile', {github_username: 'rAndrade360'})}}>
          <View style={styles.callout}>
              <Text style={styles.name} >Renan de Andrade</Text>
              <Text style={styles.bio} >Estudante de Engenharia de Computação</Text>
              <Text style={styles.techs}>ReactJs, NodeJs, React Native</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
    <View style={styles.inputContainer} behavior="padding" enable>

      <TextInput 
      style={styles.input}
      placeholder="Buscar por devs..."
      placeholderTextColor="#999"
      />

      <TouchableOpacity>
      <MaterialIcons name="my-location" />
      </TouchableOpacity>
      
    </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex:1
  },
  avatar:{
    width: 50,
    height: 50,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },
  callout:{
    width: 260
  },
  name:{
    fontWeight: "bold",
    color: '#333',
    fontSize: 16
  },
  bio:{
    color: '#333',
    fontSize: 14,
    marginTop: 5,
  },
  techs: {
    marginTop: 5,
    fontSize: 12,
    color: '#666'
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    zIndex: 5
  },
  input: {
    backgroundColor: '#fff',
    flex: 1,
    height: 42,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16
  }
})
