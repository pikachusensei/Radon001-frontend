// screens/ForgotPasswordScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
const ip=process.env.ip;

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      setMessage('Please enter your email');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://radon001.onrender.com/api/auth/forgot-password', {
        email,
      });

      setMessage(response.data.message || 'Check your email for reset instructions.');
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.box}>
        <Text style={styles.title}>Forgot Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={handlePasswordReset} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
        </TouchableOpacity>

        {message !== '' && <Text style={styles.message}>{message}</Text>}

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9'
  },
  box: {
    width: '85%', backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 3
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15
  },
  button: {
    backgroundColor: '#007bff', padding: 14, borderRadius: 8, alignItems: 'center'
  },
  buttonText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold'
  },
  message: {
    marginTop: 20, textAlign: 'center', color: '#444'
  },
  back: {
    marginTop: 20, color: '#007bff', textAlign: 'center'
  }
});
