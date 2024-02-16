import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'

type Props = {
    modalVisible?: boolean;
    onRequestClose?: () => void;
    children: ReactNode;  
    animationType: any;
    Style?: any;
}

const DropDownModal = (props: Props) => {
  return (
    <View style={styles.container}>
     <Modal 
      animationType={props.animationType}
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.onRequestClose}
      >
        <View style={[styles.modalView, {...props.Style}]}>{props.children}</View>
     </Modal>
    </View>
  )
}

export default DropDownModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        justifyContent: 'space-between'
    },
})