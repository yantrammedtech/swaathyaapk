import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, PermissionsAndroid, NativeModules, NativeEventEmitter } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BleManager from 'react-native-ble-manager';

export default function Scanner({ onScanComplete }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [bluetoothDevices, setBluetoothDevices] = useState([]);
  const [oneTimeScanning, setOneTimeScanning] = useState(false);
  const [qrcodeData, setQrcodeData] = useState('');

  const BleManagerModule = NativeModules.BleManager;
  const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    requestPermission();
    BleManager.start({ showAlert: false }).then(() => {
      console.log('BleManager initialized');
    });
  }, []);

  useEffect(() => {
    const stopListener = BleManagerEmitter.addListener('BleManagerStopScan', () => {
      setOneTimeScanning(false);
      console.log('Scan is stopped');
      handleGetConnectedDevices();
    });
    return () => stopListener.remove();
  }, []);

 

  // const startScanning = async () => {
  //   if (!oneTimeScanning) {
  //     BleManager.scan([], 10, true)
  //       .then(() => {
  //         console.log('Scan is started');
  //         setOneTimeScanning(true);
  //       })
  //       .catch(console.error);
  //   }
  // };

  // const handleGetConnectedDevices = () => {
  //   BleManager.getDiscoveredPeripherals().then(results => {
  //     if (results.length === 0) {
  //       console.log('No connected bluetooth devices');
  //       startScanning();
  //     } else {
  //       const allDevices = results.filter(item => item.name?.startsWith("NV"));
  //       console.log("Connected devices:", allDevices);
  //       setBluetoothDevices(allDevices);
  //     }
  //   });
  // };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    setQrcodeData(data);
    onScanComplete(data);
  };

  const connectToDevice = () => {
    if (qrcodeData) {
      const macId = qrcodeData.split(",")[1].trim();
      const item = bluetoothDevices.find(device => device.id.trim() === macId);
      item ? onConnect(item) : console.log('Device not found');
    } else {
      console.log('No QR code data available.');
    }
  };

  // const onConnect = async (device) => {
  //   try {
  //     await BleManager.connect(device.id);
  //     console.log('Connected');
  //     const services = await BleManager.retrieveServices(device.id);
  //     console.log("Connected services:", services);
  //   } catch (error) {
  //     console.error('Error connecting to device:', error);
  //   }
  // };



  // ==============================ble initial setup  connect start ======================


  useEffect(() => {
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });
    requestPermission();

    return () => { };

  }, [])

  useEffect(() => {
    BleManager.start({ showAlert: false }).then(() => {
      console.log('BleManager initialized');
    });
  }, []);

  const requestPermission = async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE);
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    startScanning()
  };

  function startScanning() {
    if (!isScanning) {
      BleManager.scan([], 10, true)
        .then(() => {
          console.log('Scan is started header.....');
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    const stopListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('Scan is stopped header');
        handleGetConnectedDevices();
      },
    );

    // const disconnected = BleManagerEmitter.addListener(
    //     'BleManagerDisconnectPeripheral',
    //     peripheral => {
    //         console.log('Disconnected Device', peripheral);
    //     },
    // );

    const characteristicValueUpdate = BleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      data => {
        // readCharacteristicFromEvent(data);
      },
    );

    const BleManagerDidUpdateState = BleManagerEmitter.addListener(
      'BleManagerDidUpdateState',
      data => {
        // console.log('BleManagerDidUpdateState Event!', data);
        startScanning();

      },
    );

    return () => {
      stopListener.remove();
      // disconnected.remove();
      characteristicValueUpdate.remove();
      BleManagerDidUpdateState.remove();
    };
  });

  // Clear intervals function
  const clearIntervals = () => {
    if (dataIntervalRef.current) {
      clearInterval(dataIntervalRef.current);
      dataIntervalRef.current = null;
    }
    if (readTimerRef.current) {
      clearInterval(readTimerRef.current);
      readTimerRef.current = null;
    }
  };


  function handleGetConnectedDevices() {

    BleManager.getDiscoveredPeripherals().then(results => {
      if (results.length == 0) {
        console.log('No connected bluetooth devices');
        startScanning();
      } else {

        const allDevices = results.filter(item => {
          if (item.name && item.name.startsWith("NV")) {

            return true; // Include this item in the filtered results
          }
          return false; // Exclude items that don't start with "NVC"
        });
        // console.log("allDevicesheader==========com============", allDevices)
        onConnect(allDevices);
      }
    });
  };

  function onDisconnect() {
    console.log("Disconnected header")
    BleManager.disconnect(currentDeviceData?.id).then(() => {
      clearIntervals();
      dispatch({ type: "isDeviceConnected", payload: false });
      dispatch({ type: "isMoniterStart", payload: "" });

    });

  };

  async function onConnect(deviceInfo) {
    const item = deviceInfo[0]
    console.log("item========op============", item)

    // this condition for role= "Patient weather same macId added in patients Table or not. if not matches throw error  "

  

    let autoconnect = true



    async function connectDevice(item) {
      autoconnect = false
      try {
        await BleManager.connect(item.id);
        console.log('Connected header');

        const res = await BleManager.retrieveServices(item.id);
        console.log("RES::::", JSON.stringify(res));
    onServicesDiscovered(res, item)


        // dispatch({ type: "currentDeviceData", payload: item });
        // dispatch({ type: "BleResponseData", payload: res });
        dispatch({ type: "isDeviceConnected", payload: true });


        // startDistanceCheck(item); //temperarly keep a sssside this triggers error
      } catch (error) {
        dispatch({ type: "isDeviceConnected", payload: false });
        console.error('Error connecting to device:header====', error);
      }
    }


    //calling this function every oe minute
    // Start sending data every minute



    // if (autoconnect) {
    //   if (item?.id) {
    //     connectDevice(item)
    //   }

    // }

    dataIntervalRef = setInterval(() => {
      if (item?.id && item.id === userMacId ) {
        console.log("mac id======item=======", item.id)
        connectDevice(item)
      }

    }, 60000); // 60000 ms = 1 minute


  };

  // ==============================ble initial setup upto connect end ======================


  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      <Text style={styles.dataText}>
        {scannedData ? `Scanned Data: ${scannedData}` : 'Scan a barcode to see the data here'}
      </Text>
      <TouchableOpacity style={styles.qrcodeButtonTouchable} onPress={connectToDevice}>
        <Text style={styles.qrcodeButtonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scannerContainer: { flex: 1, width: '100%', overflow: 'hidden', borderRadius: 10, marginBottom: 20 },
  dataText: { fontSize: 16, padding: 10, color: 'black', textAlign: 'center', marginTop: 20, marginBottom: 10 },
  qrcodeButtonText: { fontSize: 21, color: 'white' },
  qrcodeButtonTouchable: { backgroundColor: '#007BFF', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 30, bottom: 10 },
});



// import React, { useState, useEffect } from 'react';
// import { Text, View, Button, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import { NativeModules, NativeEventEmitter } from 'react-native';
// import { SERVICE_UUID, write_Temperature_PATIENTID_UUID } from '../Device/DeviceConstants';
// import BleManager from 'react-native-ble-manager';
// const BleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);

// const BleManagerModule = NativeModules.BleManager;
// // const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// export default function Scanner({ onScanComplete }) {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [scannedData, setScannedData] = useState('');
//   const [bluetoothDevices, setBluetoothDevices] = useState([]);
//   const [oneTimeScanning, setOneTimeScanning] = useState(false);
//   const [qrcodeData, setQrcodeData] = useState('');
//   const [isBleManagerReady, setIsBleManagerReady] = useState(false); // BLE manager ready state

//   useEffect(() => {
//     // Request camera permission for barcode scanning
//     const requestCameraPermission = async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     };
//     requestCameraPermission();
//   }, []);

//   // Initialize BLE manager
//   useEffect(() => {
//     const initializeBleManager = async () => {
//       try {
//         await BleManager.start({ showAlert: false });
//         console.log('BleManager initialized');
//         setIsBleManagerReady(true);
//         requestPermission();
//       } catch (error) {
//         console.error('Error initializing BleManager:', error);
//         setIsBleManagerReady(false);
//       }
//     };
  
//     initializeBleManager();
  
//     const stopListener = BleManagerEmitter.addListener(
//       'BleManagerStopScan',
//       () => {
//         setOneTimeScanning(false);
//         console.log('Scan stopped');
//         handleGetConnectedDevices();
//       }
//     );
  
//     return () => {
//       stopListener.remove();
//     };
//   }, []);
  

//   // Request Bluetooth permissions
//   const requestPermission = async () => {
//     try {
//       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
//       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
//       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
//       startScanning();
//     } catch (error) {
//       console.error('Permission request error:', error);
//     }
//   };

//   useEffect(() => {
//     const initializeBluetooth = async () => {
//       await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
//         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);
      
//       await BleManagerModule.enableBluetooth();
//       startScanning();
//     };

//     initializeBluetooth();
//   }, []);

//   const startScanning = () => {
//     if (!oneTimeScanning) {
//       BleManagerModule.scan([], 10, true)
//         .then(() => {
//           console.log('Scan started');
//           setOneTimeScanning(true);
//         })
//         .catch(error => console.error(error));
//     }
//   };

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     setScannedData(data);
//     setQrcodeData(data);
//     onScanComplete(data);
//   };

//   const handleGetConnectedDevices = () => {
//     if (isBleManagerReady) {
//       BleManagerModule.getDiscoveredPeripherals().then(results => {
//         if (results.length > 0) {
//           const filteredDevices = results.filter(item => item.name && item.name.startsWith("NV"));
//           setBluetoothDevices(filteredDevices);
//         } else {
//           startScanning();
//         }
//       }).catch(error => {
//         console.error('Error getting connected devices:', error);
//       });
//     }
//   };

//   // Check and connect to the selected device
//   const onConnect = async (item) => {
//     console.log("onConnect=======================",item)
//     try {
//       await BleManager.connect(item.id);
//                console.log('Connected');
//       //         const res = await BleManager.retrieveServices(item.id);
//       //         // console.log("RES::::", JSON.stringify(res));
//       await BleManagerModule.connect(item.id);
//       console.log('Connected to device:', item.id);
//       // Proceed with writing data after connection is established
//      // await writeToDevice(item.id);
//     } catch (error) {
//       console.error('Error connecting to device:', error);
//     }
//   };

//   // Write data to the connected device
//   const writeToDevice = async (deviceId) => {
//     if (deviceId) {
//       try {
//         // You should replace the characteristic and service UUID with the appropriate ones for your device
       
//         const serviceUUID = SERVICE_UUID;
//         const characteristicUUID = write_Temperature_PATIENTID_UUID;
//         const dataToWrite = new Uint8Array([0x01]); // Example data

//         await BleManagerModule.write(deviceId, serviceUUID, characteristicUUID, dataToWrite);
//         console.log('Data written to device');
//       } catch (error) {
//         console.error('Error writing to device:', error);
//       }
//     } else {
//       console.error('Device ID is null, unable to write');
//     }
//   };

//   const qrCodeBleConnect = () => {
//     if (bluetoothDevices.length === 0) {
//       handleGetConnectedDevices();
//     } else {
//       const macId = qrcodeData.split(",")[1]?.trim();
//       const item = bluetoothDevices.find(device => device.id.trim() === macId);
//       if (item) {
//         onConnect(item); // Connect and write to the device
//       } else {
//         console.log('Device not found in the list of Bluetooth devices.');
//       }
//     }
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   console.log('BleManager:', BleManager);
// console.log('BleManagerEmitter:', BleManagerEmitter);

//   return (
//     <View style={styles.container}>
//       <View style={styles.scannerContainer}>
//         <BarCodeScanner
//           onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//           style={StyleSheet.absoluteFillObject}
//         />
//       </View>
//       {scanned && (
//         <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
//       )}
//       {scannedData ? (
//         <Text style={styles.dataText}>Scanned Data: {scannedData}</Text>
//       ) : (
//         <Text style={styles.dataText}>Scan a barcode to see the data here</Text>
//       )}
//       <TouchableOpacity style={styles.qrcodeButtonTouchable} onPress={qrCodeBleConnect}>
//         <Text style={styles.qrcodeButtonText}>Connect</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   scannerContainer: {
//     flex: 1,
//     width: '100%',
//     overflow: 'hidden',
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   dataText: {
//     fontSize: 16,
//     padding: 10,
//     color: 'white',
//     backgroundColor: 'black',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   qrcodeButtonTouchable: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#007BFF',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   qrcodeButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

