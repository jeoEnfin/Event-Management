import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants';

interface TabItemProps {
    item: { id: string; date: string };
    day?: number;
    onPress: (item: { id: string; date: string }) => void;
    isSelected: boolean;
    onLayout?: (data:any)=>void;
}

const TabItem: React.FC<TabItemProps> = ({ item, onPress, isSelected, day,onLayout }) => (
    <TouchableOpacity
        style={[styles.tabItem]}
        onPress={() => onPress(item)}
        onLayout={onLayout}
    >
        <View style={{padding: 2,alignItems: 'center',marginVertical: 12}}>
            <Text style={[styles.tabHeadText, isSelected ? {color: COLORS.text.main} : {color: COLORS.text.default,opacity: 0.7}]}>DAY {day}</Text>
            <Text style={[styles.tabText,isSelected ? {color: COLORS.text.main}: {color: COLORS.text.default,opacity: 0.7}]}>{item.date}</Text>
        </View>
        <View style={[styles.bottom,isSelected && {backgroundColor: COLORS.secondary.main}]}></View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    tabItem: {
        // paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 7,
        marginHorizontal: 5,
        width: 87
    },
    selectedTabItem: {
        backgroundColor: '#007bff',
    },
    tabText: {
        fontSize: 11,
        fontWeight: '600',
    },
    tabHeadText: {
        fontSize: 18,
        fontWeight: '700'
    },
    bottom: {
        height: 6,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        bottom: 0
    }
});

export default TabItem;
