import React, { useState } from 'react';
import { Alert, Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

export default function RecursosScreen() {
  const [imagen, setImagen] = useState('');

  const cargarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'test/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg'
      });

      console.log('La imagen se subió con éxito');
      Alert.alert('Mensaje', 'La imagen se subió con éxito');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1938348/pexels-photo-1938348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Subir Imagen desde la Galería</Text>
        <Button title='Seleccionar imagen' onPress={() => cargarImagen()} />
        <Image source={{ uri: imagen }} style={styles.img} />
        <Button title='Cargar Imagen' onPress={() => subirImagen('avatar1')} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.0 to 1.0) for transparency
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  img: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    marginTop: 20,
  },
});
