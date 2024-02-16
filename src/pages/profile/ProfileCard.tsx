import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { style } from '../../constants/styles';
import RoundButton from '../../components/RoundButton';
import { COLORS } from '../../constants';

type Props = {
    username?: string;
    name?: string;
    discription?: string;
}

const ProfileCard = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imgIcon}>
                <Image resizeMode='cover' source={require('../../assets/profileIcons/img_avatar1.png')}
                    style={styles.imgContainer}
                />
            </View>
            <View style={styles.details}>
                <Text style={style.txt_1}>{props.name?.toUpperCase()}</Text>
                <Text style={style.txt_2}>{props.username}</Text>
                <Text
                    numberOfLines={2} ellipsizeMode="tail"
                    style={style.txt_2}>{props.discription}</Text>
            </View>
        </View>
    )
}

export default ProfileCard

