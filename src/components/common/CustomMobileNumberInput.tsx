import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants';

interface Country {
  name: string;
  code: string;
  dial_code: string;
}

interface MobileNumberInputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  customErrorText?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const countries: Country[] = [
  { name: 'United States', code: 'US', dial_code: '+1' },
  { name: 'India', code: 'IN', dial_code: '+91' },
  { name: 'Canada', code: 'CA', dial_code: '+1' },
  { name: 'United Kingdom', code: 'GB', dial_code: '+44' },
  { name: 'Australia', code: 'AU', dial_code: '+61' },
  { name: 'Germany', code: 'DE', dial_code: '+49' },
  { name: 'France', code: 'FR', dial_code: '+33' },
  { name: 'Brazil', code: 'BR', dial_code: '+55' },
  { name: 'China', code: 'CN', dial_code: '+86' },
  { name: 'Japan', code: 'JP', dial_code: '+81' },
  { name: 'Russia', code: 'RU', dial_code: '+7' },
  { name: 'South Africa', code: 'ZA', dial_code: '+27' },
  { name: 'Mexico', code: 'MX', dial_code: '+52' },
  { name: 'South Korea', code: 'KR', dial_code: '+82' },
  { name: 'Italy', code: 'IT', dial_code: '+39' },
  { name: 'Spain', code: 'ES', dial_code: '+34' },
  { name: 'Netherlands', code: 'NL', dial_code: '+31' },
  { name: 'Turkey', code: 'TR', dial_code: '+90' },
  { name: 'Saudi Arabia', code: 'SA', dial_code: '+966' },
  // Add more countries as needed
];

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
  label,
  placeholder,
  helperText,
  customErrorText,
  value,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(value || '');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer,isFocused && {borderColor: COLORS.secondary.main}]}>
        <TouchableOpacity style={styles.countrySelector} onPress={() => setModalVisible(true)}>
          <Text style={styles.countryText}>{selectedCountry.dial_code}</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, isFocused && styles.focusedInput]}
          placeholder={placeholder || 'Enter your mobile number'}
          placeholderTextColor="#999"
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType="phone-pad"
          onChangeText={(text) => {
            setPhoneNumber(text);
            onChangeText && onChangeText(`${selectedCountry.dial_code}${text}`);
          }}
          value={phoneNumber}
        />
      </View>
      {label && (
        <Text style={[styles.label, isFocused && { color: COLORS.secondary.main }]}>
          {label}
        </Text>
      )}
      {helperText && !customErrorText && <Text style={styles.helperText}>{helperText}</Text>}
      {customErrorText && <Text style={styles.errorText}>{customErrorText}</Text>}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.modalContainer}>
          <FlatList
            data={countries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleCountrySelect(item)}
              >
                <Text style={styles.modalItemText}>
                  {item.name} ({item.dial_code})
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        </SafeAreaView>
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
    color: COLORS.text.secondary,
    fontWeight: '500',
    position: 'absolute',
    top: -11,
    left: 8,
    padding: 2,
    backgroundColor: COLORS._background.main,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.text.secondary,
    borderRadius: 4,
    height: 54,
  },
  countrySelector: {
    paddingHorizontal: 10,
    borderRightWidth: 1.5,
    borderColor: COLORS.text.secondary,
    justifyContent: 'center',
  },
  countryText: {
    fontSize: 16,
    color: COLORS.text.main,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: COLORS.text.main,
  },
  focusedInput: {
    borderColor: COLORS.secondary.main,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
  },
  modalItem: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 18,
  },
});

export default MobileNumberInput;