import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import * as Sharing from 'expo-sharing';
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(permissionResult.granted === false){
      alert('permission acces camera is requiered');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if(pickerResult.canceled === true){
      return;
    }
    setSelectedImage({localUri: pickerResult.uri})
  }

  const openShareDialog = async() =>{
    if (!(await Sharing.isAvailableAsync())){
      alert("Sharing, is not abaliable on your platform");
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pick an image!</Text>
      <TouchableOpacity 
        onPress={openImagePickerAsync}
      >
        <Image
        style={styles.foto}
        source={{ uri: selectedImage !== null ? selectedImage.localUri :  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }}
      />
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={openShareDialog}
        style={styles.button1}
        
      >
        <Text style={{color: 'white'}}>Share me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0E5',
    alignItems: 'center',
    justifyContent: 'center',
  }, titulo: {
    fontSize: 30,
    color: '#DAC0A3',
    marginBottom: 40,

  }, foto: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },button1:{
    marginTop: 20,
    backgroundColor: '#102C57',
    borderRadius: 20,
    padding: 10,
    color: 'white',
  }

});
