import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, StatusBar, TextInput, Button } from "react-native";

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { COLORS } from "../../contants";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

const ListFavourite = ({ route }) => {
  const { id, ip } = route.params;
  const [favouriteItem, setfavouriteItem] = useState([]);
  const navigation = useNavigation();
  const currentDate = new Date(); 
  const time=currentDate.getMinutes() +"-"+currentDate.getSeconds()
  const [reset,setReset]=useState(time)
  console.log(reset)
  useEffect(() => {
    axios.get(`http://${ip}:8080/api/favourite/${id}`)
      .then((response) => {
        setfavouriteItem(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reset,time]);
  const showToast=(mess,type)=>{
    
    Toast.show({
      type:type, 
      text1:"Thông báo",
      text2:mess,
      autoHide:true,
      visibilityTime:2000
    })
  }
  const handleRemoveItem = (bookId) => {
    
    axios.delete(`http://${ip}:8080/api/favourite/delete?userId=${id}&&bookId=${bookId}`)
      .then((response) => {
        showToast("Xóa thành công","success")
        
        setReset(currentDate.getMinutes() +"-"+currentDate.getSeconds())
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleAddCart = (bookId) => {
    
    let formData = {
      userId: id,
      bookId: bookId,
    }
    console.log(formData)
    axios.post(`http://${ip}:8080/api/cartItem/add`, formData)
      .then((respone) => {
        if (respone.status === 200) {
          showToast("Thêm thành công","success")
        }
        else {
          showToast("Thêm thất bại","error")
        }
      }
      )
      .catch((err) => showToast("Lỗi","error"))

  };
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yêu thích</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {favouriteItem.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemBorder}>
              <Image source={{ uri: 'http://' + ip + ':8080/uploads/' + item.book.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.book.bookName}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.itemPriceSale}>{(item.book.priceSale).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                  {item.book.sale === 0 ? null : (
                    <Text style={styles.itemPrice}>{(item.book.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity onPress={() => handleAddCart(item.book.id)}>
                <Image source={require('../../assets/add-to-cart.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveItem(item.book.id)}>
                <Image source={require('../../assets/delete.png')} style={{ width: 35, height: 35,marginLeft:5 }} />
              </TouchableOpacity>
              
            </View>
          </View>
        ))}
      </ScrollView>
       <Toast />
              
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
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
  cartIconContainer: {
    padding: 0,
  },
  cartItem: {
    marginBottom: 16,

  },
  itemBorder: {
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  checkCircle: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 15
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 15,
    padding: 5,
    fontWeight: '500'
  },
  itemPrice: {
    textDecorationLine: 'line-through',
  },
  itemPriceSale: {
    marginRight: 10,
    fontWeight: 'bold'
  },
  quantityButtons: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    borderRadius: 10,
    justifyContent: "space-between"
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 10
  },
  totalPriceContainer: {
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: COLORS.blue,
    alignItems: "center",
    padding: 14,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ListFavourite;
