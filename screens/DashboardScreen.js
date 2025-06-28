// DashboardScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Alert } from 'react-native';


const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 2; // responsive square cards

const DashboardScreen = ({ navigation, route }) => {
  const { user } = route.params;
  console.log(user);
  let modules = [
    {
      title: 'COLLEGE PLACEMENT',
      image: require('../assets/images/placement.jpg'),
    },
    {
      title: 'SEMESTER PREP',
      image: require('../assets/images/sem_exam.jpg'),
    },
    {
      title: 'LEARNING RESOURCES',
      image: require('../assets/images/learning_res.jpg'),
    },
    {
      title: 'APP FEEDBACK',
      image: require('../assets/images/feedback.jpg'),
    },
  ];

  if (user.role === 'admin') {
    modules = [
      ...modules,
      {
        title: 'ADD QUESTION',
        image: require('../assets/images/questionsAdd.jpg'),
      },
      {
        title: 'ADD ADMIN',
        image: require('../assets/images/adminAdd.jpg'),
      },
    ];
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menu}>☰</Text>
        <Text style={styles.logo}>Campus</Text>
        <Image source={{ uri: user.profileImage.replace('/svg', '/png'), }} style={styles.avatar} />
      </View>

      <Text style={styles.welcome}>Hi! {user.FirstName}</Text>
      <Text style={styles.college}>{user.University}</Text>

      <View style={styles.grid}>
        {modules.map((mod, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              if (mod.title === 'COLLEGE PLACEMENT') {
                navigation.navigate('Company', { user });
              } else if (mod.title === 'ADD QUESTION') {
                navigation.navigate('AddQuestion', { user });
              } else if (mod.title === 'ADD ADMIN') {
                navigation.navigate('AddAdmin', { user });
              }
              else if(mod.title==='APP FEEDBACK'){
                navigation.navigate('AppFeedback', { user });
              }
              else if(mod.title==='LEARNING RESOURCES'){
                Alert.alert('Under Development');
              }
              else if(mod.title==='SEMESTER PREP'){
                Alert.alert('Under Development');
              }
            }}>
            <Image source={mod.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{mod.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  menu: {
    fontSize: 26,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  avatar: {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: 'grey',
  resizeMode: 'cover',
  borderWidth: 1,
  // borderColor: '#ccc',
},
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    // marginBottom: 20,
  },
  college: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    marginTop:'10%',
  },
  cardImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
    marginBottom: 12,
  },
  cardText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
});
