import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
const ip=process.env.ip;
const VerifyEmailScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  // const {user}=route.params;

  const handleVerify = async () => {
    try {
      const res = await axios.post("https://radon001.onrender.com/api/auth/verifyEmail", {
        Email: email,
        verificationToken: code,
      });
      Alert.alert("Success", "Email verified successfully");
      navigation.navigate("Login");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.response?.data?.message || "Something went wrong");
    }
  };

  const handleResendCode=async()=>{
    try{
      setLoading(true);
      await axios.post("https://radon001.onrender.com/api/auth/resendVerificationEmail",{
        Email:email,
      });
      Alert.alert("Success","Verification code sent successfully");
    }catch(err){
      // console.log(err);
      Alert.alert("Error",err?.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
    
  };
  

 return (
    <View style={{ padding: 20 }}>
      <Text>We sent a verification code to:</Text>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>{email}</Text>

      <TextInput
        placeholder="Enter verification code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />

      <Button title={loading ? "Please wait..." : "Verify Email"} onPress={handleVerify} disabled={loading} />
      <View style={{ marginTop: 10 }}>
        <Button title="Resend Code" onPress={handleResendCode} disabled={loading} />
      </View>
    </View>
  );
};

export default VerifyEmailScreen;
