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
import { compareAsc, isAfter, isSameDay, isWithinInterval, parseISO } from 'date-fns'
import { OrderListAPI } from './apis/OrderListApi'
import AsyncStorageUtil from '../../utils/services/LocalCache'

type Props = {

}

const HomeScreen = (props: Props) => {
  const navigation: any = useNavigation()
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [newExpos, setNewExpos] = useState(null);
  const [currentExpos, setCurrentExpos] = useState(null);
  const [order, setOrder] = useState(null);
  const [registeredExpos, setRegisteredExpos] = useState(null);

  useEffect(() => {
    fetchData();
    fetchOrder();
  }, []);

  useEffect(() => {
    if (data && order) {
      const filteredExpos = filterExpos(order, data);
      if (filteredExpos) {
        const currentDate = new Date();
        const _filteredExpos = filteredExpos
          .filter((expo: any) => isAfter(parseISO(expo.expEndDate), currentDate))
          .sort((a: any, b: any) => compareAsc(parseISO(a.expStartDate), parseISO(b.expStartDate)));
        setRegisteredExpos(_filteredExpos);
      }
    }
  }, [data, order])

  const filterExpos = (orders: any, expos: any) => {
    const expoIds = orders.map((order: any) => {
      const itemDetails = JSON.parse(order.eoItemDetails);
      return itemDetails.expId;
    });
    return expos.filter((expo: any) => expoIds.includes(expo.id));
  };

  const fetchOrder = async () => {
    try {
      const orders = await OrderListAPI();
      //console.log(orders?.data?.data?.data, "OrderList")
      setOrder(orders?.data?.data?.data)
      AsyncStorageUtil.saveData('MyOrders', orders?.data?.data?.data);
    } catch (err) {
      console.log('error fetching order-', err)
    }
  }

  const fetchData = async () => {
    setIsLoading(true);
    const url = '?page=1&limit=50'
    try {
      const response = await ExpoListingAPI({ url });
      setData(response?.data?.data?.allExpo)
      const _data = response.data?.data?.allExpo;
      const currentDate = new Date();

      // Filter expos where expRegistrationStartDate matches current date
      const filteredExpos = _data.filter((expo: any) => {
        const currentDate = new Date();
        const registrationStartDate = parseISO(expo.expRegistrationStartDate);
        const registrationEndDate = parseISO(expo.expRegistrationEndDate);
        const expoStartDate = parseISO(expo.expStartDate);

        return isWithinInterval(currentDate, { start: registrationStartDate, end: registrationEndDate })
          && isAfter(expoStartDate, currentDate);
      });

      const currentExpos = _data
        .filter((expo: any) => isAfter(parseISO(expo.expEndDate), currentDate))
        .sort((a: any, b: any) => compareAsc(parseISO(a.expStartDate), parseISO(b.expStartDate)));

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
    fetchOrder();
  };

  const ItemData = [
    <Banner />,
    <EventCardList
      title='Registered Events'
      data={registeredExpos || []}
      isWatched={true}
      noDataText='You are not registered in any events'
    />,
    // <EventCardList
    //   title='New Events'
    //   data={newExpos || []}
    //   isWatched={false}
    // />,
    <EventCardList
      title='Events'
      data={currentExpos || []}
      isWatched={false}
    />
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

