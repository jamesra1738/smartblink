import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

import EmailAddressInput from '../Components/Inputs/EmailAddressInput';
import PasswordInput from '../Components/Inputs/PasswordInput';
import ConfirmPasswordInput from '../Components/Inputs/ConfirmPasswordInput';
import SignUpButton from '../Components/Buttons/SignUpButton';
import AccountPrompt from '../Typography/AccountPrompt';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.title}>Sign Up</Text>
        <EmailAddressInput value={email} onChangeText={setEmail} />
        <PasswordInput value={password} onChangeText={setPassword} />
        <ConfirmPasswordInput value={confirmPassword} onChangeText={setConfirmPassword} />
        <SignUpButton onPress={handleSignUp} />
        <AccountPrompt />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SignUp;
