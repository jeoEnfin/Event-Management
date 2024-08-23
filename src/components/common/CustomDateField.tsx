import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../constants';

interface CustomDateTimePickerProps {
    label?: string;
    placeholder?: string;
    mode?: 'date' | 'time' | 'datetime';
    onChange?: (date: Date) => void;
    value?: Date;
    helperText?: string;
    customErrorText?: string;
    validationType?: 'any' | 'futureDate' | 'pastDate'
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
    label,
    placeholder,
    mode = 'date',
    onChange,
    value,
    helperText,
    customErrorText,
    validationType = 'any',
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
    const [error, setError] = useState<string>('');

    const handleFocus = () => {
        if (mode === 'date' || mode === 'datetime') {
            setShowDatePicker(true);
        }
        else {
            setShowTimePicker(true);
        }
    };

    const handleBlur = () => {
        setShowPicker(false);
        validate(selectedDate);
    };

    const validate = (date: Date | undefined) => {
        let errorMessage = '';
        // Add custom validation logic here if needed, e.g., future/past date
        setError(errorMessage);
    };

    const handleDateChange = (event: any, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
            if (date) {
                setSelectedDate(date);
                if (mode === 'datetime') {
                    setShowTimePicker(true);
                } else {
                    onChange && onChange(date); 
                }
            }
        } else {
            if (date) {
                setSelectedDate(date);
                onChange && onChange(date);
            }
            setShowDatePicker(Platform.OS === 'ios');
        }
    };

    const handleTimeChange = (event: any, time?: Date) => {
        setShowTimePicker(false);
        if (time && selectedDate) {
            const finalDateTime = new Date(selectedDate);
            finalDateTime.setHours(time.getHours());
            finalDateTime.setMinutes(time.getMinutes());
            setSelectedDate(finalDateTime);
            onChange && onChange(finalDateTime);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handleFocus}
                style={[styles.input, showPicker && styles.focusedInput]}
            >
                <Text style={{ color: selectedDate ? COLORS.text.main : '#999' }}>
                    {selectedDate ? mode === 'datetime' ? selectedDate.toLocaleString() :
                        mode === 'date' ? selectedDate.toLocaleDateString() :
                            selectedDate.toLocaleTimeString() :
                        placeholder || 'Select Date'}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode='date'
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={validationType === 'futureDate' ? new Date() : undefined }
                    maximumDate={validationType === 'pastDate' ? new Date() : undefined}
                //onBlur={handleBlur}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode='time'
                    display="default"
                    onChange={handleTimeChange}
                //onBlur={handleBlur}
                />
            )}


            {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {label && <Text style={[styles.label, showPicker && { color: COLORS.secondary.main }]}>{label}</Text>}
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
        color: COLORS.text.secondary,
        fontWeight: '500',
        position: 'absolute',
        top: -11,
        left: 8,
        padding: 2,
        backgroundColor: COLORS._background.main,
    },
    input: {
        height: 54,
        justifyContent: 'center',
        borderColor: COLORS.text.secondary,
        borderWidth: 1.5,
        borderRadius: 4,
        paddingHorizontal: 10,
        color: COLORS.text.main,
    },
    focusedInput: {
        borderColor: COLORS.secondary.main,
    },
    errorInput: {
        borderColor: 'red',
    },
    helperText: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
    },
});

export default CustomDateTimePicker;