import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
  if (!feedback.trim()) {
    Alert.alert('Please enter your feedback before submitting.');
    return;
  }

  try {
    const response = await axios.post('https://radon001.onrender.com/api/general/feedback', {
      message: feedback
    });

    console.log("Response:", response.data);

    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setFeedback('');
  } catch (error) {
    console.error("Axios Error:", error.response?.data || error.message);
    Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>We value your feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button title="Submit Feedback" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    textAlignVertical: 'top', // aligns text at the top for multiline
  }
});

export default FeedbackScreen;
