import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'
import ProfileCard from './ProfileCard'
import ReportCard from './ReportCard'
import DropDownMenu from './DropDownMenu'
import { useDispatch } from 'react-redux'
import { Logout } from '../../store/actions'

type Props = {}

const Profile = (props: Props) => {
    const [isVisible, setIsVisible] = useState(false); 

    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(Logout())
        setIsVisible(false);
    }

    return (
        <ScreenWrapper>
            <TopBar title='Profile' profile onPressMenu={() => setIsVisible(!isVisible)} share />
            <ScrollView style={{ width: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                    <ProfileCard
                        username='jeo123'
                        name='jeo thanakachan'
                        discription='nothing'
                    />
                    <ReportCard
                        events={1300}
                        participant={1000}
                        created={5}
                    />
                </View>
            </ScrollView>
            <DropDownMenu
                isVisible={isVisible}
                onRequestClose={() => setIsVisible(false)}
                logoutPress={handleLogout}
            />
        </ScreenWrapper>
    )
}

export default Profile

