import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, TXT_SIZE} from '../../constants';
type Props = {
  title: string;
  onPress?: () => void;
};
const Booth3 = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.btn_container}>
      <Text style={styles.btn_txt}>{props.title}</Text>
    </TouchableOpacity>
  );
};
export default Booth3;
const styles = StyleSheet.create({
  btn_txt: {
    color: COLORS.text_color,
    fontSize: TXT_SIZE.M,
    fontWeight: '500',
  },
  btn_container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    padding: 5,
    borderRadius: 3,
  },
});
