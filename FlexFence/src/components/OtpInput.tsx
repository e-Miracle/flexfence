// src/components/OtpInput.tsx
import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useAppColors } from '../hooks/useAppColors';

interface OtpInputProps {
  length?: number;
  onChange?: (otp: string[]) => void;
  onCodeFilled?: (code: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange, onCodeFilled }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);
  const colors = useAppColors();

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (onChange) {
      onChange(newOtp);
    }

    const isComplete = newOtp.every((digit) => digit !== '');
    if (isComplete && onCodeFilled) {
      onCodeFilled(newOtp.join(''));
    }

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={[styles.otpBox, { color: colors.text }]}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 8,
    fontFamily: 'DMSans-Bold',
  },
});

export default OtpInput;
