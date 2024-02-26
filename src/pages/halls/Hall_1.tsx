import {Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'
import ScreenWrapper from '../../components/ScreenWrapper';
import TopBar from '../../components/TopBar';
import { FlatList } from 'react-native';
import { COLORS, TXT_SIZE } from '../../constants';
import RoundButton from '../../components/RoundButton';
import EventCardList from '../../components/common/EventCardList';
import { DATA } from '../../constants/demoData';
import HallsCardList from '../../components/halls/HallsCardList';
import ActivityElement from '../../components/common/ActivityElement';

const width = Dimensions.get('window').width;

type Props = {
    route: any;
}

const Hall_1 = ({ route }: Props) => {
    const { url, title, data, halls_data } = route.params;

    const VideoPlayer = () => {
        const [loading,setLoading] = useState<boolean>(true)  
        return (
            <View style={{ width: width, height: 250,flex:1}}>
                <WebView
                    style={{ backgroundColor: 'transparent'}}
                    source={{ uri: url }}
                    javaScriptEnabled={true}
                    allowsFullscreenVideo={true}
                    onMessage={data => console.log('video data', data)}
                    onLoadEnd={()=>setLoading(false)}
                />
                {loading && <ActivityElement/>}
            </View>
        )
    }

    const About = () => {
        return (
            <View style={styles.about_container}>
                <Text style={styles.about_title}>{title.toUpperCase()}</Text>
                <Text
                    numberOfLines={3}
                    style={styles.about_description}>{data.audi_description}</Text>
                <View style={styles.about_button_container} >
                    <RoundButton
                        label='Watchlist'
                        iconName='add'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.background}
                        hapticFeedback={true}
                        onPress={() => { }}
                    />
                    <RoundButton
                        label='Like'
                        iconName='thumbs-up-outline'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.background}
                        hapticFeedback={true}
                        onPress={() => { }}
                    />
                    <RoundButton
                        label='Share'
                        iconName='share-social-outline'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.background}
                        hapticFeedback={true}
                        onPress={() => { }}
                    />
                    <RoundButton
                        label='Download'
                        iconName='download-outline'
                        iconSize={28}
                        color={COLORS.lightWhite}
                        backgroundColor={COLORS.background}
                        hapticFeedback={true}
                        onPress={() => { }}
                    />
                </View>
            </View>
        )
    }


    const ItemData = [
        <VideoPlayer />,
        <About />,
        <HallsCardList
            title='Halls ...'
            data={halls_data} />,
        <EventCardList
            title='More events like this ...'
            data={DATA}
        />
    ]

    return (
        <ScreenWrapper>
            <TopBar title={title} home back />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={ItemData}
                renderItem={({ item }) => item}
                keyExtractor={(_, index) => index.toString()}
            />
        </ScreenWrapper>
    )
}

export default Hall_1

const styles = StyleSheet.create({
    about_container: {
        margin: 5,
        width: width
    },
    about_title: {
        marginLeft: 10,
        fontSize: TXT_SIZE.XXL,
        fontWeight: 'bold',
        color: COLORS.text_color
    },
    about_description: {
        marginLeft: 10,
        color: COLORS.text_color,
        fontSize: TXT_SIZE.M,
        fontWeight: '200',
    },
    about_button_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12
    }
})