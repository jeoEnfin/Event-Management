import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity,Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../constants'
import RoundButton from '../../components/RoundButton';
import { useNavigation } from '@react-navigation/native';
import InputText from '../../components/InputText';
import { isValidEmail, isValidPassword } from '../../utils/validations';


import { GoogleSignin } from '@react-native-google-signin/google-signin';
import googleConfig from '../../utils/services/GoogleSigninConfig';
import { useDispatch } from 'react-redux';
import { Login } from '../../store/actions';




const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

type Props = {}

const LoginScreen = (props: Props) => {
    const navigation: any = useNavigation()
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isTextSecure, setIsTextSecure] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    const [errorPassword, setErrorPassword] = useState<boolean>(false);
    const platformName = Platform.OS; 

    

    useEffect(() => {
      googleConfig();
      }, []);

    const handleEmailChange = (newEmail: string) => {
        const isEmailValid = isValidEmail(newEmail);
        if (isEmailValid) {
            setUsername(newEmail.toLowerCase())
            setErrorEmail(false)
            setError(false)
        } else {
            setErrorEmail(true);
            setError(true);
        }
    };

    const handlePasswordChange = (newPassword: string) => {
        const isPasswordValid = isValidPassword(newPassword);
        if (isPasswordValid) {
            setPassword(newPassword);
            setErrorPassword(false)
            setError(false)
        }
        else {
            setErrorPassword(true);
            setError(true)
        }
    };

    const validation = () => {
        if (username.length === 0 || password.length === 0){
            setErrorEmail(true);
            setErrorPassword(true)
            setError(true);
        }
        else if (username.length === 0) {
            setErrorPassword(true)
            setError(true);
        }
        else if (password.length === 0) {
            setErrorPassword(true)
            setError(true);
        }
        else if (errorEmail === true && errorPassword === true) {
            setError(true)
        }
        else {
            setError(false)
        }
    }

    const handleLogin = () => {
        //console.log('check1',username,password);
        validation();
        if (username != null && password != null) {
            console.log('check2')
            dispatch(Login(username, password))
            // navigation.navigate('TFA', { username: email , password: password})
            setUsername('');
            setPassword('');
            
        } else {
            Alert.alert('Invalid Credentials', 'username or password is invalid', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            setError(true)
        }
    }

    const googleLoginHandler = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo.idToken)
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headBody}>
                <Text style={styles.headTxt}>Login.</Text>
            </View>
            <View style={styles.body}>
                <InputText
                    placeholder='email'
                    autoComplete='email'
                    textSecure={false}
                    showText={() => { }}
                    inputMode={'email'}
                    onDataChanged={handleEmailChange}
                    //value={email}
                    error={errorEmail}
                />
                <InputText
                    placeholder='password'
                    iconName='eye-outline'
                    autoComplete='new-password'
                    textSecure={isTextSecure}
                    showText={() => { setIsTextSecure(!isTextSecure) }}
                    hideText={() => { setIsTextSecure(!isTextSecure) }}
                    onDataChanged={handlePasswordChange}
                    keyboardType={'default'}
                    //value={password}
                    error={errorPassword}
                />
                {error && <Text style={styles.errorTxt}>Enter valid details</Text>}
                <TouchableOpacity style={styles.btn} onPress={() => {handleLogin()}}>
                    <Text style={styles.btnTxt}>Login</Text>
                </TouchableOpacity>
                <View style={styles.forgotBody}>
                    <TouchableOpacity>
                        <Text style={styles.fgtTxt}>Forgot password</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.socialBtn}>
                    
                    <RoundButton
                        iconName='logo-google'
                        iconSize={28}
                        color={COLORS.baseWhite}
                        backgroundColor={COLORS.background}
                        hapticFeedback={true}
                        onPress={() => {googleLoginHandler()}}
                    />
                    {platformName === 'ios' && <RoundButton
                        iconName='logo-apple'
                        iconSize={28}
                        color={COLORS.baseWhite}
                        backgroundColor={COLORS.background}
                        hapticFeedback={true}
                        onPress={() => { }}
                    />}
                </View>
                <View style={styles.signupBody}>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupTxt}>Don't have an account ? <Text style={{color:'blue'}}>Signup</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen

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
    },
    btnTxt: {
        color: COLORS.baseWhite,
        fontSize: 20,
        fontWeight: 'bold'
    },
    forgotBody: {
        alignItems: 'flex-end',
        margin: 5,
    },
    fgtTxt: {
        color: COLORS.background2,
        fontSize: 12
    },
    socialBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    signupBody: {
        alignItems: 'center',
        marginTop: 15
    },
    signupTxt: {
        color: COLORS.background2
    },
    errorTxt: {
        color: COLORS.redButton,
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '500'
    }
})