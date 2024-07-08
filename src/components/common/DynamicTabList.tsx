import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import TabItem from './TabItem';


interface Tab {
    id: string;
    date: string;
}

type TabType = {
    tabs: any[];
    onDateClick?: (data: any) => void;
}


const DynamicTabList = ({ tabs, onDateClick }: TabType) => {
    const [selectedTab, setSelectedTab] = useState<string | null>(null);

    useEffect(() => {
        if (tabs.length !== 0) {
            if (tabs[0].id) {
                setSelectedTab(tabs[0].id);
            }
        }
    }, [tabs])

    const handleTabPress = (item: Tab) => {
        setSelectedTab(item.id);
        if (item.id) {
            onDateClick?.(new Date(item.id));
        }
    };

    const renderItem = ({ item, index }: { item: Tab, index: number }) => (
        <TabItem
            item={item}
            day={index + 1}
            onPress={handleTabPress}
            isSelected={selectedTab === item.id}
        />
    );

    return (
        <>
            <FlatList
                data={tabs}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedTab}
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
