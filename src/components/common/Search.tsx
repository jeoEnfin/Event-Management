import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../../constants';

interface SearchComponentProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

const Search: React.FC<SearchComponentProps> = ({ placeholder, onChangeText, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Icon name="search" type="font-awesome" color={COLORS._background.secondary} />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text.disable}
        onChangeText={onChangeText}
        // value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    backgroundColor: COLORS._background.main,
    borderRadius: 35,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 5
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.main
  },
});

export default Search;
