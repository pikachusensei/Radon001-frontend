import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const QuestionsScreen = ({ route }) => {
  const { company, topic } = route.params;
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 1; // You can change this to 2 or 3 if you want multiple per page
  // const ip=process.env.ip;
  useEffect(() => {
    fetchQuestions();
  }, [page]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://radon001.onrender.com/api/questions/getQuestions', {
        params: { company, topic, page, limit }
      });
      setQuestions(res.data.questions);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{company} - {topic}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : questions.length > 0 ? (
        <View style={styles.card}>
          <Text style={styles.questionText}>{questions[0].questionText}</Text>
        </View>
      ) : (
        <Text>No questions available.</Text>
      )}

      <View style={styles.pagination}>
        <Button title="Prev" disabled={page === 1} onPress={() => setPage(page - 1)} />
        <Text style={styles.pageInfo}>{page} / {totalPages}</Text>
        <Button title="Next" disabled={page === totalPages} onPress={() => setPage(page + 1)} />
      </View>
    </View>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20
  },
  questionText: { fontSize: 18 },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pageInfo: { fontSize: 16 }
});
