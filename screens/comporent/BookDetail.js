import { Button, ScrollView, StyleSheet, Text, View,useWindowDimensions  } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native'
import { Image } from 'react-native'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



import axios from 'axios'
import { Alert } from 'react-native'
import { COLORS } from '../../contants'

import { useNavigation } from "@react-navigation/native";

import HTML from 'react-native-render-html';
const BookDetail = ({ route }) => {
    const windowWidth = useWindowDimensions().width;
    const navigation = useNavigation();
    const { bookItem, ip, id } = route.params;
   
    const currentDate = new Date(); 
    const time=currentDate.getMinutes() +"-"+currentDate.getSeconds();
    console.log(time)
    const checkout = () => {
        navigation.navigate('Checkout2', { id: id, ip: ip, bookItem: bookItem })
    }
    const addToCart = async () => {
        let formData = {
            userId: id,
            bookId: bookItem.id,
        }
        
        axios.post(`http://${ip}:8080/api/cartItem/add`, formData)
            .then((respone) => {
                if (respone.status === 200) {
                    Alert.alert("Thông báo","Thêm thành công")
                }
                else {
                    
                }
            }

            )
            .catch((err) =>Alert.alert("Thông báo","Lỗi") )
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>
            <Image style={styles.anh} source={{ uri: 'http://' + ip + ':8080/uploads/' + bookItem.image }}></Image>
            {/* //Button */}

            <TouchableOpacity style={styles.back} onPress={() => { navigation.goBack() }}>

                <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
          
            <View style={styles.space}>

            </View>
            {/* Nội dung */}
            <ScrollView style={styles.tiltle}>
                <View style={styles.noidung}>
                    <View style={styles.pricebook}>
                        <Text style={styles.priceSale}>{bookItem.priceSale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                        {bookItem.sale === 0 ? null : (
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.price}>{bookItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                <Text style={styles.sale}>-{bookItem.sale}%</Text>
                            </View>
                        )}

                    </View>
                    <Text style={styles.bookName}>{bookItem.bookName}</Text>
                    <Text style={styles.author}>{bookItem.author.nameAuthor}</Text>
                    <View style={styles.start}>

                        <Text style={styles.number}>{bookItem.star}</Text>
                        <Text> <FontAwesome name="star" size={15} color="#FFCE3D" /></Text>
                     
                    </View>
                    <View>
                        <Text style={styles.detail}>Chi tiết</Text>
                        <Text>Nhà xuất bản: {bookItem.publicsher.namePublicsher}</Text>
                        <Text>Năm xuất bản: {bookItem.publicationYear}</Text>
                        <Text>Thể loại: {bookItem.category.categoryName}</Text>
                        <Text style={styles.detail} >Mô tả</Text>
                        <HTML source={{ html: bookItem.description }} contentWidth={windowWidth} />
                        
                    </View>
                 
                </View>

            </ScrollView>
            <View style={styles.shopping}>

                <TouchableOpacity style={styles.btnCart} onPress={addToCart}>
                    <AntDesign name="shoppingcart" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnShopping} onPress={checkout}>
                    <Entypo name="shopping-bag" size={24} color="black" />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>  Mua ngay</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default BookDetail

const styles = StyleSheet.create({
    anh: {
        width: 'auto',
        height: 420,
        backgroundColor: 'blue'
    },

    back: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 10,
        borderRadius: 50,
        margin: 20,
        marginTop: 40,
        position: 'absolute',

    },
    cart: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 10,
        borderRadius: 50,
        margin: 20,
        right: 0,
        position: 'absolute',
        marginTop: 40,
    },
    tiltle: {
        backgroundColor: 'white',
    },
    noidung: {
        paddingHorizontal: 15,

    },
    space: {
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: -45,
        height: 50
    },
    pricebook: {
        paddingBottom: 15,
        flexDirection: 'row'
    },
    priceSale: {
        fontSize: 23,
        fontWeight: 'bold',
        paddingRight: 15,
        color: COLORS.blue
    },
    price: {
        fontSize: 18,
        textDecorationLine: 'line-through',
        paddingRight: 15,

    },
    sale: {
        color: 'red'
    },
    bookName: {
        fontSize: 25,
        fontWeight: 'bold',

    },
    author: {
        fontSize: 16,
        color: 'green'
    },
    start: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    number: {
        fontWeight: 'bold',
        marginLeft: 10
    },
    detail: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    shopping: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    },
    btnCart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.sky,
        padding: 15,
        width: '25%',
        borderRadius: 25
    },
    iconCart: {
        width: 35,
        height: 35
    },
    btnShopping: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.gold,
        padding: 15,
        width: '70%',
        borderRadius: 25
    },
    review: {
        backgroundColor: COLORS.gray,
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginVertical: 10,
    },
    bag: {
        width: 40,
        height: 40
    }
})