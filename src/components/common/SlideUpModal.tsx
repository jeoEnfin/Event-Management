import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Easing } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../../constants';

interface SlideUpModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SlideUpModal: React.FC<SlideUpModalProps> = ({ isVisible, onClose, children }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      slideIn();
    } else {
      slideOut();
    }
  }, [isVisible]);

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const modalTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Adjust based on the modal height
  });

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalTranslateY }] }]}>
          {children}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name='close' color={COLORS.text.main} size={28}/>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    margin: 18,
    minHeight: 200,
    alignItems: 'center',
    borderRadius: 6,
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SlideUpModal;
