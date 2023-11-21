import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import axios from "axios";
import { Alert } from 'react-native';
import CustomAlert from './CustomAlert';
import { Dimensions } from 'react-native'
import { COLORS } from '../../contants';
const {width,height} =Dimensions.get('screen')
const Login = () => {
  const ip="192.168.23.95";
  const navigation = useNavigation();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true)
  
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
 
  //const navigation = useNavigation();
  const handleLogin = async () => {
    console.log('Alo')
    try {
      const response = await axios.get(
        `http://${ip}:8080/api/user?username=${username}&&password=${password}`
      );
      console.log('Alo',response.data);
   
      if (response.data) {
        // Đăng nhập thành công
        
       
        navigation.navigate("DrawerApp",{ id: response.data.id,ip:ip});
        
      } else {
        // Đăng nhập thất bại
       Alert.alert("Thông báo","Sai tài khoản hoặc mật khẩu")
        
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.img} source={require('../../assets/loginForm.png')} />
       
      </View>
      <View style={styles.content}>
        <View style={styles.form} >
          <Text style={styles.lable}>Tên đăng nhập</Text>
          <TextInput 
              style={styles.input}
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChangeText={setUsername}
            />
          <Text style={styles.lable}>Mật khẩu</Text>
          <View>
            <TextInput 
                style={styles.input}
                placeholder="Nhập mật khẩu"
                secureTextEntry={showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={toggleShowPassword} style={styles.show}>
                {showPassword === true ? 
                    (<Entypo  name="eye" size={25} color="black" />) : 
                    (<Entypo  name="eye-with-line" size={25} color="black" />)
                }
              </TouchableOpacity>
          </View>
          
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin} >
                <Text style={styles.txtLogin}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
         
         <View style={{justifyContent:'center',flexDirection:'row',marginTop:20}}>
            <Text>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
              <Text style={{fontWeight:'bold' ,color:'#FFD700'}}> Đăng ký</Text>
            </TouchableOpacity>
         </View>
         
      </View>
    </View>
    
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
  },
  back:{
    flexDirection:'row',
    justifyContent:'flex-start',
    paddingLeft:20,
    paddingTop:10,
    position:'absolute',
    top:30
  },
  btnBack:{
    backgroundColor:COLORS.sky,
    padding:5,
    borderTopRightRadius:16,
    borderBottomLeftRadius:16
  },

  img:{
    width:width,
    height:350
  },
  content:{
    flex:1,
    backgroundColor:'white',
    paddingTop:40,
    padding:45,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    marginTop:-45
  },
  form:{

  },
  lable:{
    marginLeft:12,
    marginBottom:12,
    fontSize:15
  },
  input:{
    padding: 16,
    backgroundColor: '#EEEEEE',
    
    borderRadius: 16,
    marginBottom: 20,
  },
  btnLogin:{
    borderRadius:20,
    backgroundColor:COLORS.sky,
    padding:18
  },
  txtLogin:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:18,
    color:'white'
  },
  lienket:{
    width:40,
    height:40
  },
  show:{
    position:'absolute',
    top:17,
    right:25
  }
})