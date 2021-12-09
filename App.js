import React, { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import FingerprintScannerScreen from './screens/FingerprintScanner';
import TouchIDScreen from './screens/TouchID';

const App = () => {
  const [view, setView] = useState();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightcoral',
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', padding: 10 }}>
          <TouchableOpacity onPress={() => setView('touch-id')} style={{ backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>touch-id</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setView('fingerprint-scanner')} style={{ backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>fingerprint-scanner</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, width: '100%' }}>
          {view === 'touch-id' && (
            <TouchIDScreen />
          )}
          {view === 'fingerprint-scanner' && (
            <FingerprintScannerScreen />
          )}
        </View>
    </View>
  );
};

export default App;
