import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [University, setUniversity] = useState('');
  const [GraduationYear, setGraduationYear] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const handleRegister = async () => {
    console.log('Register pressed!');
    if (
      !FirstName ||
      !LastName ||
      !University ||
      !GraduationYear ||
      !Email ||
      !Password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (Password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (Password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'https://radon001.onrender.com/api/auth/register',
        {
          FirstName,
          LastName,
          University,
          GraduationYear,
          Email,
          Password,
          confirmPassword,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = response.data;
      // const user = data.user;

      if (response.status === 201) {
        Alert.alert('Success', data.message);
        navigation.navigate('VerifyEmail', { email: Email });
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Registration error:', error?.response?.data || error.message);
      Alert.alert('Error', error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: isDark ? 'gray' : 'black' }]}>Campus</Text>
      <Text style={[styles.subheading, { color: isDark ? 'gray' : 'black' }]}>
        Create an account
      </Text>

      <TextInput
        style={styles.input}
        placeholder="First name"
        value={FirstName}
        onChangeText={setFirstName}
        placeholderTextColor={isDark ? 'gray' : '#888'}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={LastName}
        onChangeText={setLastName}
        placeholderTextColor={isDark ? 'gray' : '#888'}
      />
      <TextInput
        style={styles.input}
        placeholder="University"
        value={University}
        onChangeText={setUniversity}
        placeholderTextColor={isDark ? 'gray' : '#888'}
      />
      <TextInput
        style={styles.input}
        placeholder="Graduation Year"
        value={GraduationYear}
        onChangeText={setGraduationYear}
        keyboardType="numeric"
        placeholderTextColor={isDark ? 'gray' : '#888'}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={Email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={isDark ? 'gray' : '#888'}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={Password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={isDark ? 'gray' : '#888'}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setconfirmPassword}
        secureTextEntry
        placeholderTextColor={isDark ? 'gray' : '#888'}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={[styles.buttonText]}>Continue</Text>
      </TouchableOpacity>

      <Text style={[styles.footerText, { color: isDark ? 'gray' : '#666' }]}>
        By clicking continue, you agree to our{' '}
        <Text style={[styles.link, { color: isDark ? 'gray' : 'black' }]}>Terms of Service</Text> and{' '}
        <Text style={[styles.link, { color: isDark ? 'gray' : 'black' }]}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  subheading: { textAlign: 'center', fontSize: 16, marginVertical: 20 },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: 'gray',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  footerText: { textAlign: 'center', marginTop: 20 },
  link: { fontWeight: 'bold' },
});
