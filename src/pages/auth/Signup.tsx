import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants';
import InputText from '../../components/InputText';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

type Props = {}

const Signup = (props: Props) => {
    const [isTextSecure, setIsTextSecure] = useState(true)
    const [isTextSecure2, setIsTextSecure2] = useState(true)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = (newUsername: string) => {
        setEmail(newUsername);
    };

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    };

    const handleConfirmPassword = (newPassword: string) => {
        setConfirmPassword(newPassword)
    }

    const handlePhoneNumber = (newPhoneNumber: string) => {
        setPhoneNumber(newPhoneNumber)
    }

    const handleName = (newName: string) => {
        setName(newName)
    }

    const handleSubmit = () => {
        if (email === null) {
            navigation.navigate('TFA', { username: email , password: password})
            console.log(name, email, password, phoneNumber)
        } else {
            console.log('enter email')
        }

    }

    const navigation: any = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.headBody}>
                <Text style={styles.headTxt}>Signup.</Text>
            </View>
            <View style={styles.body}>
                <InputText
                    placeholder='name'
                    iconName=''
                    autoComplete='off'
                    textSecure={false}
                    showText={() => { }}
                    inputMode={'text'}
                    onDataChanged={handleName}
                />
                <InputText
                    placeholder='email'
                    iconName=''
                    autoComplete='email'
                    textSecure={false}
                    showText={() => { }}
                    inputMode={'email'}
                    onDataChanged={handleEmailChange}
                />
                <InputText
                    placeholder='phone number'
                    iconName=''
                    autoComplete='tel'
                    textSecure={false}
                    showText={() => { }}
                    inputMode={'tel'}
                    onDataChanged={handlePhoneNumber}
                />
                <InputText
                    placeholder='new password'
                    iconName='eye-outline'
                    autoComplete='off'
                    textSecure={isTextSecure}
                    showText={() => { setIsTextSecure(!isTextSecure) }}
                    hideText={() => { setIsTextSecure(!isTextSecure) }}
                    onDataChanged={handlePasswordChange}
                />
                <InputText
                    placeholder='confirm password'
                    iconName='eye-outline'
                    autoComplete='off'
                    textSecure={isTextSecure2}
                    showText={() => { setIsTextSecure2(!isTextSecure2) }}
                    hideText={() => { setIsTextSecure2(!isTextSecure2) }}
                    onDataChanged={handleConfirmPassword}
                />
                <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
                    <Text style={styles.btnTxt}>Signup</Text>
                </TouchableOpacity>
                <View style={styles.loginBody}> 
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginTxt}>Already have an account ? <Text style={{color:'blue'}}>Login</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        backgroundColor: COLORS.baseWhite,
        width: screenWidth - 50,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        padding: 15,
        justifyContent: 'center',
        elevation: 15
    },
    headTxt: {
        fontSize: 35,
        color: COLORS.baseWhite,
        fontWeight: 'bold',
        marginBottom: 10
    },
    headBody: {
        alignItems: 'flex-start',
        width: screenWidth - 50,
    },
    txtField: {
        borderColor: '#8213d6',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        color: COLORS.background2
    },
    btn: {
        borderRadius: 10,
        padding: 10,
        margin: 5,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    btnTxt: {
        color: COLORS.baseWhite,
        fontSize: 20,
        fontWeight: 'bold'
    },
    loginBody: {
        alignItems: 'center',
        marginTop: 15
    },
    loginTxt: {
        color: COLORS.background2
    }
})