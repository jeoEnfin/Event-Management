import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { COLORS } from '../../constants';

interface CustomTextFieldProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  validationType?: 'email' | 'number' | 'url' | 'text' | 'custom' | 'required' | 'any' | 'futureDate' | 'pastDate';
  helperText?: string;
  customErrorText?: string;
  isRequired?: boolean;
  regex?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  placeholder,
  validationType,
  helperText,
  onChangeText,
  value,
  customErrorText,
  isRequired = false,
  regex,
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
      } else if (validationType === 'number' && text && !/^\d+$/.test(text)) {
        errorMessage = customErrorText || 'Invalid input, only numbers are allowed';
      } else if (isRequired && !text) {
        errorMessage = customErrorText || 'This field is required';
      }
    }

    if (regex && text &&!new RegExp(regex).test(text)) {
      errorMessage = customErrorText || 'Invalid input, format does not match';
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
        inputMode={validationType === 'text' ? 'text' :
          validationType === 'number' ? 'numeric' :
            validationType === 'url' ? 'url' :
              validationType === 'email' ? 'email' : 'text'
      }
      />
      {label && <Text style={[styles.label, isFocused && { color: COLORS.secondary.main }]}>{label}</Text>}
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
    color: COLORS.text.secondary,
    fontWeight: '500',
    position: 'absolute',
    top: -11,
    left: 8,
    padding: 2,
    backgroundColor: COLORS._background.main
  },
  input: {
    height: 54,
    borderColor: COLORS.text.secondary,
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 10,
    color: COLORS.text.main
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
    marginLeft: 2
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
    marginLeft: 2
  },
});

export default CustomTextField;
