import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../contants'
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from 'react-native';
import { Switch } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import CustomAlert from './CustomAlert';
const UpdatePass = ({ route }) => {
    const { ip, id } = route.params;
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPassOld, setErrorPassOld] = useState("")
    const [errorPassNew, setErrorPassNew] = useState(false)
    const [errorRPassNew, setErrorRPassNew] = useState("")
    const [alertVisible, setAlertVisible] = useState(false);
    
    const handUpdate = () => {
        let check = true;
        if (oldPassword.trim().length < 6) {
            setErrorPassOld("Mật khẩu ít nhất 6 kí tự")
            check = false
        } else {
            setErrorPassOld("")
        }
        if (password.trim().length < 6) {
            setErrorPassNew(true)
            check = false
        } else {
            setErrorPassNew(false)
        }
        if (confirmPassword.trim().length < 6) {
            check = false;
            setErrorRPassNew("Mật khẩu có ít nhất 6 kí tự")
        }
        else{
            if (password !== confirmPassword) {
                check = false;
                setErrorRPassNew("Mật khẩu không khớp")
            } else {
                setErrorRPassNew("")
            }
        }
        
        if (check) {
            let formData = {
                passwordOld: oldPassword,
                passwordNew: password
            }
            axios.put(`http://${ip}:8080/api/user/updatePass/${id}`, formData)
                .then((respone) => {
                    if (respone.status === 200) {
                        navigation.navigate('Account', { ip: ip, id: id });
                    }

                }
                )
                .catch((err) => {
                    if (err.response) {
                        
                        setErrorPassOld(err.response.data)
                      }
                })
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={styles.backButton}
                >
                    <FontAwesome name="arrow-left" size={18} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Đổi mật khẩu</Text>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <Text style={styles.sectionTitle}> Mật khẩu cũ:</Text>
                <View style={styles.formControl}>
                    <View style={styles.fieldContainer}>
                        <FontAwesome name="lock" size={18} color="black" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu cũ"
                            value={oldPassword}
                            onChangeText={(text) => setOldPassword(text)}
                            secureTextEntry={!showPassword}
                        />
                    </View>
                    {errorPassOld === "" ? null :
                        (
                            <Text style={styles.error}>{errorPassOld}</Text>
                        )
                    }
                </View>
                <Text style={styles.sectionTitle}> Mật khẩu mới:</Text>
                <View style={styles.formControl}>
                    <View style={styles.fieldContainer}>
                        <FontAwesome name="lock" size={18} color="black" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu mới"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={!showPassword}
                        />
                    </View>
                    { !errorPassNew ? null :
                        (
                            <Text style={styles.error}>Mật khẩu ít nhất 6 ký tự</Text>
                        )
                    }
                </View>
                <Text style={styles.sectionTitle}>Xác nhận mật khẩu:</Text>
                <View style={styles.formControl}>
                    <View style={styles.fieldContainer}>
                        <FontAwesome name="lock" size={18} color="black" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={!showPassword}
                        />
                    </View>
                    { errorRPassNew === "" ? null :
                        (
                            <Text style={styles.error}>{errorRPassNew}</Text>
                        )
                    }
                </View>
                <View style={styles.showPasswordContainer}>
                    <Switch
                        value={showPassword}
                        onValueChange={(value) => setShowPassword(value)}
                        color="#00ABE0"
                    />
                    <Text style={styles.showPasswordText}>Hiện mật khẩu</Text>

                </View>
                <TouchableOpacity style={styles.updateButton} onPress={handUpdate}>
                    <Text style={styles.updateButtonText}>Đổi mật khẩu</Text>
                </TouchableOpacity>
            </View>
           
        </View>
    )
}

export default UpdatePass

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
    error: {
        color: 'red',
        paddingLeft: 10,
        paddingTop: 5
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
    },
    formControl: {
        marginBottom: 10,

    },
    fieldContainer: {
        flexDirection: "row",
        alignItems: "center",

        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 5,
        paddingHorizontal: 1.2,
    },
    icon: {
        marginRight: 15,
        marginLeft: 10
    },
    input: {
        flex: 1,
        height: 50,
        width: 50,

        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,

    },
    genderContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    label: {
        marginRight: 10,
    },
    genderText: {
        fontSize: 14,
    },
    changePasswordContainer: {
        marginTop: 20,
        padding: 5,
        borderWidth: 1,
        borderColor: COLORS.blue,
        borderRadius: 20,
        marginRight: 180,
    },
    change: {
        flexDirection: "row"
    },
    changePasswordButtonText: {
        color: "black",
        fontSize: 14,
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginRight: 10,
    },
    passwordButton: {
        backgroundColor: COLORS.blue,
        padding: 10,
        borderRadius: 15,
        alignItems: "center",
        marginLeft: 60,
        marginRight: 60,
    },
    passwordButtonText: {
        color: "white",
        fontSize: 14,
    },
    showPasswordContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    showPasswordText: {
        fontSize: 14,
    },
    updateButton: {
        backgroundColor: COLORS.blue,
        padding: 12,
        borderRadius: 15,
        alignItems: "center",

        paddingVertical: 15
    },
    updateButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold'
    },
})