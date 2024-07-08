import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants';

interface TabItemProps {
    item: { id: string; date: string };
    day?: number;
    onPress: (item: { id: string; date: string }) => void;
    isSelected: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ item, onPress, isSelected, day }) => (
    <TouchableOpacity
        style={[styles.tabItem]}
        onPress={() => onPress(item)}
    >
        <View style={{padding: 2,alignItems: 'center'}}>
            <Text style={[styles.tabHeadText, isSelected && {color: COLORS.text.main}]}>DAY {day}</Text>
            <Text style={[styles.tabText,isSelected && {color: COLORS.text.main}]}>{item.date}</Text>
        </View>
        <View style={[styles.bottom,isSelected && {backgroundColor: COLORS.secondary.main}]}></View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    tabItem: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 7
    },
    selectedTabItem: {
        backgroundColor: '#007bff',
    },
    tabText: {
        fontSize: 12,
        fontWeight: '600'
    },
    tabHeadText: {
        fontSize: 22,
        fontWeight: '700'
    },
    bottom: {
        height: 8,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
});

export default TabItem;
