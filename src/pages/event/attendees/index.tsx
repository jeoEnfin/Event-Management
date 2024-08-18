import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomTab from '../components/CustomTab'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../../../components/ScreenWrapper'
import { dummyData } from '../../../constants/demoData'
import { Icon } from 'react-native-elements'
import FavouriteCard from '../components/FavouriteCard'

type Props = {}

type Person = {
  id: string;
  name: string;
  avatar: string;
  isFavorite: boolean;
};

const Attendees = (props: Props) => {
  const navigation: any = useNavigation();
  const [people, setPeople] = useState<Person[]>(dummyData);

  const toggleFavorite = (id: string) => {
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.id === id ? { ...person, isFavorite: !person.isFavorite } : person
      )
    );
  };

  const renderItem = ({ item }: { item: Person }) => (
   <FavouriteCard item={item} toggleFavorite={(val) =>{toggleFavorite(val)}}/>
  );

  return (
    <FlatList
      data={people}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  )
}

export default Attendees

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 18,
    paddingTop: 5
  }
})