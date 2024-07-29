import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'
import parse from 'url-parse';
import { styles } from './styles';
import { style } from '../../constants/styles';

type Props = {
    route: any;
    navigation: any;
}

const ScanReader = ({ route, navigation }: Props) => {
    const { data , tenant  } = route.params


    return (
        <ScreenWrapper>
            <TopBar scanner />
            <View style={styles.container}>
                <Text style={[style.txt_1, { marginBottom: 20 }]}>{data && data}{tenant}</Text>
                <Button title='retake'
                    onPress={() => { navigation.goBack(); }} />
            </View>
        </ScreenWrapper>
    )
}

export default ScanReader

