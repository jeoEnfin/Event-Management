import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import RenderHtml from 'react-native-render-html';

type Props = {
    title?: string;
    data?: any
}

const screenWidth = Dimensions.get("window").width;

const PolicesCard = ({ title, data }: Props) => {

    if (!data) {
        return null
    }

    return (
        <View style={{ width: '100%', marginTop: 30 }}>
            <Text style={{
                fontWeight: '600',
                fontSize: 16,
                color: COLORS.text.main,
                marginBottom: 5
            }}>{title}</Text>
            <View>
                <RenderHtml 
                 contentWidth={screenWidth}
                 source={{html: data}}
                />
            </View>
        </View>
    )
}

export default PolicesCard

const styles = StyleSheet.create({})