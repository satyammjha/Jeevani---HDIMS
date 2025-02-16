import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { scanQRCodes } from 'vision-camera-code-scanner';
import { runOnJS } from 'react-native-reanimated';

const QRScannerScreen = () => {
  const [scannedData, setScannedData] = useState(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      if (status !== 'authorized') {
        Alert.alert('Permission Required', 'Camera permission is needed to scan QR codes.');
      }
    })();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const codes = scanQRCodes(frame);
    if (codes.length > 0 && !scannedData) {
      runOnJS(setScannedData)(codes[0].value);
      runOnJS(Alert.alert)('Scanned Data', codes[0].value);
    }
  }, [scannedData]);

  if (!device) {
    return <Text style={styles.text}>No camera found or camera not supported.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5} // Adjust for performance
      />
      {scannedData && <Text style={styles.text}>Scanned: {scannedData}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: 'black',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});

export default QRScannerScreen;