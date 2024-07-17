import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { COLORS } from '../../constants';

interface CustomTextFieldProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  validationType?: 'email' | 'number' | 'url' | 'text'| 'custom' |'required';
  helperText?: string;
  customErrorText?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  placeholder,
  validationType,
  helperText,
  onChangeText,
  value,
  customErrorText,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    validate(value);
  };

  const validate = (text: string | undefined) => {
    let errorMessage = '';
    if (validationType) {
      if (validationType === 'email' && text && !/^\S+@\S+\.\S+$/.test(text)) {
        errorMessage = customErrorText || 'Invalid email address';
      } else if (validationType === 'number' && text && !/^\d{10}$/.test(text)) {
        errorMessage = customErrorText || 'Invalid phone number';
      } else if (validationType === 'required' && !text) {
        errorMessage = customErrorText || 'This field is required';
      }
    }
    setError(errorMessage);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isFocused && styles.focusedInput]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(text) => {
          onChangeText && onChangeText(text);
          validate(text);
        }}
        value={value}
        {...rest}
      />
      {label && <Text style={styles.label}>{label}</Text>}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  input: {
    height: 50,
    borderColor: COLORS.text.secondary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  focusedInput: {
    borderColor: '#6200ee',
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

export default CustomTextField;
