import React, { FC, useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

const OTPInput: FC<OTPInputProps> = ({ length, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>(Array(length).fill(null));

  useEffect(() => {
    // Focus the first input when the component mounts
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // If all inputs are filled, call the onComplete callback
    if (!newOtp.includes('') && onComplete) {
      onComplete(newOtp.join(''));
    }

    // Move focus to the next input
    if (index < length - 1 && value !== '') {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleInputBackspace = (index: number) => {
    // Move focus to the previous input on backspace
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={otp[index]}
            onChangeText={(value) => handleInputChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleInputBackspace(index);
              }
            }}
            maxLength={1}
            keyboardType="numeric"
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 45,
    height: 50,
    borderColor: COLORS.default.dark,
    color: COLORS.text.main,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default OTPInput;