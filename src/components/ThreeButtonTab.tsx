import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS, TXT_SIZE } from '../constants';

type Props = {
  title_1: string;
  title_2?: string;
  title_3?: string;
  active: (tabnumber: number) => void;
}

const ThreeButtonTab = (props: Props) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabPress = (tabNumber: number) => {
    setActiveTab(tabNumber);
    props.active(tabNumber)
  };

  return (
    <View style={styles.container}>
      {/* Tab 1 */}
      <TouchableOpacity
        style={[styles.tab, activeTab === 1 && styles.activeTab]}
        onPress={() => handleTabPress(1)}
      >
        <Text style={styles.tabText}>{props.title_1}</Text>
      </TouchableOpacity>

      {/* Tab 2 */}
      <TouchableOpacity
        style={[styles.tab, activeTab === 2 && styles.activeTab]}
        onPress={() => handleTabPress(2)}
      >
        <Text style={styles.tabText}>{props.title_2}</Text>
      </TouchableOpacity>

      {/* Tab 3 */}

      <TouchableOpacity
        style={[styles.tab, activeTab === 3 && styles.activeTab]}
        onPress={() => handleTabPress(3)}
      >
        <Text style={styles.tabText}>{props.title_3}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.btnBackground,
    borderRadius: 5,
    overflow: 'hidden',
    margin: 5,
    borderWidth: 1,
    borderColor: COLORS.baseWhite,
    elevation: 10
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  activeTab: {
    backgroundColor: COLORS.btnBackground2,
  },
  tabText: {
    fontSize: TXT_SIZE.M,
    color: COLORS.baseWhite
  },
});

export default ThreeButtonTab;
