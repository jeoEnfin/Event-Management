import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import TabItem from './TabItem';
import { isToday } from 'date-fns';
import { COLORS } from '../../constants';


interface Tab {
    id: string;
    date: string;
}

type TabType = {
    tabs: any[];
    onDateClick?: (data: any) => void;
}


const DynamicTabList = ({ tabs, onDateClick }: TabType) => {
    const flatListRef: any = useRef(null);
    const [selectedTab, setSelectedTab] = useState<string | null>(null);
    const [itemHeights, setItemHeights] = useState<Record<string, number>>({});
    const [selectedIndex, setSelectedIndex] = useState(tabs.length || 0);

    useEffect(() => {
        if (tabs.length !== 0) {
            const todayTab = tabs.find(tab => isToday(new Date(tab.id)));
            if (todayTab) {
                const todayTabIndex = tabs.findIndex(tab => tab.id === todayTab.id);
                setSelectedTab(todayTab.id);
                onDateClick?.(new Date(todayTab.id));
                setSelectedIndex(todayTabIndex);
            } else {
                setSelectedTab(tabs[0].id);
                onDateClick?.(new Date(tabs[0].id));
                setSelectedIndex(0)
            }
        }
    }, [tabs])

    useEffect(() => {
        if (flatListRef.current && Object.keys(itemHeights).length === tabs.length) {
          let offset = 0;
          for (let i = 0; i < selectedIndex; i++) {
            offset += itemHeights[i] || 0;
          }
          flatListRef.current.scrollToOffset({ offset, animated: true });
        }
      }, [itemHeights]);

      const handleLayout = (event:any, index:any) => {
        const { height } = event.nativeEvent.layout;
        setItemHeights((prevHeights) => ({ ...prevHeights, [index]: height }));
      };  

    const handleTabPress = (item: Tab) => {
        setSelectedTab(item.id);
        if (item.id) {
            onDateClick?.(new Date(item.id));
        }
    };

    const renderItem = ({ item, index }: { item: Tab, index: number }) => (
        <TabItem
            key={item.id}
            item={item}
            day={index + 1}
            onPress={handleTabPress}
            isSelected={selectedTab === item.id}
            onLayout={(event:any) => handleLayout(event, index)}
        />
    );

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={tabs}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedTab}
                style={{
                    backgroundColor: COLORS._background.primary,
                    marginBottom: 16,
                    borderRadius: 6,
                    height: 64
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default DynamicTabList;
