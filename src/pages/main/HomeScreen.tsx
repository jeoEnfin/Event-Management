import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../../components/ScreenWrapper'
import TopBar from '../../components/TopBar'
import { ExpoListingAPI } from './apis/ExpoListApi'
import { COLORS } from '../../constants'
import { compareAsc, isAfter, isSameDay, isWithinInterval, parseISO } from 'date-fns'
import { OrderListAPI } from './apis/OrderListApi'
import AsyncStorageUtil from '../../utils/services/LocalCache'
import Search from '../../components/common/Search'
import EventCard from '../../components/cards/EventCard'
import { config } from '../../utils/config'



type Props = {

}

type ItemProps = {
  id: string;
  data: any;
}

const HomeScreen = (props: Props) => {
  const navigation: any = useNavigation()
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [newExpos, setNewExpos] = useState(null);
  const [currentExpos, setCurrentExpos] = useState([]);
  const [order, setOrder] = useState(null);
  const [registeredExpos, setRegisteredExpos] = useState(null);
  const [keyword, setKeyword] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isToken, setIsToken] = useState<boolean>(true);

  useEffect(() => {
    fetchData({ keyword });
    getToken();
  }, []);

  useEffect(()=>{
    if(isToken){
      //fetchOrder();
    }
  },[isToken])

  useEffect(() => {
    if (data) {
      currentExpo(data)
    }
  }, [data])

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

  useEffect(() => {
    //console.log(keyword, 'keyword')
    fetchData({ keyword });
  }, [keyword])

  const getToken = async () => {
    const token = await AsyncStorageUtil.getData('token')
    if (token) {
      setIsToken(true)
    } else {
      setIsToken(false)
    }
  }

  const setTenant = async () => {
    await AsyncStorageUtil.saveData('tenant_id', config.DEFAULT_TENANT)
  }

  const filterExpos = (orders: any, expos: any) => {
    const expoIds = orders.map((order: any) => {
      const itemDetails = JSON.parse(order.eoItemDetails);
      return itemDetails.expId;
    });
    return expos.filter((expo: any) => expoIds.includes(expo.id));
  };

  const fetchOrder = async () => {
    if(!isToken) return null;
    try {
      const orders = await OrderListAPI();
      //console.log(orders?.data?.data?.data, "OrderList")
      setOrder(orders?.data?.data?.data)
      AsyncStorageUtil.saveData('MyOrders', orders?.data?.data?.data);
    } catch (err) {
      console.log('error fetching order-', err)
    }
  }

  const fetchData = async ({ keyword }: any) => {
    setIsLoading(true);
    const url = '?page=1&limit=30'
    try {
      const response = await ExpoListingAPI({ url, keyword });
      setData(response?.data?.data?.allExpo)
      const _data = response.data?.data?.allExpo;
      //console.log('ExpoListing',_data)

      // Filter expos where expRegistrationStartDate matches current date
      const filteredExpos = _data.filter((expo: any) => {
        //console.log(expo.expRegistrationStartDate,expo.expRegistrationEndDate,'wwww')
        if(!expo.expRegistrationStartDate || !expo.expRegistrationEndDate || !expo.expStartDate){
          return;
        }
        const currentDate = new Date();
        const registrationStartDate = parseISO(expo.expRegistrationStartDate);
        const registrationEndDate = parseISO(expo.expRegistrationEndDate);
        const expoStartDate = parseISO(expo.expStartDate);
      
        return isWithinInterval(currentDate, { start: registrationStartDate, end: registrationEndDate })
          && isAfter(expoStartDate, currentDate);
      });

      if(filteredExpos){
        setNewExpos(filteredExpos);
      }
      
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.response)
    }
  };

  const currentExpo = (data: any) => {
    const currentDate = new Date();
    
    const _currentExpos = data
      .filter((expo: any) => {
        // Check if both expStartDate and expEndDate are defined
        const hasValidDates = expo.expStartDate && expo.expEndDate;
        // Further filter by checking if expEndDate is after the current date
        return hasValidDates && isAfter(parseISO(expo.expEndDate), currentDate);
      })
      .sort((a: any, b: any) => compareAsc(parseISO(a.expStartDate), parseISO(b.expStartDate)));
    
    if (_currentExpos.length >= 0) {
      setCurrentExpos(_currentExpos);
    }
  };

  const onRefresh = async () => {
    fetchData({ keyword });
    //fetchOrder();
    setTenant();
  };

  const handleSearch = (data: any) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout); // Clear the previous timeout
    }
    setTenant();
    const timeout = setTimeout(() => {
      setKeyword(data);
    }, 500); // Delay of 500ms
    setSearchTimeout(timeout);
  }

  const handleDetailsPage = async (id: string, tenantId: string)=>{
    console.log(id,tenantId);
    await AsyncStorageUtil.saveData('tenant_id', tenantId);
    navigation.navigate('EventDetails', { event: id, tenantId });
  }

  const Item = ({ id, data }: ItemProps) => {
    //console.log(data, 'data')
    return (
      <View style={{ marginHorizontal: 18 }}>
        <EventCard
          key={id}
          url={data.expImage}
          title={data.expName}
          eventStartDate={data.expStartDate}
          eventEndDate={data.expEndDate}
          cardClick={() => {handleDetailsPage(data.expCode, data.expTenantId)}}
          tenantId={data.expTenantId}
        />
      </View>
    )
  }


  return (
    <ScreenWrapper>
      <TopBar title='Join '
        profile
        notification={isToken ? true : false}
      />
      <View style={{ marginVertical: 20, width: '100%', paddingHorizontal: 18 }}>
        <Search
          placeholder='Search'
          onChangeText={(val) => { handleSearch(val) }}
          value={keyword}
        /></View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={currentExpos || []}
        renderItem={({ item }) =>
          <Item
            key={item.id}
            id={item.id}
            data={item}
          />
        }
        keyExtractor={(item: any) => item.id}
        style={{ width: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={[COLORS.secondary.main]}
          />
        }
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text style={{
              color: COLORS.text.main,
              fontWeight: '600',
              fontSize: 20,
            }}>No Events to list</Text>
          </View>
        }
      />
    </ScreenWrapper>
  )
}

export default HomeScreen



