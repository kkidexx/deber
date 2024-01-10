import { StyleSheet, Text, View, Button, Alert, TextInput, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState('');
  const [contrasenia, setcontrasenia] = useState('');

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("REGISTRO CORRECTO");
        navigation.navigate('Drawer_Welcome');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);

        if (errorCode === 'auth/weak-password') {
          Alert.alert("Error", "La contraseña debe poseer 6 caracteres");
        }
      });
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/7736062/pexels-photo-7736062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}  // Replace with the URL of your image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>RegistroScreen</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingrese email'
          onChangeText={(texto) => setcorreo(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingrese contraseña'
          onChangeText={(texto) => setcontrasenia(texto)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese un nick"
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
        />

        <Button title='Registrarse' onPress={() => registro()} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Text color for visibility on the background
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: 'white', // Background color for input fields
  },
});
