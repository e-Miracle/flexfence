// src/components/OtpInput.tsx
import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface OtpInputProps {
  length?: number;
  onChange?: (otp: string[]) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (onChange) {
      onChange(newOtp);
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
          style={styles.otpBox}
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
    color: '#000',
    fontFamily: 'DMSans-Bold',
  },
});

export default OtpInput;
