import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

import RecoveryEmailAddressInput from '../Components/Inputs/RecoveryEmailAddressInput';
import PasswordRecoveryButton from '../Components/Buttons/PasswordRecoveryButton';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.title}>Password Recovery</Text>
        <RecoveryEmailAddressInput value={email} onChangeText={setEmail} />
        <PasswordRecoveryButton onPress={handlePasswordRecovery} />
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

export default PasswordRecovery;
