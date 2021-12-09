import React, { useEffect, useState } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const FingerprintScannerScreen = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    checkIfSupported();
  }, []);

  const checkIfSupported = () => {
    FingerprintScanner.isSensorAvailable()
      .then(biometryType => {
        /* Alert.alert(biometryType); */
        setIsSupported(true);
      })
      .catch(error => Alert.alert(error.message));
  };

  const authenticate = () => {
    FingerprintScanner.authenticate({
      description: 'Scan your fingerprint on the device scanner to continue',
    })
      .then(() => {
        console.log('Authenticated successfully');
        Alert.alert('Authenticated successfully');
        FingerprintScanner.release();
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
      }}>
      <Text style={{fontSize: 26, fontWeight: 'bold', color: 'black'}}>
        react-native-fingerprint-scanner
      </Text>
      {isSupported 
        ? (
          <Button onPress={authenticate} title='Authenticate' />
        ) : (
          <Text style={{ color: 'red', fontSize: 16 }}>Fingerprint is not supported or active</Text>
        )}
    </View>
  );
};

export default FingerprintScannerScreen;
