import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
    imageUrl: string;
    onClick?: () => void;
}

const CustomIconButton = (props: Props) => {
    return (
        <TouchableOpacity 
        onPress={props.onClick}
        style={styles.container}>
            <View  style={{overflow: 'hidden'}} >
                <Image
                    source={{ uri: props.imageUrl }} // Replace with your image URL
                    style={styles.avatar}
                    alt='no image'
                    resizeMode='contain'
                />
            </View>
        </TouchableOpacity>
    )
}

export default CustomIconButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 25
    },
    avatar: {
        width: 25, // Adjust size as needed
        height: 25,
        borderRadius: 50, 
    },
})