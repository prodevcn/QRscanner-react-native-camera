import React, {useRef, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {
  NativeBaseProvider,
  Heading,
  Center,
  Button,
  View,
  Box,
} from 'native-base';
import {StyleSheet, Dimensions} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const App = props => {
  const ref = useRef();
  const [onCamera, setOnCamera] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  return (
    <NativeBaseProvider>
      <Box flex={1} w="100%" bg="lightBlue.800" p={0}>
        {onCamera ? (
          <View flex={1}>
            <RNCamera
              ref={ref}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onBarCodeRead={data => {
                setScannedData(data.data);
                setOnCamera(false);
              }}
              // barCodeTypes={RNCamera.Constants.BarCodeType.qr}
            />
          </View>
        ) : (
          <Center flex={1}>
            <Heading color="white">Scan Result</Heading>
            <Box
              my={3}
              style={styles.scannerBox}
              alignItems="center"
              justifyContent="center">
              {scannedData && (
                <QRCode
                  flex={1}
                  value={scannedData}
                  color="white"
                  backgroundColor="transparent"
                  width={width * 0.6}
                  height={width * 0.6}
                />
              )}
            </Box>
            <Heading color="white">{scannedData}</Heading>
            <Button
              variant="outline"
              onPress={() => {
                setOnCamera(true);
              }}>
              scan
            </Button>
          </Center>
        )}
      </Box>
    </NativeBaseProvider>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  scannerBox: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
  },
  preview: {
    flex: 1,
  },
});

export default App;
