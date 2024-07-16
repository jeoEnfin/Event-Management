import { FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Banner from '../../components/common/Banner'
import EventCardList from '../../components/common/EventCardList'
import { DATA } from '../../constants/demoData'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'
import { ExpoListingAPI } from './apis/ExpoListApi'
import { COLORS } from '../../constants'
import { isSameDay, isWithinInterval, parseISO } from 'date-fns'

type Props = {

}

const HomeScreen = (props: Props) => {
  const navigation: any = useNavigation()
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [newExpos,setNewExpos] = useState(null);
  const [currentExpos,setCurrentExpos] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const url = '?page=1&limit=10'
    try {
      const response = await ExpoListingAPI({ url });
      setData(response?.data?.data?.allExpo)
      const _data = response.data?.data?.allExpo;
      const currentDate = new Date();

      // Filter expos where expRegistrationStartDate matches current date
      const filteredExpos = _data.filter((expo:any) => {
        const startDate = parseISO(expo.expRegistrationStartDate);
        const endDate = parseISO(expo.expRegistrationEndDate);
        return isWithinInterval(currentDate, { start: startDate, end: endDate });
      });

      const currentExpos = _data.filter((expo:any) => 
        isWithinInterval(currentDate, { 
          start: parseISO(expo.expStartDate),
          end: parseISO(expo.expEndDate) 
        })
      );

      setCurrentExpos(currentExpos);
      setNewExpos(filteredExpos);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.response.data)
    }
  };

  const onRefresh = async () => {
    fetchData();
  };

  const ItemData = [
    <Banner />,
    // <EventCardList
    //   title='Registered Events'
    //   data={''}
    //   isWatched={true}
    //   noDataText='You are not registered in any events'
    // />,
    <EventCardList
      title='New Events'
      data={newExpos}
      isWatched={false}
    />,
    <EventCardList
      title='Events'
      data={currentExpos}
      isWatched={false}
    />,
    // <EventCardList
    //   title='Events Nearby'
    //   data={DATA} />,
  ]


  return (
    <ScreenWrapper>
      <TopBar title='Join '
        profile
        notification
        search
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={ItemData}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => index.toString()}
        style={{ width: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={[COLORS.secondary.main]}
          />
        }
      />
    </ScreenWrapper>
  )
}

export default HomeScreen

