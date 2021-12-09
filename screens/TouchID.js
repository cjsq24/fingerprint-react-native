import React, { useEffect, useState } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import TouchID from 'react-native-touch-id';

const TouchIDScreen = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    checkIfSupported();
  }, []);

  const checkIfSupported = () => {
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    };
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
          setIsSupported(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const authenticate = () => {
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    TouchID.authenticate(
      'to demo this react-native component',
      optionalConfigObject,
    )
      .then(success => {
        Alert.alert('Authenticated Successfully: ' + success);
      })
      .catch(error => {
        Alert.alert('Authentication Failed');
      });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
      }}>
      <Text style={{fontSize: 26, fontWeight: 'bold', color: 'black'}}>react-native-touch-id</Text>
      {isSupported 
        ? (
          <Button onPress={authenticate} title='Authenticate' />
        ) : (
          <Text style={{ color: 'red', fontSize: 16 }}>Fingerprint is not supported or active</Text>
        )}
    </View>
  );
};

export default TouchIDScreen;
