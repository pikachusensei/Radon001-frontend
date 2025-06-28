import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const colorScheme = useColorScheme(); // 'dark' or 'light'
  const isDark = colorScheme === 'dark';

  const handleLogin = async () => {
    if (!Email || !Password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      const response = await axios.post(
        'https://radon001.onrender.com/api/auth/login',
        { Email, Password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = response.data;
      const user = data.user;

      if (response.status === 200) {
        navigation.navigate('Dashboard', { user });
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Login error:', error?.response?.data || error.message);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: isDark ? 'gray' : 'black' }]}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={isDark ? 'gray' : '#aaa'}
        value={Email}
        onChangeText={setEmail}
        style={[styles.input, { color: isDark ? 'gray' : 'black' }]}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={isDark ? 'gray' : '#aaa'}
        value={Password}
        onChangeText={setPassword}
        style={[styles.input, { color: isDark ? 'gray' : 'black' }]}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={[styles.footerText, { color: isDark ? '#aaa' : '#666' }]}>
        Don't have an account?{' '}
        <Text
          style={[styles.link, { color: isDark ? 'gray' : 'black' }]}
          onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    fontWeight: 'bold',
  },
});
