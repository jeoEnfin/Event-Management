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
    const {url} = route.params
    const Url = parse(url, true);

    return (
        <ScreenWrapper>
            <TopBar title={Url.host} home scanner />
            <View style={styles.container}>
                <Text style={[style.txt_1, { marginBottom: 20 }]}>{url}</Text>
                <Button title='Join Event'
                    onPress={() => { navigation.navigate('Test2', { url }) }} />
            </View>
        </ScreenWrapper>
    )
}

export default ScanReader

