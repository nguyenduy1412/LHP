
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookDetail from './screens/comporent/BookDetail';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ListCart from './screens/comporent/ListCart';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import ListOrder from './screens/comporent/ListOrder';
import Account from './screens/comporent/Account';
import { useNavigation } from "@react-navigation/native";

import Login from './screens/comporent/Login';
import SignUp from './screens/comporent/SignUp';
import Logout from './screens/comporent/Logout';

import Checkout from './screens/comporent/Checkout';


import axios from 'axios';

import AccountUpdateScreen from './screens/comporent/AccountUpdateScreen';


import UpdatePass from './screens/comporent/UpdatePass';
import Checkout2 from './screens/comporent/Checkout2';

import DetailOrder from './screens/comporent/DetailOrder';
import TaiXiu from './src/screen/TaiXiu';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerApp = ({route}) => {
  const { ip, id } = route.params;
  const [userData, setUserData] = useState('');
  // const [screenEnterCount, setScreenEnterCount] = useState(0);
  const status=4;
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://${ip}:8080/api/user/${id}`)
        .then((response) => {
          setUserData(response.data);
         
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    // Gọi fetchData ngay lúc đầu
    fetchData();

    // Sử dụng setInterval để gọi lại fetchData sau mỗi giây
    const intervalId = setInterval(fetchData, 1000); // 1000ms = 1 giây

    // Hủy bỏ interval khi component unmounts
    return () => clearInterval(intervalId);
  }, [ip, id]);

  return (

    <Drawer.Navigator
      drawerContent={
        (props) => {
          return (
            <SafeAreaView>
              <TouchableOpacity style={styles.drawleft} onPress={() => { navigation.navigate('Account',{ id: id,ip:ip} ) }} >
                <Image style={styles.imgCover}  source={{ uri: 'http://' + ip + ':8080/uploads/' + userData.imgCover  }}></Image>
                <View style={styles.borderAvata}>
                  <Image style={styles.imgDraw} source={{ uri: 'http://' + ip + ':8080/uploads/' + userData.img  }} />
                </View>
                <Text style={styles.nameDraw}>{userData.fullName}</Text>
              </TouchableOpacity>
              <DrawerItemList {...props} />
            </SafeAreaView>
          )
        }
      }
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Trang chủ",
          title: "Trang chủ",
          drawerIcon: () => (
            <FontAwesome name="home" size={30} color="black" />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
          // headerTitle: CustomHeader,
          headerShown: false
        }}
        initialParams={{ id, ip }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Cart"
        options={{
          drawerLabel: "Giỏ hàng",
          title: "Giỏ hàng",
          drawerIcon: () => (
            <AntDesign name="shoppingcart" size={30} color="black" />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
         
          headerShown: false
        }}
        initialParams={{ id, ip }}
        component={ListCart}
      />
      
      <Drawer.Screen
        name="Order"
        options={{
          drawerLabel: "Đơn hàng",
          title: "Đơn hàng",
          drawerIcon: () => (
            <FontAwesome name="list-alt" size={30} color="black" />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
          headerShown: false
        }}
        initialParams={{ id, ip,status }}
        component={ListOrder}
      />
      <Drawer.Screen
        name="Game"
        options={{
          drawerLabel: "Trò chơi",
          title: "Trò chơi",
          drawerIcon: () => (
            <Ionicons name="game-controller-outline" size={30} color="black" />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
          headerShown: false
        }}
        initialParams={{ id, ip }}
        component={TaiXiu}
      />
      <Drawer.Screen
        name="Logout"
        options={{
          drawerLabel: "Đăng xuất",
          title: "Logut",
          drawerIcon: () => (
            <AntDesign name="logout" size={30} color="black" />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
          headerShown: false
        }}
        component={Logout}
      />
   
    </Drawer.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
        <Stack.Screen name="DrawerApp" component={DrawerApp} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateAccount" component={AccountUpdateScreen} options={{ headerShown: false }} />     
        <Stack.Screen name="DetailOrder" component={DetailOrder} />  
        <Stack.Screen name="ListOrder" component={ListOrder} />  
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Checkout2" component={Checkout2} />
      
      
        <Stack.Screen name="UpdatePass" component={UpdatePass} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  imguser: {
    width: 40,
    height: 40,
  },
  anh: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  drawleft: {

    paddingBottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white'
  },
  borderAvata:{
    height: 130,
    width: 130,
    borderRadius: 200,
    marginTop:-90,
    borderWidth:4,
    borderColor:'white',
    overflow:'hidden'
  },
  imgCover:{
    width:'100%',
    height:230
  },
  imgDraw: {
    width:'100%',
    height:'100%'
  },
  nameDraw: {
    fontSize: 22,
    marginTop: 10,
    fontWeight:'bold'
  },
  icons: {
    width: 40,
    height: 40,
  },
})