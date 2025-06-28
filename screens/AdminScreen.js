// AdminScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
const ip=process.env.ip;

const AdminScreen = () => {
  const [company, setCompany] = useState('');
  const [topic, setTopic] = useState('');
  const [questionText, setQuestionText] = useState('');

  const handleAddQuestion = async () => {
    if (!company || !topic || !questionText) {
      return Alert.alert("Error", "All fields are required.");
    }

    try {
      const res = await axios.post('https://radon001.onrender.com/api/admin/addques', {
        company,
        topic,
        questionText,
      });

      Alert.alert("Success", res.data.message);
      setCompany('');
      setTopic('');
      setQuestionText('');
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin: Add Question</Text>

      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
      />

      <TextInput
        style={styles.input}
        placeholder="Topic"
        value={topic}
        onChangeText={setTopic}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter question text..."
        value={questionText}
        onChangeText={setQuestionText}
        multiline
      />

      <Button title="Add Question" onPress={handleAddQuestion} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default AdminScreen;
