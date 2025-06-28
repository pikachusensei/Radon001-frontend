// AddAdminScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import {ip} from '@env';
const AddAdminScreen = ({ navigation, route }) => {
  const { user } = route.params;

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');

  const handleSubmit = async () => {
    if (!FirstName || !LastName || !Email || !Password || !confirmPassword || !secretCode) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }
    if (Password !== confirmPassword) {
      Alert.alert('Validation', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://radon001.onrender.com/api/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // assuming token is stored in user object
        },
        body: JSON.stringify({ FirstName, LastName, Email, Password, confirmPassword, secretCode }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'New admin created successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to create admin');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={FirstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={LastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={Email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={Password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />

      <Text style={styles.label}>Secret Admin Code</Text>
      <TextInput
        style={styles.input}
        value={secretCode}
        onChangeText={setSecretCode}
        placeholder="Secret Admin Code"
        secureTextEntry
      />

      <Button title="Create Admin" onPress={handleSubmit} />
    </View>
  );
};

export default AddAdminScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  label: { fontWeight: 'bold', marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});
