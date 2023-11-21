import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { COLORS } from "../../contants";
import DatePicker from '@react-native-community/datetimepicker'
import moment from 'moment';
import { useEffect } from "react";
import axios from "axios";
import { Alert } from "react-native";
import CustomAlert from "./CustomAlert";
const AccountUpdateScreen = ({ route }) => {
  const { ip, id } = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isMale, setIsMale] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState("21/7/2003");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  
  const [errorEmail, setErrorEmail] = useState("")
  const onPage = () =>{
    
    setAlertVisible(false);
  }
  const convertGender = (gender) => {
    const gd = (gender == 1) ? true : false
    return gd;
  }
  const handleUpdateAccount = () => {
    let formData = {
      fullName: name,
      gender: isMale? 1: 0,
      address: address,
      email:email,
      telephone:phoneNumber,
      birthday:dateOfBirth
    }
    axios.put(`http://${ip}:8080/api/user/updateAccount/${id}`, formData)
      .then((respone) => {
        if (respone.status === 200) {
          navigation.navigate('Account', { ip: ip, id: id });
        }
        else {
          
        }
      }

      )
      .catch((err) => {
        if (err.response) {
          setErrorEmail(err.response.data)
        }
      })
  };
  const formatDate = (reviewDate) => {
    const formattedDate = moment(reviewDate).format('DD/MM/YYYY');
    return formattedDate;
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Ẩn datepicker trên iOS khi người dùng chọn ngày
    setDateOfBirth(formatDate(currentDate))
  };
  useEffect(() => {
    fetch(`http://${ip}:8080/api/user/${id}`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log("alo", resJson)
        setName(resJson.fullName)
        setAddress(resJson.address)
        setDateOfBirth(formatDate(resJson.birthday))
        setEmail(resJson.email)
        setPhoneNumber(resJson.telephone)
        setIsMale(convertGender(resJson.gender))
      })
  }, []);
  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  return (
    <View contentContainerStyle={styles.container}>
      <StatusBar translucent={false} backgroundColor={'white'} style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cập nhật thông tin tài khoản</Text>
      </View>
      <ScrollView style={{ paddingHorizontal: 20, backgroundColor: 'white' }}>
        <Text style={styles.sectionTitle}>Họ tên:</Text>
        <View style={styles.fieldContainer}>
          <View style={styles.divIcon}>
            <FontAwesome name="user" size={18} color="black" style={styles.icon} />
          </View>


          <TextInput
            style={styles.input}
            placeholder="Nhập họ tên"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <Text style={styles.sectionTitle}>Địa chỉ:</Text>
        <View style={styles.fieldContainer}>
          <View style={styles.divIcon}>
            <FontAwesome name="map-marker" size={18} color="black" style={styles.icon} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nhập địa chỉ"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>

        <Text style={styles.sectionTitle}>Email:</Text>
        <View style={styles.fieldContainer}>
          <View style={styles.divIcon}>
            <FontAwesome name="envelope" size={18} color="black" style={styles.icon} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nhập email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          
        </View>
        {
            errorEmail ==="" ?null:(
              <Text style={styles.error}>{errorEmail}</Text>
            )
          }
        <Text style={styles.sectionTitle}>Số điện thoại:</Text>
        <View style={styles.fieldContainer}>
          <View style={styles.divIcon}>
            <FontAwesome name="phone" size={18} color="black" style={styles.icon} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>

        <Text style={styles.sectionTitle}>Giới tính:</Text>
        <View style={styles.genderContainer}>
          <FontAwesome name="venus-mars" size={18} color="black" style={styles.icon} />
          <Text style={styles.label}>Giới tính:</Text>
          <Switch
            value={isMale}
            onValueChange={(value) => setIsMale(value)}
          />
          <Text
            style={[
              styles.genderText,
              { color: isMale ? "blue" : "red" }
            ]}
          >
            {isMale ? "Nam" : "Nữ"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Ngày sinh:</Text>
        <TouchableOpacity style={styles.fieldContainer} onPress={showDatepicker}>
          <View style={styles.divIcon}>
            <FontAwesome name="calendar" size={18} color="black" style={styles.icon} />
          </View>
          <View style={styles.input} >
            <Text style={{ paddingTop: 15 }} >{dateOfBirth}</Text>
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DatePicker
            testID="datepicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View style={styles.changePasswordContainer}>

          <TouchableOpacity
            
            onPress={() => navigation.navigate('UpdatePass',{ip:ip,id:id})}
          >
            <View style={styles.change}>
              <Text style={styles.changePasswordButtonText}>
                {showPasswordChangeForm ? "Ẩn thay đổi" : "Đổi mật khẩu"}
              </Text>
              <FontAwesome
                name={showPasswordChangeForm ? "angle-up" : "angle-down"}
                size={18}
                color="black"
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>

        </View>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateAccount}>
          <Text style={styles.updateButtonText}>Cập nhật tài khoản</Text>
        </TouchableOpacity>
        <View style={{ height: 100, backgroundColor: 'white' }}></View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: COLORS.blue,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    padding: 8,
  },
  divIcon: {
    width: 30,
    paddingLeft: 10
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    paddingHorizontal: 1.2,
  },
  icon: {
    // marginRight: 15,
  },
  input: {
    flex: 1,
    height: 50,
    width: 50,

    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,

  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
  },
  genderText: {
    fontSize: 14,
  },
  changePasswordContainer: {
    marginTop: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: 20,
    marginRight: 180,
    marginBottom: 30
  },
  change: {
    flexDirection: "row"
  },
  changePasswordButtonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginRight: 10,
  },
  passwordButton: {
    backgroundColor: COLORS.blue,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginLeft: 60,
    marginRight: 60,
  },
  passwordButtonText: {
    color: "white",
    fontSize: 14,
  },
  showPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  showPasswordText: {
    fontSize: 14,
  },
  updateButton: {
    backgroundColor: COLORS.sky,
    padding: 12,
    borderRadius: 15,
    alignItems: "center",

    paddingVertical: 15
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    paddingLeft: 10,
  }
});

export default AccountUpdateScreen;