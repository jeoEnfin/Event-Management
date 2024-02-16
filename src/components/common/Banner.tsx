import { Image, StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { BANNER_DATA } from '../../constants/demoData';

const screenWidth = Dimensions.get("window").width;

type Props = {
    event_url?: string;
    banner_Data?: any;
}

type ItemProps = {
    id: number;
    url: string;
}

const Banner = (props: Props) => {

    const flatListRef:any = useRef(null);
    const scrollInterval:any = useRef(null);

    useEffect(() => {
      startAutoScroll();
      return () => clearInterval(scrollInterval.current);
    }, []);
  
    const startAutoScroll = () => {
      scrollInterval.current = setInterval(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, 3000);
    };

    const Item = ({ id, url }: ItemProps) => {
        return (
            <View
                style={{
                    width: screenWidth,
                    borderRadius: 10,
                    overflow: 'hidden',
                    padding: 5
                }}>
                <Image
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    resizeMode='stretch'
                    source={{ uri: url }}
                    alt='No image'
                />
            </View>
        )
    }

    return (
        <View style={{
            width: screenWidth,
            height: '35%',
        }}>
            <FlatList
                ref={flatListRef}
                data={BANNER_DATA}
                renderItem={({ item }) =>
                    <Item
                        id={item.banner_id}
                        url={item.banner_url}
                    />
                }
                horizontal={true}
                keyExtractor={(item: any) => item.banner_id}
                style={{ width: screenWidth }}
            />
        </View>
    )
}

export default Banner

const styles = StyleSheet.create({})