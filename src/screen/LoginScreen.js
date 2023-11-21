import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      // const response = await axios.post(
      //   `https://api2.epu.edu.vn/ams/auth/login/`,
      //   {
      //     'username': username,
      //     'password': password
      //   }
      // );na
      
      const response = await axios.get(
        `http://10.0.60.192:3000/api/user/?username=${username}&password=${password}`
      );
      console.log(response.data[0])
      if (response.status===200) {
        // Đăng nhập thành công
        Alert.alert('Login Successful', 'Welcome!');
          navigation.navigate('Home');
      } else {
        // Đăng nhập thất bại
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;