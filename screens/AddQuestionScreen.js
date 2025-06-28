// AddQuestionScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import {ip} from '@env';
const AddQuestionScreen = ({ navigation, route }) => {
  const { user } = route.params;

  const [company, setCompany] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [topic, setTopic] = useState('');

  const handleSubmit = async () => {
    if (!company || !questionText || !topic) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }

    try {
      const response = await fetch('https://radon001.onrender.com/api/admin/addques', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // assuming token is stored in user object
        },
        body: JSON.stringify({ company, questionText, topic }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Question added successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to add question');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Company</Text>
      <TextInput
        style={styles.input}
        value={company}
        onChangeText={setCompany}
        placeholder="Company Name"
      />

      <Text style={styles.label}>Question Text</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={questionText}
        onChangeText={setQuestionText}
        placeholder="Question"
        multiline
      />

      <Text style={styles.label}>Topic</Text>
      <TextInput
        style={styles.input}
        value={topic}
        onChangeText={setTopic}
        placeholder="Topic"
      />

      <Button title="Add Question" onPress={handleSubmit} />
    </View>
  );
};

export default AddQuestionScreen;

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
