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
    const navigation:any = useNavigation();

    useEffect(() => {
        getData();
    }, [])

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
                    text: 'OK',
                    onPress: () => dispatch(Logout()),
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
                    text: 'OK',
                    onPress: () => {},
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

    return (
        <ScreenWrapper>
            <TopBar notification />
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
                    <View style={styles.editIcon}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Edit Profile')}}>
                            <Icon name='edit' type={'feather'} size={30} color={COLORS.secondary.main} />
                        </TouchableOpacity>
                    </View>
                    <ProfileCard
                        imageUrl={userData ? userData?.imgUrl : ''}
                        email={userData ? userData?.email : ''}
                        name={userData ? userData?.name: ''}
                    />
                     <View style={styles.divider}></View>
                    <View style={styles.fav_Container}>
                        <TouchableOpacity style={styles.fav_Body} onPress={()=>{navigation.navigate('Favorites')}}>
                            <Ionicons name={'star'} size={25} color={'#F7CA69'} />
                            <Text style={styles.fav_Text}>Favourite Contacts</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.logout_Container}>
                        <TouchableOpacity style={styles.fav_Body} onPress={() => {navigation.navigate('Reset Password')}}>
                            <Icon name={'lock-reset'} size={30} color={COLORS.secondary.main} />
                            <Text style={styles.fav_Text}>Reset password</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.logout_Container}>
                        <TouchableOpacity style={styles.fav_Body} onPress={() => handleLogout()}>
                            <Icon name={'logout'} size={30} color={COLORS.secondary.main} />
                            <Text style={styles.fav_Text}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider}></View>
                    {userData && <QRCode data={ userData} />}
                    <View style={styles.divider}></View>
                    <View style={styles.delete_account_Container}>
                        <TouchableOpacity style={styles.delete_Body} onPress={()=>handleDeleteAccount()}>
                            <Icon name={'delete-outline'} size={30} color={COLORS.text.error} />
                            <Text style={styles.delete_Text}>Delete Account</Text>
                        </TouchableOpacity>
                    </View>
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

