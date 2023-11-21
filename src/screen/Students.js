// StudentList.js
import React, { useState, useEffect } from 'react';
import {SafeAreaView,Image, View, Text, FlatList,StyleSheet, StatusBar } from 'react-native';
import axios from 'axios';
//const imageurl = require('../assets/vidu.png')
function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Gọi API và cập nhật danh sách sinh viên
    axios.get('http://10.0.60.192:3000/api/students/')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Image
        style={styles.stretch}
        // source={{uri:'assets:/icon.png'      

        // }}
      />
            {/* Hiển thị các thông tin khác của sinh viên */}
          </View>
        
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'blue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  stretch: {
    width: 150,
    height: 110,
    resizeMode: 'stretch',
  },
});
export default StudentList;