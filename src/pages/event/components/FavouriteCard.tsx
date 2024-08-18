import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { COLORS } from '../../../constants'

type Props = {
    item: any,
    toggleFavorite: (id: string) => void,
}

const FavouriteCard = ({
    item,
    toggleFavorite
}: Props) => {
    return (
        <View style={styles.itemContainer}>
            <Image
                source={{ uri: item.avatar }}
                style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            <Pressable onPress={() => toggleFavorite(item.id)}>
                <Icon
                    name={item.isFavorite ? 'star' : 'star'}
                    size={28}
                    color={item.isFavorite ? '#F7CA69' : 'gray'}
                    type='vectoicon'
                />
            </Pressable>
        </View>
    )
}

export default FavouriteCard

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
    },
    name: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: COLORS.text.main,
        fontWeight: '400'
    }
})