import { Alert, Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, TXT_SIZE } from '../constants'
import RoundButton from './RoundButton'
import { useNavigation } from '@react-navigation/native'
import AsyncStorageUtil from '../utils/services/LocalCache'
import ProfileModal from './modals/ProfileModal'
import { useDispatch } from 'react-redux'
import { Logout } from '../store/actions'


type Props = {
    title?: string;
    scanner?: boolean;
    notification?: boolean;
    onPressMenu?: () => void;
    onPressShare?: () => void;
    profile?: boolean;
    share?: boolean;
    back?: boolean;
    search?: boolean;
    menu?: boolean;
    menuClick?: () => void;
    scannerPress?: () => void;
    home?: boolean;
    homePress?: () => void;
}

const TopBar = (props: Props) => {
    const navigation: any = useNavigation()
    const [userData, setUserData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const platform = Platform.OS;
    const [isProfileModal, setIsProfileModal] = useState<boolean>(false);
    const dispatch: any = useDispatch()

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setIsLoading(true)
        try {
            const _userData = await AsyncStorageUtil.getData('user_details')
            if (_userData) {
                const _data: any = {
                    // name: _userData?.data?.displayName,
                    // email: _userData?.data?.email,
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

    const onProfileClick = () => {
        setIsProfileModal(false);
        navigation.navigate('Profile')
    };

    const onLogoutPress = () => {
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
                    onPress: () => logout(),
                },
            ],
            { cancelable: false }
        );
    };

    const logout = () => {
        setIsProfileModal(false);
        dispatch(Logout())
    };

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor={COLORS._background.primary} barStyle={'dark-content'} />
                <View style={styles.title_container}>
                    {props.back && (
                        <RoundButton
                            iconName={platform === 'ios' ? 'arrow-back-ios' : 'arrow-back'}
                            iconSize={28}
                            color={COLORS.text.default}
                            backgroundColor={COLORS._background.primary}
                            hapticFeedback={true}
                            onPress={() => { navigation.goBack() }}
                        />
                    )}
                    <Image
                        source={require('../assets/ci/logo.png')}
                        style={styles.logo}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.button_container}>
                    {props.search && (
                        <RoundButton
                            iconName='search'
                            iconSize={28}
                            color={COLORS.text.default}
                            backgroundColor={COLORS._background.primary}
                            hapticFeedback={true}
                            iconType='feather'
                            onPress={() => { navigation.navigate('Search') }}
                        />)}
                    {props.scanner && (
                        <RoundButton
                            iconName='scan'
                            iconType='ionicon'
                            iconSize={28}
                            color={COLORS.text.main}
                            backgroundColor={COLORS._background.primary}
                            hapticFeedback={true}
                            onPress={props.scannerPress}
                        />)}
                    {props.home && (
                        <RoundButton
                            iconName='home'
                            iconType='ionicon'
                            iconSize={28}
                            color={COLORS.text.main}
                            backgroundColor={COLORS._background.primary}
                            hapticFeedback={true}
                            onPress={props.homePress}
                        />)}
                    {props.share && (
                        <RoundButton
                            iconName='share-social'
                            iconSize={28}
                            color={COLORS.lightWhite}
                            backgroundColor={COLORS._background.primary}
                            hapticFeedback={true}
                            onPress={props.onPressShare}
                        />)}
                    {props.notification && (
                        <RoundButton
                            iconName="bell"
                            iconSize={28}
                            color={COLORS.text.default}
                            backgroundColor={COLORS._background.primary}
                            hapticFeedback={true}
                            iconType='feather'
                            onPress={() => { navigation.navigate('Notification') }}
                        />)}
                    {props.profile && (
                        <RoundButton
                            imageUrl={userData?.imgUrl ? userData?.imgUrl : 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'}
                            color={COLORS.lightWhite}
                            backgroundColor={COLORS._background.primary}
                            hapticFeedback={true}
                            onPress={()=>{setIsProfileModal(true)}}
                            border
                        />)}
                    {props.menu && (
                        <RoundButton
                            iconName="menu"
                            iconSize={28}
                            color={COLORS.text.main}
                            backgroundColor={COLORS._background.primary}
                            hapticFeedback={true}
                            onPress={props.menuClick}
                        />)}
                </View>
            </View>
            <ProfileModal
                isVisible={isProfileModal}
                onClose={() => {setIsProfileModal(false)}}
                onProfilePress={()=>{onProfileClick()}}
                onLogoutPress={()=>onLogoutPress()}
            />
        </>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        height: 68,
        backgroundColor: COLORS._background.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        elevation: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: TXT_SIZE.XXL,
        color: COLORS.baseWhite,
        marginLeft: 5,
        marginBottom: 10,
        textTransform: 'capitalize'
    },
    button_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -8
    },
    logo: {
        height: 27.84,
        width: 150,
        marginLeft: 10
    }
})