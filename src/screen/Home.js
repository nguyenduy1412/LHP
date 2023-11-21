import { StyleSheet, Text, View,Image,Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const {width,height} =Dimensions.get('screen')


const Home = () => {
    const [number,setNumber]=useState(60)
    const [action,setAction]=useState(false)
    useEffect(() =>{
        let interval;
        if(action && number>0){
            interval =setInterval(() =>{
                setNumber(preTime => preTime -1)
            },1000)
        }
       
        return ()=>{
            clearInterval(interval)
        }
    },[number,action])
    const handlePlay=() =>{
        setAction(true)
    }
    const handlePause=() =>{
        setAction(false)
    }
    const handleReset=() =>{
        setAction(false)
        setNumber(60)
    }
  return (
    <View style={styles.container}>
       <Image style={styles.imageBackground} source={require('./hinhnen.jpg')}/>
       <View style={styles.viewBody}>
            <Text style={styles.textView}>{number}</Text>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={handlePlay} style={styles.button}>
                    <AntDesign name="playcircleo" size={44} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePause} style={styles.button}>
                 <AntDesign name="pausecircleo" size={44} color="white" />
                </TouchableOpacity>
                <TouchableOpacity  onPress={handleReset} style={styles.button}>
                    <FontAwesome name="refresh" size={44} color="white" />
                </TouchableOpacity>
            </View>
       </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    viewBody:{
        flex:1,
        justifyContent: 'space-around'
    },
    imageBackground:{
        width:width,
        height:height,
        position: 'absolute',
    },
    textView:{
        textAlign: 'center',
        fontSize:150,
        color: 'white',
        fontWeight: 'bold'
    },
    button:{
        
        width:80,
        height:80,
        borderRadius:100,
        backgroundColor:'rgb(21, 162, 250)',
        justifyContent:'center',
        alignItems: 'center',
        
    },
    viewButton:{
        flexDirection: 'row',
        justifyContent:'space-evenly'
    }
})