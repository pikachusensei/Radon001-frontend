import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
enableScreens();
import LandingScreen from './screens/LandingScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import CompanyListScreen from './screens/CompanyListScreen.js';
import TopicListScreen from './screens/TopicListScreen.js';
import QuestionsScreen from './screens/QuestionScreen.js';
import AdminScreen from './screens/AdminScreen.js';
import AddQuestionScreen from './screens/AddQuestionScreen.js';
import AddAdminScreen from './screens/AddAdminScreen.js';
import VerifyEmailScreen from './screens/VerifyEmailScreen.js';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.js';
import AppFeedbackScreen from './screens/AppFeedbackScreen.js';
const Stack = createNativeStackNavigator();

const StackNavigator=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen
       name="Landing" 
       component={LandingScreen}
       options={{ headerShown: false }}
       />
      <Stack.Screen 
      name="SignUp" 
      component={SignUpScreen} 
      options={{ headerShown: false }}
      />
      <Stack.Screen 
      name="Dashboard" 
      component={DashboardScreen}
      options={{ headerShown: false }}
       />
       <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{ headerShown: false }}
       />
       <Stack.Screen 
      name="Company" 
      component={CompanyListScreen}
      options={{ headerShown: false }}
       />
        <Stack.Screen 
      name="Topic" 
      component={TopicListScreen}
      options={{ headerShown: false }}
       />
        <Stack.Screen 
      name="Question" 
      component={QuestionsScreen}
      options={{ headerShown: false }}
       />
       <Stack.Screen 
      name="Admin" 
      component={AdminScreen}
      options={{ headerShown: false }}
       />
       <Stack.Screen 
      name="AddQuestion" 
      component={AddQuestionScreen}
      options={{ headerShown: false }}
       />
       <Stack.Screen 
      name="AddAdmin" 
      component={AddAdminScreen}
      options={{ headerShown: false }}
       />
       <Stack.Screen 
      name="VerifyEmail" 
      component={VerifyEmailScreen}
      options={{ headerShown: false }}
       />
       {/* <Stack.Screen 
      name="ForgotPassword" 
      component={ForgotPasswordScreen}
      options={{ headerShown: false }}
       /> */}
       <Stack.Screen 
      name="AppFeedback" 
      component={AppFeedbackScreen}
      options={{ headerShown: false }}
       />
    </Stack.Navigator>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;