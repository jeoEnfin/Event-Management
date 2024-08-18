import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { COLORS } from '../../constants';

type LoaderProps = {
  visible: boolean;
};

const OverlayLoader = ({ visible }: LoaderProps) => {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={visible}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.secondary.main} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent loader background
    padding: 20,
    borderRadius: 10,
  },
});

export default OverlayLoader;