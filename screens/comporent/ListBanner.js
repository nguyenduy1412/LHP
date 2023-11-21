import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Image } from 'react-native';
const { width, height } = Dimensions.get('screen')

const ListBanner = ({ip}) => {
    
    const [bannerList, setBannerList] = useState([]);
    useEffect(() => {
        // Gọi API và cập nhật danh sách sinh viên
        axios
          .get(`http://${ip}:8080/api/banner/`)
          .then((response) => {
            setBannerList(response.data);
            
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
  return (
            <View style={styles.banner}>
                <SwiperFlatList
                autoplay
                autoplayDelay={2}
                autoplayLoop
                index={2}
                showPagination
                data={bannerList}
                renderItem={({ item }) => (
                    <View key={item} style={styles.slide}>
                        {/* <Image source={item.imageSource} style={styles.image} /> */}
                        <Image style={styles.image} source={{uri: 'http://'+ip+':8080/uploads/'+item.img}} />
                        
                    </View>
                )}
                />
            </View>
  )
}

export default ListBanner

const styles = StyleSheet.create({
    banner:{
        height:200,
       
    },
    
    slide: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        height:200,
       
        overflow:'hidden',
      
       
    },
    image: {
        width: '100%', // Thay đổi kích thước hình ảnh theo ý muốn
        height: 200,
       
    },

})