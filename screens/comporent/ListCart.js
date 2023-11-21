import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, StatusBar, TextInput } from "react-native";

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { COLORS } from "../../contants";
import Toast from "react-native-toast-message";
const ListCart = ({ route }) => {
  const { id, ip } = route.params;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const currentDate = new Date();
  const time = currentDate.getMinutes() + "-" + currentDate.getSeconds()
  const [reset, setReset] = useState('')
  const showToast = (mess, type) => {
    Toast.show({
      type: type,
      text1: "Thông báo",
      text2: mess,
      autoHide: true,
      visibilityTime: 2000
    })
  }
  useEffect(() => {

    axios.get(`http://${ip}:8080/api/cart/listItem/${id}`)
      .then((response) => {

        setCartItems(response.data);


      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios.get(`http://${ip}:8080/api/cart/${id}`)
      .then((response) => {

        setTotal(response.data.total);


      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [time, reset]);

  const handleRemoveItem = (itemId) => {
    showToast("Xóa thành công", "success")
    axios.delete(`http://${ip}:8080/api/cartItem/${itemId}`)
      .then((response) => {
        
        setReset(time)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleIncreaseQuantity = (item) => {
    let quantity = item.quantity + 1;
    let formData = {
      quantity: quantity,
    }
    axios.put(`http://${ip}:8080/api/cartItem/${item.id}`, formData)
      .then((response) => {
        setReset(time)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  };

  const handleDecreaseQuantity = (item) => {
    let quantity = item.quantity - 1;
    let formData = {
      quantity: quantity,
    }
    axios.put(`http://${ip}:8080/api/cartItem/${item.id}`, formData)
      .then((response) => {
        setReset(time)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>
      {
        cartItems.length > 0 ? (
          <ScrollView contentContainerStyle={styles.scrollView}>
            {cartItems.map((item) => (
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

                    <View style={styles.quantityButtons}>
                      <TouchableOpacity onPress={() => handleDecreaseQuantity(item)}>
                        <FontAwesome name="minus-circle" size={24} color="#00ABE0" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText} >{item.quantity}</Text>
                      <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
                        <FontAwesome name="plus-circle" size={24} color="#00ABE0" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                    <Image source={require('../../assets/delete.png')} style={{ width: 40, height: 40 }} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.cartEmpty}>
            <Image style={{ width: 300, height: 300 }} source={require('../../assets/market.png')} />
          </View>
        )
      }
      {
        cartItems.length > 0 ? (
          <View>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceText}>Tổng: {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => { navigation.navigate('Checkout', { id: id, ip: ip }) }}>
              <Text style={styles.checkoutButtonText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        ) : null
      }
     
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
  cartEmpty: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
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

export default ListCart;
