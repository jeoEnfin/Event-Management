import { FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Banner from '../../components/common/Banner'
import EventCardList from '../../components/common/EventCardList'
import { DATA } from '../../constants/demoData'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'

type Props = {

}

const HomeScreen = (props: Props) => {
  const navigation: any = useNavigation()
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
    <Banner />,
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
      <TopBar title='Join ' profile notification search/>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={ItemData}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => index.toString()}
      />
    </ScreenWrapper>
  )
}

export default HomeScreen

