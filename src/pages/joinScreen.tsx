import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../constants'
import TopBar from '../components/TopBar'
import ScreenWrapper from '../components/ScreenWrapper'
import DeviceInfo from 'react-native-device-info';
import FloatingButton from '../components/FloatingButton'
import Banner from '../components/common/Banner'
import ProfileCardList from '../components/common/ProfileCardList'
import EventSmallCard from '../components/common/EventSmallCard'
import EventCardList from '../components/common/EventCardList'
import { DATA } from '../constants/demoData'


type Props = {

}

const JoinScreen = (props: Props) => {
  const navigation: any = useNavigation()
  const [errorMessage, setErrorMessage] = useState(false)
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://reqres.in/api/users?page=1');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData.data);
        console.log(jsonData.data)
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const ItemData = [
    <Banner event_url='https://img.freepik.com/free-vector/music-event-poster-template-with-abstract-shapes_1361-1316.jpg' />,
    <ProfileCardList data={data} />,
    <EventCardList
      title='New Event Releases'
      data={DATA} />,
    <EventCardList
      title='Continue Watching Events'
      data={DATA} />,
    <EventCardList
      title='Past Events'
      data={DATA} />,
  ]


  return (
    <ScreenWrapper>
      <TopBar title='Join ' scanner />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={ItemData}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => index.toString()}
      />
      <FloatingButton />
    </ScreenWrapper>
  )
}

export default JoinScreen

