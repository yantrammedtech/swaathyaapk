import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet , Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Scanner({ onScanComplete }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    Alert.alert(
        'Scan Complete',
        `Bar code with type ${type} and data ${data} has been scanned!`,
        [{ text: 'OK', onPress: () => onScanComplete(data) }] // Call `onScanComplete` with scanned data
      );
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      {scannedData ? (
        <Text style={styles.dataText}>Scanned Data: {scannedData}</Text>
      ) : (
        <Text style={styles.dataText}>Scan a barcode to see the data here</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataText: {
    fontSize: 16,
    padding: 10,
    color: 'white',
    backgroundColor: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});
