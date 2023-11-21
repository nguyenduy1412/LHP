import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Icon from 'react-native-vector-icons/Fontisto';
import Checkbox from "expo-checkbox";



const Login = () => {
  const [isCheck, setIsCheck] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"}></StatusBar>
      <View>
        <View style={styles.title}>
          <Text style={styles.login}>Login</Text>
          <Text>By signing in you are agreeing</Text>
            <Text>our </Text>
              <TouchableOpacity onPress={()=>Alert.alert('Sau này t làm chuyển trang')}>
                <Text style={{color:'#1876F2'}}>Term and privacy police</Text>
              </TouchableOpacity>
          </View>
        </View>
        <View style={styles.form}>
            <View style={styles.group}>
                <Icon name="email"style={styles.icon} />
                <TextInput placeholder="Email Address" style={styles.ip}></TextInput>
            </View>
            <View style={styles.group}>
                <Icon name="locked"style={styles.icon} />
                <TextInput placeholder="Password" secureTextEntry={true} style={styles.ip}></TextInput>
            </View>
            <View style={styles.group1}>
              <View style={{flexDirection:'row'}}>
                <Checkbox value={isCheck} onValueChange={setIsCheck} />
                <Text>Ghi nhớ pass</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => Alert.alert('Sau này t làm chuyển trang')}>
                    <Text style={{ color: '#1876F2' }}>Quên mật khẩu</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={{fontWeight:'bold',color:'#fff'}} >Login</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
            <Image source={require('../../assets/Subtract.png')}></Image>
        </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
   
  },
  login:{
    fontWeight:'bold',
    fontSize:30,
    color:'black',
    
    paddingVertical:20
  },
  title:{
    marginTop:100,
    alignItems:'center',
   
  },
  form:{
    marginTop:40,
    paddingHorizontal:30
  },
  group:{
    marginTop:30,
 
  },
  ip:{
    borderBottomWidth:1,
    backgroundColor:'#fff',
    height:50,
    borderColor:'gray',
    paddingLeft:35
  },
  icon:{
    fontSize:25,
    position:'absolute',
    top:10,
    zIndex:100
  },
  group1:{
    flexDirection:'row',
    marginTop:10,
    justifyContent:'space-between'
  },
  btn:{
    marginTop:30,
    backgroundColor:'#1bcdff',
    paddingVertical:15,
    alignItems: 'center',
    borderRadius:20
  },
  imageContainer:{
    position: 'absolute',
    bottom: 0, // Đặt ở phía dưới cùng
    left: 0, // Đặt ở phía trái
    right: 0
  }
});
