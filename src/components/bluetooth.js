import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BluetoothApp = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    BleManager.start({ showAlert: false });

    if (Platform.OS === 'android') {
      requestPermissions();
    }

    return () => {
      // Clean up
      BleManager.stopScan();
      BleManager.disconnect();
    };
  }, []);

  const requestPermissions = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    } catch (error) {
      console.warn(error);
    }
  };

  const startScanning = () => {
    if (!isScanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scan started');
          setIsScanning(true);
        })
        .catch(error => console.error(error));
    }
  };

  const stopScanning = () => {
    BleManager.stopScan()
      .then(() => {
        setIsScanning(false);
        console.log('Scan stopped');
      })
      .catch(error => console.error(error));
  };

  const handleGetDiscoveredDevices = () => {
    BleManager.getDiscoveredPeripherals()
      .then(devices => {
        setDevices(devices);
        console.log('Discovered devices:', devices);
      })
      .catch(error => console.error(error));
  };

  const connectToDevice = (device) => {
    BleManager.connect(device.id)
      .then(() => {
        console.log('Connected to device', device);
        // Retrieve services and characteristics if needed
        BleManager.retrieveServices(device.id)
          .then(services => console.log('Device services:', services))
          .catch(error => console.error(error));
      })
      .catch(error => console.error('Failed to connect:', error));
  };

  return (
    <View>
      <Text>Bluetooth Devices:</Text>
      <Text onPress={startScanning}>Start Scanning</Text>
      <Text onPress={stopScanning}>Stop Scanning</Text>

      {devices.map((device) => (
        <View key={device.id}>
          <Text>{device.name || 'Unnamed Device'}</Text>
          <Text onPress={() => connectToDevice(device)}>Connect</Text>
        </View>
      ))}
    </View>
  );
};

export default BluetoothApp;
