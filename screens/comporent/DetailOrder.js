import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { View, Text, ScrollView, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "./CustomAlert";
import { COLORS } from "../../contants";
import moment from "moment";

const DetailOrder = ({ route }) => {

  const navigation = useNavigation();

  const { order, ip,id } = route.params;
  const currentDate = new Date();
  const time = currentDate.getMinutes() + "-" + currentDate.getSeconds()
  const [alertVisible, setAlertVisible] = useState(false);
  const onPage = () =>{
    navigation.navigate('Order',{ id: id,ip:ip,status:4,reset:time});
    setAlertVisible(false);
  }
  const formatDate = (reviewDate) => {
    const formattedDate = moment(reviewDate).format('DD/MM/YYYY');
    return formattedDate;
};
 
  
  const cancelOrder =() => {
    axios.delete(`http://${ip}:8080/api/order/cancel/${order.id}`)
    .then((response) => {
      setAlertVisible(true); 
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
    
  };
  // Calculate the total price of the order


  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theo dõi đơn hàng</Text>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        <ScrollView contentContainerStyle={styles.cartItemsContainer}>
          {order.orderDetails.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.productBorder}>
                <Image source={{uri: 'http://'+ip+':8080/uploads/'+item.book.image}} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.book.bookName}</Text>
                  <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
                  <Text style={styles.itemPrice}>{(item.book.priceSale * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.customerInfoContainer}>
          <Text style={styles.customerInfoTitle}>Thông tin đơn hàng:</Text>
          <View style={styles.input}>
            <Text >Tên người nhận: {order.fullName}</Text>
          </View>
          <View style={styles.input}>
            <Text >Số điện thoại: {order.phone}</Text>
          </View>
          <View style={styles.input}>
            <Text >Địa chỉ: {order.addressShip}</Text>
          </View>
          <View style={styles.input}>
            <Text >Ngày đặt hàng: {formatDate(order.dateOrder)}</Text>
          </View>
          <View style={styles.input}>
            {order.status ===0 ?(
              <Text >Tình trạng đơn hàng: Chờ xác nhận</Text>
            ):null
            }
            {order.status ===1 ?(
              <Text >Tình trạng đơn hàng: Chờ lấy hàng</Text>
            ):null
            }
            {order.status ===2 ?(
              <Text >Tình trạng đơn hàng: Đang vận chuyển</Text>
            ):null
            }
            {order.status ===3 ?(
              <Text >Tình trạng đơn hàng: Giao thành công</Text>
            ):null
            }
            
          </View>
          <View style={styles.input}>
            <Text >Ghi chú: {order.note}</Text>
          </View>
          
          
        </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Tổng: {order.sumMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
        </View>
        {
          (order.status===0 || order.status===1) ?(
            <TouchableOpacity style={styles.checkoutButton} onPress={cancelOrder}>
              <Text style={styles.checkoutButtonText}>Huỷ đơn hàng</Text>
            </TouchableOpacity>
          ):null
        }
       
        <View style={{ marginBottom:30}}>

        </View>
      </ScrollView>
      <CustomAlert
        visible={alertVisible}
        message="Hủy thành công!"
        onPage={onPage}
        img={require('../../assets/cancelOrder.webp')}
        color={"#FFCB00"}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollViewContent: {
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
  error: {
    color: 'red',
    paddingLeft: 10,
    paddingTop: 5
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    padding: 8,
  },
  cartItemsContainer: {
    marginBottom: 16,
   
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productBorder: {
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius:10
  },
  itemDetails: {
    flex: 1,
    marginLeft: 70,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 16,
    color: "#777",
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  customerInfoContainer: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  customerInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.blue,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginTop: 8,
    padding: 8,
    alignItems:'center',
    flexDirection:'row'
  },
  orderNoteContainer: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderNoteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.blue,
    marginBottom: 8,
  },
  totalPriceContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: COLORS.blue,
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
   
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
   
  },
});

export default DetailOrder;
