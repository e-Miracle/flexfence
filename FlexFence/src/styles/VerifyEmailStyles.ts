// src/styles/verifyEmailStyles.ts
import { StyleSheet } from 'react-native';

const verifyEmailStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  heading: {
    fontSize: 30,
    fontFamily: 'DMSans-Bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    fontFamily: 'DMSans-Regular',
  },
  Email: {
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
  },
  phone: {
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
  },
  expiryText: {
    marginTop: 20,
    fontSize: 14,
    color: '#999',
    fontFamily: 'DMSans-Regular',
  },
  resendContainer: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'DMSans-Regular',
    width: '70%',
  },
  resendAction: {
    color: '#007BFF',
  },
});

export default verifyEmailStyles;
