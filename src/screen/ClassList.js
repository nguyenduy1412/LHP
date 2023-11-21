// StudentList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

function ClassList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Gọi API và cập nhật danh sách lớp
    axios.get('http://192.168.0.109:3000/api/class/')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <View>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>Giáo viên chủ nhiệm : {item.supervising_Teacher}</Text>
            {/* Hiển thị các thông tin khác của lớp học */}
          </View>
        
        )}
      />
    </View>
  );
}

export default ClassList;
