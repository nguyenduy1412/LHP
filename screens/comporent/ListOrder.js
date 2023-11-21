import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from "react-native";
import { Dimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { COLORS } from "../../contants";
import { useRef } from "react";

const { width, height } = Dimensions.get('screen')
const ListOrder = ({ route }) => {
  const { id, ip, status,reset } = route.params;
  // const id = "1"
  // const ip = "192.168.230.95"
  // const status = 0
  const [isVisible, setIsVisible] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(status);
  const [load, setLoad] = useState(true)
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const currentDate = new Date();
  const time = currentDate.getMinutes() + "-" + currentDate.getSeconds()
  console.log(status)
  useEffect(() => {
    setOrderStatus(status)
  },[reset]);
  useEffect(() => {
    console.log(`http:${ip}:8080/api/order/status?userId=${id}&&status=${orderStatus}&&page=${page}`)
    axios.get(`http:${ip}:8080/api/order/status?userId=${id}&&status=${orderStatus}&&page=${page}`)
      .then((response) => {
        setTotalPage(response.data.totalPages)
        setOrders(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }).finally(() => {

        setLoad(false)
      });
  }, [page, orderStatus,time]);
  const numbers = Array.from({ length: totalPage }, (_, index) => index + 1);
  const navigation = useNavigation();
  const toggleView = (orderId) => {
    const updatedVisible = { ...isVisible };
    updatedVisible[orderId] = !updatedVisible[orderId];
    setIsVisible(updatedVisible);

  };
  const next = () => {

    if (page < totalPage) {
      setLoad(true)
      setPage(page + 1)
    }
  }
  const prev = () => {
    console.log(page)
    if (page > 1) {
      setLoad(true)
      setPage(page - 1)
    }
  }
  const activePage = (item) => {
    if (page !== item) {
      setLoad(true)
      setPage(item)
    }

  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home", { id: id, ip: ip })
          }}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theo dõi đơn hàng</Text>
      </View>
      <ScrollView style={{ padding: 15, marginBottom: 30 }}>
      
        {
          load ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
              <FlatList
                scrollEnabled={false}
                data={orders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.sectionContent} onPress={() => {
                    navigation.navigate("DetailOrder", { ip: ip, order: item, id: id })
                  }} >
                    <View style={styles.infoItem}>
                      <FontAwesome name="shopping-cart" size={24} color="#00ABE0" />
                      <Text style={styles.infoText}>Mã đơn hàng: {item.id}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Ionicons name="person" size={24} color="#00ABE0" />
                      <Text style={styles.infoText}>Khách hàng: {item.fullName}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <FontAwesome5 name="money-check" size={20} color="#00ABE0" />
                      <Text style={styles.infoText}>Tổng tiền: {item.sumMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => toggleView(item.id)}>
                      {
                        isVisible[item.id] ? (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.sectionTitle}>Thu gọn</Text>
                            <MaterialIcons name="expand-less" size={24} color="#00ABE0" />
                          </View>
                        ) : (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.sectionTitle}>Xem thêm</Text>
                            <MaterialIcons name="expand-more" size={24} color="#00ABE0" />
                          </View>
                        )
                      }

                    </TouchableOpacity>
                    {isVisible[item.id] && (
                      <View >
                        {item.orderDetails.map((detail) => (
                          <TouchableOpacity key={detail.id} style={styles.productItem} >
                            <View style={styles.borderImage}>
                              <Image source={{ uri: 'http:' + ip + ':8080/uploads/' + detail.book.image }} style={styles.productImage} />
                            </View>
                            <View style={{ width: '70%', paddingLeft: 20 }}>
                              <Text style={styles.productName}>{detail.book.bookName}</Text>
                              <Text style={styles.productQuantity}>Số lượng: {detail.quantity}</Text>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.productPrice}>Giá: {detail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </TouchableOpacity>

                )}
              />
              {
                totalPage > 1 ? (
                  <View style={{ marginBottom: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.btnPage} onPress={prev}>
                      <Image style={styles.icon} source={require('../../assets/prev.png')} />
                    </TouchableOpacity>
                    {numbers.map((number) => (
                      <TouchableOpacity
                        key={number}
                        style={[styles.btnPage, page === number && { backgroundColor: COLORS.blue }]}
                        onPress={() => activePage(number)}
                      >
                        <Text style={[styles.pageNumber, page === number && { color: 'white' }]}>{number}</Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.btnPage} onPress={next}>
                      <Image style={styles.icon} source={require('../../assets/next.png')} />
                    </TouchableOpacity>
                  </View>
                ) : null
              }
            </View>
          )
        }
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
  icon: {
    width: 30,
    height: 30,
  },
  tabs: {
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 20
  },
  tab: {
    width: (width - 30) / 5,
    borderRadius: 5,
    paddingVertical: 20
  },
  tabText: {
    fontSize: 10,
    paddingTop: 10
  },
  activeTab: {
    backgroundColor: "#5ECAEE",

  },
  section: {

    backgroundColor: "white",
    elevation: 2,
    borderRadius: 5,
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.blue,
    margin: 10,

  },
  sectionContent: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 20
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  productItem: {
    backgroundColor: 'white',

    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  borderImage: {
    width: 100,
    height: 140,
    borderRadius: 5,
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: '100%'
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,

  },
  productQuantity: {
    fontSize: 14,
    paddingVertical: 5
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5
  },
  btnRate: {
    backgroundColor: 'gold',
    borderRadius: 10,
    padding: 10
  },
  pageNumber: {
    fontSize: 20
  },
  btnPage: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8
  }
});

export default ListOrder;
