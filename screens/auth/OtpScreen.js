import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function OtpScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      alert('Please enter a 6-digit OTP');
      return;
    }

    try {
      const response = await fetch('https://odara-app.onrender.com/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('OTP Verified!');
        navigation.navigate('ResetPassword', { email });
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (error) {
      alert('Error verifying OTP');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={height * 0.035} color="#08010eff" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>RESET PASSWORD</Text>
        <Text style={styles.subtitle}>
          Kindly enter the 6 digit code sent to your email
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpBox}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        {/* Note */}
        <Text style={styles.note}>
          <Text style={{ color: 'red' }}>*</Text> We will send you a message to set or reset your new password
        </Text>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: width * 0.05,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? height * 0.05 : height * 0.03,
    marginBottom: height * 0.04,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.3,
    height: width * 0.15,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.01,
    fontFamily: 'BricolageGrotesque_700Bold',
  },
  subtitle: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: height * 0.03,
    fontFamily: 'BricolageGrotesque_400Regular',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
  },
  otpBox: {
    width: width * 0.12,
    height: width * 0.12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: width * 0.05,
    color: '#000',
  },
  note: {
    fontSize: width * 0.03,
    color: '#666',
    marginBottom: height * 0.04,
    textAlign: 'center',
    fontFamily: 'BricolageGrotesque_400Regular',
  },
  submitButton: {
    backgroundColor: '#1c0032',
    paddingVertical: height * 0.02,
    borderRadius: width * 0.025,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
});
