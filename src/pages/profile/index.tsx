import { Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'
import ProfileCard from './ProfileCard'
import { useDispatch } from 'react-redux'
import { Logout } from '../../store/actions'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants'
import QRCode from './QRCode'
import AsyncStorageUtil from '../../utils/services/LocalCache'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import { CacheIndex } from '../../utils/services/CacheIndex'

type Props = {}

const Profile = (props: Props) => {
    const dispatch: any = useDispatch();
    const [userData, setUserData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigation: any = useNavigation();
    const [isToken, setIsToken] = useState<boolean>(true)

    useEffect(() => {
        getData();
        getToken();
    }, [])

    const getToken = async () => {
        const token = await AsyncStorageUtil.getData('token')
        if (token) {
            setIsToken(true)
        } else {
            setIsToken(false)
        }
    }

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => dispatch(Logout()),
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    }

    const handleDeleteAccount = async () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to Delete Account?',
            [
                {
                    text: 'Delete',
                    onPress: () => { },
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
    }

    const getData = async () => {
        const token = await AsyncStorageUtil.getData('token');
        if (!token) {
            Alert.alert('Login Required','Log in or sign up to unlock your personalized journey! Seamlessly view and attend events, both online and offline.',[
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Login',
                    onPress: () => { dispatch(Logout()) },
                }
            ]);
            return;
        }
        setIsLoading(true)
        try {
            const _userData = await AsyncStorageUtil.getData('userData')
            if (_userData) {
                const _data = {
                    name: _userData?.data?.displayName,
                    email: _userData?.data?.email,
                    uuid: _userData?.uuid,
                    imgUrl: _userData?.data?.userImage
                }
                setUserData(_data)
            }
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
        }
    }

    const handleEditProfile = async () => {
        const token = await AsyncStorageUtil.getData('token');
        if (!token) {
            Alert.alert('Login Required','Log in or sign up to unlock your personalized journey! Seamlessly view and attend events, both online and offline.',[
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Login',
                    onPress: () => { dispatch(Logout()) },
                }
            ]);
            return;
        } else {
            navigation.navigate('Edit Profile')
        }
    }

    const handleResetPassword = async () => {
        const token = await AsyncStorageUtil.getData('token');
        if (!token) {
            Alert.alert('Login Required','Log in or sign up to unlock your personalized journey! Seamlessly view and attend events, both online and offline.',[
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Login',
                    onPress: () => { dispatch(Logout()) },
                }
            ]);
            return;
        } else {
            navigation.navigate('Reset Password')
        }
    }

    const handleFavouriteContacts = async () => {
        const token = await AsyncStorageUtil.getData('token');
        if (!token) {
            Alert.alert('Login Required','Log in or sign up to unlock your personalized journey! Seamlessly view and attend events, both online and offline.',[
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Login',
                    onPress: () => { dispatch(Logout()) },
                }
            ]);
            return;
        } else {
            navigation.navigate('Favorites')
        }
    }

    return (
        <ScreenWrapper>
            <TopBar notification={isToken ? true : false} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => getData()}
                        colors={[COLORS.secondary.main]}
                    />
                }
                style={{ width: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                    {isToken && <View style={styles.editIcon}>
                        <TouchableOpacity onPress={() => { handleEditProfile() }}>
                            <Icon name='edit' type={'feather'} size={30} color={COLORS.secondary.main} />
                        </TouchableOpacity>
                    </View>}
                    <ProfileCard
                        imageUrl={userData ? userData?.imgUrl : ''}
                        email={userData ? userData?.email : ''}
                        name={userData ? userData?.name : 'Guest User'}
                    />
                    <View style={styles.divider}></View>
                    {isToken && <><View style={styles.fav_Container}>
                        <TouchableOpacity style={styles.fav_Body} onPress={() => { handleFavouriteContacts() }}>
                            <Ionicons name={'star'} size={25} color={'#F7CA69'} />
                            <Text style={styles.fav_Text}>Favourite Contacts</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={styles.divider}></View></>}
                    {isToken && <><View style={styles.logout_Container}>
                        <TouchableOpacity style={styles.fav_Body} onPress={() => { handleResetPassword() }}>
                            <Icon name={'lock-reset'} size={30} color={COLORS.secondary.main} />
                            <Text style={styles.fav_Text}>Reset password</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={styles.divider}></View></>}
                    <View style={styles.logout_Container}>
                        <TouchableOpacity style={styles.fav_Body} onPress={() => handleLogout()}>
                            <Icon name={'logout'} size={30} color={COLORS.secondary.main} />
                            <Text style={styles.fav_Text}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider}></View>
                    {userData && <QRCode data={userData} />}
                    <View style={styles.divider}></View>
                    {isToken && <View style={styles.delete_account_Container}>
                        <TouchableOpacity style={styles.delete_Body} onPress={() => handleDeleteAccount()}>
                            <Icon name={'delete-outline'} size={30} color={COLORS.text.error} />
                            <Text style={styles.delete_Text}>Delete Account</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
            </ScrollView>
        </ScreenWrapper>
    )
}

export default Profile

const styles = StyleSheet.create({
    fav_Container: {
        width: '85%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fav_Text: {
        color: COLORS.text.main,
        fontSize: 16,
        fontWeight: '600'
    },
    fav_Body: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    logout_Container: {
        width: '85%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    delete_account_Container: {
        width: '85%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    delete_Text: {
        color: COLORS.text.error,
        fontSize: 18,
        fontWeight: '700'
    },
    delete_Body: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    editIcon: {
        position: 'absolute',
        right: 0,
        margin: 15
    },
    divider: {
        width: '85%',
        height: 2,
        backgroundColor: COLORS._background.secondary,
        opacity: 0.2
    }
})

