import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ip = process.env.ip;

const TopicListScreen = ({ route, navigation }) => {
  const { company } = route.params;
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);     // <--- added
  const [error, setError] = useState(null);         // <--- added

  useEffect(() => {
    setLoading(true);  // start loading
    axios.get(`https://radon001.onrender.com/api/questions/getTopics?company=${company}`)
      .then(res => {
        setTopics(res.data.topics);
        setLoading(false);  // stop loading
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load topics.');
        setLoading(false);  // stop loading
      });
  }, [company]);

  const handleTopicPress = (topic) => {
    navigation.navigate('Question', { company, topic });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!topics.length) {
    return (
      <View style={styles.centered}>
        <Text>No topics found for this company.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{company} Topics</Text>
      <FlatList
        data={topics}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleTopicPress(item)}>
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopicListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    padding: 20,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 8,
  },
  cardText: { fontSize: 18 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
