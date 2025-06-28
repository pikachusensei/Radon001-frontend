// CompanyListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
const ip=process.env.ip;

const CompanyListScreen = ({ navigation }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch unique companies from your backend
    axios.get('https://radon001.onrender.com/api/questions/getCompanies')
      .then(res => setCompanies(res.data.companies))
      .catch(err => console.error(err));
  }, []);

  const handleCompanyPress = (company) => {
    navigation.navigate('Topic', { company });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Company</Text>
      <FlatList
        data={companies}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCompanyPress(item)}>
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CompanyListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 8,
  },
  cardText: { fontSize: 18 }
});
 