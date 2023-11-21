import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('screen')
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { LogBox } from 'react-native';
import { useState } from 'react';
import moment from 'moment';
LogBox.ignoreLogs(['Key "cancelled" in the image picker result']);
const Account = ({ route }) => {
  const { id, ip } = route.params;
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [userData, setUserData] = useState('');
  const currentDate = new Date(); 
  const time=currentDate.getMinutes() +"-"+currentDate.getSeconds()
  const formatDate = (reviewDate) => {
    const formattedDate = moment(reviewDate).format('DD/MM/YYYY');
    return formattedDate;
  };

  useEffect(() => {
      axios.get(`http://${ip}:8080/api/user/${id}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, [time]);
  const pickImage1 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1,
    });
    //lấy đuôi file



    if (!result.canceled) {
      const fileExtension = result.assets[0].uri.split('.').pop();
      const currentDate = new Date(); // Tạo một đối tượng Date đại diện cho ngày giờ hiện tại
      const day = currentDate.getDate(); // Lấy ngày
      const month = currentDate.getMonth() + 1; // Lấy tháng (lưu ý tháng bắt đầu từ 0)
      const year = currentDate.getFullYear(); // Lấy năm
      const hours = currentDate.getHours(); // Lấy giờ
      const minutes = currentDate.getMinutes(); // Lấy phút
      const seconds = currentDate.getSeconds(); // Lấy giây
      // Chuyển đổi ngày tháng năm giờ phút giây thành chuỗi
      const imgName = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}.${fileExtension}`;
      setImage(result.assets[0].uri);
      const apiUrl = `http://${ip}:8080/api/user/uploadAvata/${id}`;
      uploadImage(result.assets[0].uri, imgName, apiUrl);
    }
  };
  const pickImage2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1,
    });
    //lấy đuôi file
    

    if (!result.canceled) {
      const fileExtension = result.assets[0].uri.split('.').pop();
      const currentDate = new Date(); // Tạo một đối tượng Date đại diện cho ngày giờ hiện tại
      const day = currentDate.getDate(); // Lấy ngày
      const month = currentDate.getMonth() + 1; // Lấy tháng (lưu ý tháng bắt đầu từ 0)
      const year = currentDate.getFullYear(); // Lấy năm
      const hours = currentDate.getHours(); // Lấy giờ
      const minutes = currentDate.getMinutes(); // Lấy phút
      const seconds = currentDate.getSeconds(); // Lấy giây
      // Chuyển đổi ngày tháng năm giờ phút giây thành chuỗi
      const imgName = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}.${fileExtension}`;

      setImage2(result.assets[0].uri);
      const apiUrl = `http://${ip}:8080/api/user/uploadCover/${id}`;
      uploadImage(result.assets[0].uri, imgName, apiUrl);
    }
  };
  const uploadImage = async (uri, imgName, apiUrl) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: imgName,
      type: 'image/*',
    });
    // Send the image to the server using axios or any HTTP library
    axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Image uploaded successfully');
      })
      .catch((error) => {
        console.error('Error uploading image: ', error);
      });
  };
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>
      <View>
        <View style={styles.borderCover} >
          <Image style={styles.imgCover} source={image2 ? { uri: image2 } : { uri: 'http://' + ip + ':8080/uploads/' + userData.imgCover}}></Image>
        </View>

        <TouchableOpacity style={styles.btnUploadCover} onPress={pickImage2}>
          <Entypo name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View>
          <View style={styles.borderAvata}>
            <Image style={styles.avatar} source={image ? { uri: image } : { uri: `http://${ip}:8080/uploads/` + userData.img  }} />
          </View>
          <TouchableOpacity style={styles.btnUploadAvatar} onPress={pickImage1}>
            <Entypo name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.nameUser}>{userData.fullName}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.btnBack} onPress={() => { navigation.goBack() }}>
            <AntDesign name="doubleleft" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnUpdate} onPress={() => { navigation.navigate('UpdateAccount', { ip: ip, id: id }) }}>
            <FontAwesome5 name="pen" size={16} color="black" />
            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 10 }}>Chỉnh sửa trang cá nhân</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.detail} >Chi tiết</Text>



        {userData.email === null ? null :
          (
            <View style={styles.inform}>
              <MaterialIcons name="email" size={30} color="black" />
              <Text style={styles.text}>{userData.email}</Text>
            </View>
          )
        }
        {userData.address === null ? null :
          (
            <View style={styles.inform}>
              <Entypo name="location" size={30} color="black" />
              <Text style={styles.text}>{userData.address}</Text>
            </View>
          )
        }
        {userData.telephone === null ? null :
          (
            <View style={styles.inform}>
              <Entypo name="old-phone" size={30} color="black" />
              <Text style={styles.text}>{userData.telephone}</Text>
            </View>
          )
        }
        {userData.gender === null ? null :
          (
            <View style={styles.inform}>
              <FontAwesome name="transgender" size={30} color="black" />
              <Text style={styles.text}>{userData.gender == 1 ? 'Nam' : 'Nữ'}</Text>
            </View>
          )
        }
        {userData.birthday === null ? null :
          (
            <View style={styles.inform}>
              <FontAwesome name="birthday-cake" size={30} color="black" />
              <Text style={styles.text}>{formatDate(userData.birthday)}</Text>
            </View>
          )
        }


      </View>


    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  },
  borderCover: {
    width: width,
    height: 300,
    overflow: 'hidden'
  },
  imgCover: {
    width: '100%',
    height: '100%'
  },
  borderAvata: {
    width: 180,
    height: 180,
    borderRadius: 150,
    borderColor: 'white',
    borderWidth: 4,
    marginTop: -130,
    overflow: 'hidden'
  },
  avatar: {
    width: '100%',
    height: '100%'

  },
  nameUser: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 15
  },
  btnUploadCover: {
    width: 45,
    height: 45,
    backgroundColor: '#E5E6EB',
    position: 'absolute',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 10,
    borderWidth: 4,
    borderColor: 'white'
  },
  btnUploadAvatar: {
    width: 45,
    height: 45,
    backgroundColor: '#E5E6EB',
    position: 'absolute',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    left: 130,
    borderWidth: 4,
    borderColor: 'white'
  },
  btnBack: {
    backgroundColor: '#E5E6EB',
    padding: 10,
    borderRadius: 8
  },
  btnUpdate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E6EB',
    padding: 10,
    borderRadius: 8,
    width: '86%'
  },
  detail: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 25,

  },
  inform: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15
  },
  text: {
    fontSize: 17,
    paddingLeft: 10
  },
  icon: {
    width: 50,
    height: 50
  }
})