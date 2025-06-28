// App.js (for quick testing)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlight, TouchableNativeFeedback } from 'react-native';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Campus</Text>

      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: '75%', height: '50%', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16 },
});
