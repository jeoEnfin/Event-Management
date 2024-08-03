import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const QRMarker = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.markerTop} />
        <View style={styles.markerLeft} />
        <View style={styles.markerRight} />
        <View style={styles.markerBottom} />
        <Text style={styles.text}>Scan QR Code</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    width: '80%',
    height: '50%',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    borderTopWidth: 2,
    borderTopColor: 'white',
  },
  markerLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 50,
    borderLeftWidth: 2,
    borderLeftColor: 'white',
  },
  markerRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 50,
    borderRightWidth: 2,
    borderRightColor: 'white',
  },
  markerBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  text: {
    position: 'absolute',
    bottom: 20,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QRMarker;