import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { style } from '../../constants/styles';

type Props = {
    email?: string;
    name?: string;
    imageUrl?: string;
}

const ProfileCard = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imgIcon}>
                {props.imageUrl ?
                    <Image resizeMode='cover' source={{uri: props.imageUrl}}
                        style={styles.imgContainer}
                    />
                    :
                    <Image resizeMode='cover' source={require('../../assets/profileIcons/img_avatar1.png')}
                        style={styles.imgContainer}
                    />}
            </View>
            <View style={styles.details}>
                <Text style={style.txt_1}>{props.name}</Text>
                <Text style={style.txt_2}>{props.email}</Text>
            </View>
        </View>
    )
}

export default ProfileCard

