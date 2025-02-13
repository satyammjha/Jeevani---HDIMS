import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRScannerScreen = () => {
  const [scannedData, setScannedData] = useState(null);

  const onSuccess = (event) => {
    const data = event.data; // Extract the data from the QR code
    setScannedData(data); // Set the scanned data to state
    Alert.alert('QR Code Scanned', `Data: ${data}`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess} // Callback when a QR code is scanned
        flashMode={RNCamera.Constants.FlashMode.auto} // Enable/disable flash
        topContent={
          <Text style={styles.centerText}>
            Scan a QR code to view its content.
          </Text>
        }
        bottomContent={
          scannedData && (
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Scanned Data:</Text>
              <Text style={styles.dataText}>{scannedData}</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  centerText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  dataText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

export default QRScannerScreen;