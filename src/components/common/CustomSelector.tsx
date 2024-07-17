import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { COLORS } from '../../constants';

interface Option {
    label: string;
    value: string | number;
}

interface CustomSelectorProps {
    label?: string;
    placeholder?: string;
    options: any[];
    onValueChange: (value: string | number) => void;
    selectedValue?: string | number;
    errorText?: string;
}

const CustomSelector: React.FC<CustomSelectorProps> = ({
    label,
    placeholder,
    options,
    onValueChange,
    selectedValue,
    errorText,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSelect = (value: string | number) => {
        onValueChange(value);
        setIsModalVisible(false);
    };

    const dataArray = Object.keys(options).map((key: any) => ({
        key,
        value: options[key]
    }));

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.selector, isFocused && styles.focusedSelector]}
                onPress={() => setIsModalVisible(true)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                <Text style={selectedValue ? styles.selectedText : styles.placeholderText}>
                    {selectedValue ? dataArray.find(option => option.value === selectedValue)?.value : placeholder}
                </Text>
            </TouchableOpacity>
            {label && <Text style={styles.label}>{label}</Text>}
            {errorText && <Text style={styles.errorText}>{errorText}</Text>}
            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={dataArray}
                            keyExtractor={(item) => item.key.toString()}
                            renderItem={({ item }:any) => (
                                <TouchableOpacity style={styles.option} onPress={() => handleSelect(item.value)}>
                                    <Text style={styles.optionText}>{item?.value}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 12,
        marginBottom: 5,
        color: COLORS.text.main,
        fontWeight: '400',
        position: 'absolute',
        top: -11,
        left: 8,
        padding: 2,
        backgroundColor: '#ffffff'
    },
    selector: {
        height: 50,
        borderColor: COLORS.text.secondary,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    focusedSelector: {
        borderColor: '#6200ee',
    },
    errorSelector: {
        borderColor: 'red',
    },
    placeholderText: {
        color: '#999',
    },
    selectedText: {
        color: COLORS.text.main,
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 8,
        padding: 20,
    },
    option: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        fontSize: 16,
        color: COLORS.text.main
    },
    closeButton: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#6200ee',
        fontSize: 16,
    },
});

export default CustomSelector;
