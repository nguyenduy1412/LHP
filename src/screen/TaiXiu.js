import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
const {width,height} =Dimensions.get('screen')
const TaiXiu = ({route}) => {
    const navigation = useNavigation();
    const {id,ip}=route.params;
    const [user,setUser]=useState("")
    const [money, setMoney] = useState(0)
    const [sodu, setSoDu] = useState(100000)
    const [number, setNumber] = useState(5)
    const [action, setAction] = useState(false)
    const [randomNumber, setRandomNumber] = useState(0);
    const [choose, setChoose] = useState(0)
    const [tiennap, setTienNap] = useState(0)
    function numberFormat(sodu){
        if(sodu>=10000){
            let format=sodu.toString().split('').reverse().join('')
            let formatNum = "";
            for(let i=0;i<format.length;i++){
                formatNum+=format[i]
                if((i+1)%3==0 && i<format.length-1){
                    formatNum+="."
                }
            }
            return formatNum.split('').reverse().join('');
        }
        return sodu;
    }
    useEffect(() => {
        
          axios.get(`http://${ip}:8080/api/user/${id}`)
            .then((response) => {
                setUser(response.data);
             
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
     
    
        // Gọi fetchData ngay lúc đầu
        
      }, []);
    useEffect(() => {
        let interval = 1;
        if (action && number > 0) {
            interval = setInterval(() => {
                setNumber(preTime => preTime - 1)
            }, 1000)
        }else if (number === 0) {
            // Generate a random number when number becomes 0 and action is true
            
            let random=Math.floor(Math.random() * 10) +1
            setRandomNumber(random);
            let tien= (random !=0 && random %2==choose) ?(sodu +Number(money)) : (sodu-Number(money))
            
            setSoDu(tien)
            
          }
        return () => {
            clearInterval(interval)
        }
    }, [number, action])
    
    const handlePlay1 = () => {
        setAction(true)
    
        setChoose(0)
    }
    const handlePlay2 = () => {
        setAction(true)
        setChoose(1)
    }
    const nap = () => {
        setSoDu(sodu+ Number(tiennap))
    }
    const handlePause = () => {
        setAction(false)
    }
    const handleReset = () => {
        setAction(false)
        setNumber(5)
        setRandomNumber(0)
    }
    
    return (
        <View style={styles.container}>
            <Image style={styles.imageBackground} source={require('../../assets/bg1.jpg')}/>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.btnBack} >
                  <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Bộ môn thần số học</Text>
            <View style={styles.xucxac}>
                <View>
                    <TouchableOpacity onPress={handleReset}>
                          <Image source={require('../../assets/tx.png')} style={{ width: '100%', height: 200 }} />
                    </TouchableOpacity>
                    
                    <Text style={styles.times}>{number}</Text>
                    {randomNumber %2==0 && randomNumber!=0 ? ( <Image source={require('../../assets/tai.png')} style={[styles.chu1, styles.scaledImage]}/>
                    ) : (<Image source={require('../../assets/tai.png')} style={styles.chu1} />)}
                    {randomNumber %2==1 && randomNumber!=0 ? ( <Image source={require('../../assets/xiu.png')} style={[styles.chu2, styles.scaledImage]}/>
                    ) : (<Image source={require('../../assets/xiu.png')} style={styles.chu2} />)}
                    
                </View>

                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                    <TextInput placeholder="Nhập số tiền cược" style={styles.input} onChangeText={(value)=>setMoney(value)}></TextInput>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' ,paddingTop:20}}>
                    <TouchableOpacity style={styles.btn} onPress={handlePlay1}>
                        <Text style={styles.textbtn}>Cược</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={handlePlay2}>
                        <Text style={styles.textbtn}>Cược</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20,paddingTop:40 }}>
                    <View>
                        <Image source={{uri: 'http://' + ip + ':8080/uploads/' + user.img}} style={styles.user} />
                        <Text style={styles.nameuser}>{user.fullName}</Text>
                    </View>

                    <View >
                        <Text style={{ fontSize: 20, color: 'white' }}>Số dư tài khoản</Text>
                        <View style={styles.ochuatien}>
                        <MaterialIcons name="attach-money" size={24} color="gold" />
                            <Text style={{ color: 'rgb(250,248,0)', fontWeight: 'bold', fontSize: 20 }}>{numberFormat(sodu)}</Text>
                        </View>
                    <View>
    
                </View>
                </View>

                </View>
                <TextInput placeholder='Nhập số tiền' style={styles.inputNap} onChangeText={(value)=>setTienNap(value)}></TextInput>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center',paddingTop:40 }} onPress={nap}>
                    <Image source={require('../../assets/naptien.png')} style={{ width: 180, height: 60 }}></Image>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default TaiXiu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        
    },
    imageBackground:{
        width:width,
        height:height,
        position: 'absolute',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        padding: 20,
        
    },
    xucxac: {
        paddingTop: 10,
        width: '100%',

    },
    btn: {
        backgroundColor: 'rgb(250,248,0)',
        width: 120,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,

    },
    textbtn: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'uppercase',


    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 50,
        padding:15
    },
    times: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        left: 191,
        top: 61,
        position: 'absolute',
    },
    chu1: {
        width: 70,
        height: 34,
        position: 'absolute',
        left: 60,
        top: 80,
      
    },
    chu2: {
        width: 70,
        height: 34,
        position: 'absolute',
        right: 60,
        top: 80,
        
    },
    user: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: 'yellow',
        borderWidth: 3
    },
    nameuser: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',


    },
    ochuatien: {
        flexDirection: 'row',
        borderColor: 'yellow',
        borderWidth: 4,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 50,
        width: 250,
        backgroundColor: 'rgb(15,15,15)',
        marginTop: 10
    },
    scaledImage: {
        transform: [{ scale: 1.7 }],
     
        
    },
    inputNap:{
        backgroundColor:'white',
        borderRadius: 20,
        height: 50,
        padding:15,
        marginHorizontal:20,
        
    }
})