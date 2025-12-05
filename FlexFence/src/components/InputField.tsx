// src/components/InputField.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ViewStyle,
    TextStyle,
    TextInputProps,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface Country {
    name: string;
    code: string;
}

interface InputFieldProps extends TextInputProps {
    placeholder: string;
    style?: ViewStyle;
    inputStyle?: TextStyle;
    variant?: 'default' | 'phone' | 'password';
    phoneValue?: string;
    onChangePhoneNumber?: (text: string) => void;
    onSelectCountryCode?: (code: string) => void;
    spacing?: number;
}


const countryData: Country[] = [
    { name: 'Nigeria', code: '+234' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Ghana', code: '+233' },
    { name: 'Kenya', code: '+254' },
    { name: 'India', code: '+91' },
    { name: 'Germany', code: '+49' },
    { name: 'South Africa', code: '+27' },
    { name: 'France', code: '+33' },
    { name: 'Italy', code: '+39' },
    { name: 'Spain', code: '+34' },
    { name: 'Brazil', code: '+55' },
    { name: 'Australia', code: '+61' },
    { name: 'China', code: '+86' },
    { name: 'Japan', code: '+81' },
    { name: 'Mexico', code: '+52' },
    { name: 'Egypt', code: '+20' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Russia', code: '+7' },
    { name: 'Argentina', code: '+54' },
    { name: 'Pakistan', code: '+92' },
    { name: 'Bangladesh', code: '+880' },
    { name: 'Turkey', code: '+90' },
    { name: 'Netherlands', code: '+31' },
];


const InputField: React.FC<InputFieldProps> = ({
    placeholder,
    style,
    inputStyle,
    variant = 'default',
    phoneValue,
    onChangePhoneNumber,
    onSelectCountryCode, 
    spacing = 0,
    ...rest
}) => {

    const [selectedCode, setSelectedCode] = useState('+234');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const spacingStyle = { marginBottom: spacing };

    if (variant === 'phone') {
        return (
            <View style={[styles.phoneRow, spacingStyle, style]}>
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                        onPress={() => setDropdownVisible(!dropdownVisible)}
                        style={styles.dropdownButton}
                    >
                        <Text style={styles.dropdownText}>{selectedCode}</Text>
                    </TouchableOpacity>

                    {dropdownVisible && (
                        <View style={styles.dropdownList}>
                            <FlatList
                                data={countryData}
                                keyExtractor={(item) => item.code}
                                keyboardShouldPersistTaps="handled"
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedCode(item.code);
                                            setDropdownVisible(false);
                                
                                            // send code to parent
                                            onSelectCountryCode && onSelectCountryCode(item.code);
                                        }}
                                    >
                                        <Text style={styles.dropdownItemText}>
                                            {item.name} ({item.code})
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                
                            />
                        </View>
                    )}

                </View>

                <TextInput
                    style={[styles.phoneInput, inputStyle]}
                    value={phoneValue}
                    onChangeText={onChangePhoneNumber}
                    placeholder={placeholder}
                    placeholderTextColor="#666666"
                    keyboardType="phone-pad"
                    {...rest}
                />
            </View>
        );
    }
    if (variant === 'password') {
        return (
            <View style={[styles.passwordContainer, spacingStyle, style]}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#666666"
                    secureTextEntry={!isPasswordVisible}
                    style={[ { flex: 1, fontSize: 16 }, inputStyle]}
                    {...rest}
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible((prev) => !prev)}
                    style={styles.eyeButton}
                >
                    <Ionicons
                        name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#333"
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#666666"
            style={[styles.input, spacingStyle, style, inputStyle]}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
        backgroundColor: '#fff',
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    dropdownContainer: {
        width: 80,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 20,
        marginRight: 6,
        backgroundColor: '#fff',
        position: 'relative',
    },
    dropdownButton: {
        justifyContent: 'center',
    },
    dropdownText: {
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
    },
    dropdownList: {
        position: 'absolute',
        top: 55,
        left: 0,
        width: 220,
        maxHeight: 200,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        zIndex: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 50,
        backgroundColor: '#fff',
    },
    eyeButton: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    eyeIcon: {
        fontSize: 18,
    },

    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    dropdownItemText: {
        fontSize: 14,
    },
    phoneInput: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
        backgroundColor: '#fff',
    },
});

export default InputField;
