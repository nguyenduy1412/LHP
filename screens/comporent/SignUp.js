import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { Dimensions } from 'react-native'
import { COLORS } from '../../contants';
const {width,height} =Dimensions.get('screen')
const SignUp = () => {
  const ip = "192.168.23.95";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [rpassword, setRPassword] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true)
  const [showRPassword, setShowRPassword] = useState(true)
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPass, setErrorPass] = useState("")
  const [errorRPass, setErrorRPass] = useState("")
  const [errorFullName, setErrorFullName] = useState("")
  const [errorUserName, setErrorUserName] = useState("")
  const [alertVisible, setAlertVisible] = useState(false);
  const [img, setImg] = useState();
  const [color, setColor] = useState("");

  const [message, setMessage] = useState("");
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowRPassword = () => {
    setShowRPassword(!showRPassword);
  };
  const onSuccess = () => {
    navigation.navigate("Login");
    setAlertVisible(false);
  }
  const handleSignUp = () => {
    let check = true;
    let formData = {
      fullName: fullName,
      userName: username,
      passWord: password,
      email: email
    }
    let regexEmail = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    if (!regexEmail.test(formData.email)) {
      check = false;
      setErrorEmail("Email không đúng định dạng")
    }
    else {
      setErrorEmail("");
    }
    if (formData.passWord.trim().length < 6) {
      check = false;
      setErrorPass("Mật khẩu có ít nhất 6 kí tự")
    }
    else {
      setErrorPass("")
    }
    if (rpassword.trim().length < 6) {
      check = false;
      setErrorRPass("Mật khẩu có ít nhất 6 kí tự")
    }
    else {
      if (password !== rpassword) {
        check = false;
        setErrorRPass("Mật khẩu không khớp")
      } else {
        setErrorRPass("")
      }
    }
    if (fullName.trim().length === 0) {
      check = false;
      setErrorFullName("Tên không được để trống")
    } else {
      setErrorFullName("")
    }
    if (username.trim().length === 0) {
      check = false;
      setErrorUserName("Tên đăng nhập không được để trống")
    } else {
      setErrorUserName("")
    }
    if (!check) {
      return
    }

    axios.post(`http://${ip}:8080/api/user/signup`, formData)
      .then((respone) => {

        if (respone.status === 200) {


          setColor("#1877f2")
          setImg(require('../../assets/loginPass.webp'))
          setMessage("Đăng ký thành công")
          setAlertVisible(true);
        }

      }

      )
      .catch((err) => {
        if (err.response) {
          if (err.response.data === "Tên đăng nhập đã tồn tại") {
            setErrorUserName(err.response.data)
          }

          if (err.response.data === "Email đã tồn tại") {
            setErrorEmail(err.response.data)
          }
        }
      })
  };
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.img} source={require('../../assets/register.png')} />
        <View style={styles.back} >
              <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.btnBack} >
                  <AntDesign name="arrowleft" size={30} color="white" />
              </TouchableOpacity>
          </View>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.form} >
          {/* <Text style={styles.lable}>Họ Tên</Text> */}
          <View style={styles.borderInput}>
            <TextInput
              style={styles.input}
              placeholder="Nhập họ tên"
              value={fullName}
              onChangeText={setFullName}
            />
            {
              errorFullName === "" ? null : (
                <Text style={styles.error}>{errorFullName}</Text>
              )
            }

          </View>
          {/* <Text style={styles.lable}>Email</Text> */}
          <View style={styles.borderInput}>
            <TextInput
              style={styles.input}
              placeholder="Nhập email"
              value={email}
              onChangeText={setEmail}
            />
            {
              errorEmail === "" ? null : (
                <Text style={styles.error}>{errorEmail}</Text>
              )
            }

          </View>

          {/* <Text style={styles.lable}>Tên đăng nhập</Text> */}
          <View style={styles.borderInput}>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChangeText={setUsername}
            />
            {
              errorUserName === "" ? null : (
                <Text style={styles.error}>{errorUserName}</Text>
              )
            }

          </View>

          {/* <Text style={styles.lable}>Mật khẩu</Text> */}
          <View style={styles.borderInput}>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              secureTextEntry={showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.show}>
              {showPassword === true ?
                (<Entypo name="eye" size={25} color="black" />) :
                (<Entypo name="eye-with-line" size={25} color="black" />)
              }
            </TouchableOpacity>
            {
              errorPass === "" ? null : (
                <Text style={styles.error}>{errorPass}</Text>
              )
            }

          </View>
          {/* <Text style={styles.lable}>Nhập lại mật khẩu</Text> */}
          <View style={styles.borderInput}>
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={showRPassword}
              value={rpassword}
              onChangeText={setRPassword}
            />
            <TouchableOpacity onPress={toggleShowRPassword} style={styles.show}>
              {showRPassword === true ?
                (<Entypo name="eye" size={25} color="black" />) :
                (<Entypo name="eye-with-line" size={25} color="black" />)
              }
            </TouchableOpacity>
            {
              errorRPass === "" ? null : (
                <Text style={styles.error}>{errorRPass}</Text>
              )
            }

          </View>

          <TouchableOpacity style={styles.btnLogin} onPress={handleSignUp}>
            <Text style={styles.txtLogin}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20,marginBottom:50 }}>
          <Text>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontWeight: 'bold', color: '#FFD700' }}> Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomAlert
        visible={alertVisible}
        message={message}
        onPage={onSuccess}
        img={img}
        color={color}
      />
    </View>

  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img:{
    width:width,
    height:350
  },
  back:{
    flexDirection:'row',
    justifyContent:'flex-start',
    paddingLeft:20,
    paddingTop:10,
    position:'absolute',
    top:30
  },
  btnBack: {
    backgroundColor:COLORS.sky,
    padding: 5,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    padding: 45,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop:-45
  },
  error: {
    color: 'red',
    paddingLeft: 10,
  },
  form: {

  },
  lable: {
    marginLeft: 12,
    marginBottom: 12,
    fontSize: 15
  },
  borderInput: {

    paddingBottom: 10
  },
  input: {
    padding: 14,
    backgroundColor: '#EEEEEE',
    borderRadius: 16,

  },
  btnLogin: {
    borderRadius: 20,
    backgroundColor: COLORS.sky,
    padding: 18
  },
  txtLogin: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color:'white'
  },
  lienket: {
    width: 40,
    height: 40
  },
  show: {
    position: 'absolute',
    top: 17,
    right: 25
  }
})