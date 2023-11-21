import React, { useRef, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import ListBanner from './comporent/ListBanner';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { FlatList } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { COLORS } from '../contants';

// import Swiper from 'react-native-swiper';

const HomeScreen = ({ route }) => {
    const { ip, id } = route.params;
    const scrollViewRef = useRef(null);
    const [categoryList, setCategoryList] = useState([]);
    const data = [
        { id: 1, name: "Tất cả", api: `http://${ip}:8080/api/book/list?keyword=&&` },
        { id: 2, name: "Sách mới", api: `http://${ip}:8080/api/book/new?` }, 
        { id: 3, name: "Đang sale", api: `http://${ip}:8080/api/book/sale?` }, 
        { id: 4, name: "Bán chạy", api: `http://${ip}:8080/api/book/trend?` }]
  
    const [activeCate, setActiveCate] = useState("")
    const navigation = useNavigation();
    const [bookList, setBookList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [toaDo,setToaDo]=useState(200);
    const [load,setLoad]=useState(true)
    const [leftApi,setLeftApi]=useState(`http://${ip}:8080/api/book/list?keyword=&&`)
    const [api,setApi]=useState(`http://${ip}:8080/api/book/list?keyword=&&page=${page}`)
    const [quantity,setQuantity]=useState(0)
    const currentDate = new Date(); 
    const time=currentDate.getMinutes() +"-"+currentDate.getSeconds()
    useEffect(() => {   
        axios
            .get(api)
            .then((response) => {
                setTotalPage(response.data.totalPages)
                setBookList([...bookList, ...response.data.content]);
               
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            }).finally(() => {
                setLoading(false);
                setLoad(false)
            });
    }, [api]);
    
    
      useEffect(() => {
        const fetchData = () => {
            fetch(`http://${ip}:8080/api/cart/soluong/${id}`)
            .then((res) => res.json())
            .then((data) => {
             
            setQuantity(data)
            })
        };
        fetchData();

    // Sử dụng setInterval để gọi lại fetchData sau mỗi giây
    const intervalId = setInterval(fetchData, 2000); // 1000ms = 1 giây
    return () => clearInterval(intervalId);
      }, [time]);
     
    const handleScroll = (event) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        // console.log(yOffset)
        // Hiển thị hoặc ẩn nút dựa trên điều kiện cuộn
        setShowScrollButton(yOffset > 200); // Thay đổi 200 thành giá trị phù hợp với yêu cầu của bạn
        if(yOffset>toaDo){
            setToaDo(yOffset+400)
            if (page < totalPage) {
                setLoad(true)
                let rightApi='page='+(page+1)
                let apiNew=leftApi+rightApi
                setApi(apiNew)
                console.log("Api new",apiNew)
                setPage(page+1)
            }
        }
      };
    const handleScrollToTop = () => {
        // Cuộn về đầu trang
        console.log("aloooo")
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    };
    const reset=()=>{
        setPage(1);
        setBookList([]);
        setToaDo(200);
        setTotalPage(0)
    }
    useEffect(() => {
        // Gọi API danh sách danh mục
        axios
            .get(`http://${ip}:8080/api/category/`)
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (

        <View style={styles.container}>
            <StatusBar translucent={false} backgroundColor={'white'} style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <AntDesign name="bars" size={40} color="black" />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Cart', { id: id, ip: ip })} >
                    <View style={{paddingRight:10,paddingTop:5}}>
                    <AntDesign name="shoppingcart" size={40} color="black" />
                    </View>
                    
                    <View style={styles.quantityCart}>
                        <Text style={{color:"white",textAlign:'center'}}>{quantity}</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <ScrollView ref={scrollViewRef} onScroll={handleScroll}>
                <ListBanner ip={ip}></ListBanner>
                {/* category */}
                <View style={styles.category} >
                    <Text style={styles.titleCate}>Danh mục</Text>
                    <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 15 }}
                        showsHorizontalScrollIndicator={false}  >
                        {categoryList.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={{ marginRight: 20 }}
                                    onPress={
                                        () => {
                                            setActiveCate(item.categoryName)
                                            setLoading(true)
                                            reset()
                                            let apiNew=`http://${ip}:8080/api/category?id=${item.id}&&page=1`
                                            setLeftApi(`http://${ip}:8080/api/category?id=${item.id}&&`)
                                            setApi(apiNew)
                                            
                                        }}
                                >
                                    <Image style={styles.imgItemCate} source={{ uri: 'http://' + ip + ':8080/uploads/' + item.img }} />
                                    <Text style={[styles.cateName,activeCate === item.categoryName && { color: COLORS.blue ,fontWeight:'bold' }]}>{item.categoryName}</Text>
                                </TouchableOpacity>
                            )
                        })
                        }
                    </ScrollView>
                </View>
              
               
                {/* list book */}
                <View style={styles.book}>
                    <Text style={styles.titleBook}>Sản phẩm</Text>
                    <View >
                        {isLoading ? (<ActivityIndicator size={'large'} />) :
                            (
                                <FlatList
                                    scrollEnabled={false}
                                    numColumns={2}
                                    initialNumToRender={2}
                                    columnWrapperStyle={styles.row}
                                    data={bookList}
                                    keyExtractor={(item,index) => index.toString()}
                                    renderItem={({ item }) => (

                                        <TouchableOpacity style={styles.itemBook} onPress={() => { navigation.navigate('BookDetail', { bookItem: item, ip: ip, id: id }); }} >
                                            {item.sale === 0 ? null : (
                                                <View style={styles.sale}>
                                                    <Text style={{ color: '#fff' }}>-{item.sale}%</Text>
                                                </View>
                                            )}
                                            <View style={styles.divanh}>
                                                <Image style={styles.imgBook} source={{ uri: 'http://' + ip + ':8080/uploads/' + item.image }} />
                                                <View style={styles.noidung}>
                                                    <View style={styles.dess}>
                                                        <Text style={styles.bookName}>{item.bookName.length > 17 ? item.bookName.substring(0, 17) + "..." : item.bookName}</Text>
                                                        <Text style={styles.author}>{item.author.nameAuthor}</Text>
                                                        <View style={styles.divprice}>
                                                            <Text style={{ color: 'black' }}> <AntDesign name="star" size={15} color="gold" /> {item.star}</Text>
                                                            <Text style={styles.priceSale}>{item.priceSale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            )
                        }
                    </View>
                </View>
                {load ?
                    <View style={{ alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} />
                    </View> : null
                }
               
               
            </ScrollView>
           
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    header: {
        paddingHorizontal: 15,
        paddingVertical:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor:'#4AB5FD'
    },
    input:{
        
        width:'80%',
        paddingLeft:10
    },
    search:{
        borderRadius:20,
        borderWidth:1,
        borderColor:COLORS.primary,
        width:'68%',
        height:42,
        justifyContent:'space-around',
        flexDirection:'row'
    },
    iconLoupe:{
        width:30,
        height:30,
        marginTop:5,
        marginRight:8
    },
    quantityCart:{
        backgroundColor:COLORS.error,
        borderRadius:50,
        height:25,
        width:25,
        position:'absolute',
        top:0,
        right:0,
        alignItems:'center',
        justifyContent:'center'
    },
    titleCate: {
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 20,
        paddingHorizontal: 15,
    },
    category: {
        backgroundColor: 'white',
        paddingVertical: 20,
    },
    itemCate: {
        width: 80,
        marginRight: 20,
        marginBottom: 10
    },
    cateName: {
        width: '100%',
        textAlign: 'center',
        paddingTop: 10
    },

    imgItemCate: {
        width: 80,
        height: 80,
        borderRadius: 20
    },
    cateSort: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLORS.gray,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 35,
        marginHorizontal: 15,
        alignItems: 'center',
        marginBottom: 10
    },
    nameCateSort: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    active: {
        backgroundColor: 'white',
        elevation: 5
    },
    btnSort: {
        borderRadius: 35,
        paddingVertical: 8,
        paddingHorizontal: 10,

    },
    // cssbook
    row: {
        flex: 1,
        justifyContent: 'space-between',

    },
    book: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        // backgroundColor:'#EEEEEE',
    },
    titleBook: {
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 20
    },
    row: {
        flex: 1,
        justifyContent: 'space-between'
    },
    itemBook: {
        width: '48%',
        marginBottom: 15,
    },
    divanh: {
        overflow: 'hidden',
       
    },
    imgBook: {
        width: '100%',
        height: 250,
        // borderRadius: 20,

    },
    noidung: {
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor:COLORS.gray
    },
    dess: {
    },
    bookName: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        paddingVertical: 3
    },
    author: {
        color: 'black',

    },
    divprice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    priceSale: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
    sale: {
        backgroundColor: 'rgb(255,0,0)',
        width: 50,
        height: 25,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        zIndex: 1000,
        right: 10
    },
    btnLoadMore: {
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 20
    },
    scroll:{
        width:60,
        height:60,
        position: 'absolute', 
        bottom: 20, 
        right: 20,
        padding:20,
        backgroundColor:COLORS.blue,
        borderRadius:150,
        alignItems:'center',
        justifyContent:'center'
    }
});

export default HomeScreen;