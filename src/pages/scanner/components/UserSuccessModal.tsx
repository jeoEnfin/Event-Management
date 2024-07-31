import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SlideUpModal from '../../../components/common/SlideUpModal'
import ProfileCard from '../../profile/ProfileCard';
import { COLORS } from '../../../constants';
import { format } from 'date-fns';

type Props = {
    isModalVisible: boolean;
    toggleModal: () => void;
    userData?: any;
    eventName?: string;
    eventStartDate?: string;
    eventEndDate?: string;
}

const UserSuccessModal = ({
    isModalVisible,
    toggleModal,
    userData,
    eventName,
    eventEndDate,
    eventStartDate
}: Props) => {
    return (
        <SlideUpModal isVisible={isModalVisible} onClose={toggleModal}>
            <View style={styles.container}>
                <View style={styles.headerTextContainer}>
                    <Image source={require('../../../assets/ci/sucessfull.png')} style={{ width: 38, height: 38 }} />
                    <Text style={styles.headerText}>Attendance successfully marked</Text>
                </View>
                {userData && <ProfileCard
                    name={`${userData?.firstName} ${userData?.lastName}`}
                    email={userData?.email}
                    imageUrl={userData?.userImage}
                />}
                <View>
                    {eventName && <View style={styles.eventDetails}>
                        <Text style={styles.text3}>Event Name:</Text>
                        <Text style={styles.text2}>{eventName}</Text>
                    </View>}
                    {eventStartDate && eventEndDate && <View style={styles.eventDetails}>
                        <Text style={styles.text3}>Event Date:</Text>
                        <Text style={styles.text2}>{format(eventStartDate, 'dd MMMM yyyy')} - {format(eventEndDate, 'dd MMMM yyyy')}</Text>
                    </View>}
                </View>
            </View>
        </SlideUpModal>
    )
}

export default UserSuccessModal

const styles = StyleSheet.create({
    headerTextContainer: {
        alignItems: 'center',
        gap: 10
    },
    headerText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#58C250'
    },
    container: {
        paddingVertical: 25,
        alignItems: 'center'
    },
    text3: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.text.main
    },
    eventDetails: {
        alignItems: 'center',
        gap: 5,
        marginVertical: 10
    },
    text2: {
        fontSize: 12,
        fontWeight: '400',
        color: COLORS.text.main,
        marginTop: 2
    }
})