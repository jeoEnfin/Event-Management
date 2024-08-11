import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { COLORS } from '../../../constants';

const { width, height } = Dimensions.get('window');

const QRMarker = () => {
  return (
    <View style={styles.overlay}>
    <View style={styles.topOverlay} />
    <View style={styles.middleRow}>
      <View style={styles.leftOverlay} />
      <View style={styles.scannerFrame}>
        <Text style={styles.scanText}>Align QR code inside frame to scan</Text>
      </View>
      <View style={styles.rightOverlay} />
    </View>
    <View style={styles.bottomOverlay} />
  </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  middleRow: {
    flexDirection: 'row',
  },
  leftOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scannerFrame: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 4,
    borderColor: COLORS.secondary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanText: {
    position: 'absolute',
    bottom: -30,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default QRMarker;