import { FlatList, RefreshControl, StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import TopBar from '../../components/TopBar';
import { ExpoListingAPI } from './apis/ExpoListApi';
import { useNavigation } from '@react-navigation/native';
import EventSmallCard from '../../components/cards/EventSmallCard';
import { COLORS } from '../../constants';
import { compareAsc, isAfter, parseISO } from 'date-fns';
import CustomEventBanner from '../../components/common/CustomEventBanner';
import EventCard from '../../components/cards/EventCard';
import Search from '../../components/common/Search';
import { OrderListAPI } from './apis/OrderListApi';
import AsyncStorageUtil from '../../utils/services/LocalCache';
import { useDispatch } from 'react-redux';
import { Logout } from '../../store/actions';

type Props = {};

type ItemProps = {
  id: string;
  data: any;
};

const EventScreen = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const [activeExpos, setActiveExpos] = useState(null);
  const [order, setOrder] = useState(null);
  const [registeredExpos, setRegisteredExpos] = useState(null);
  const [keyword, setKeyword] = useState<string>('');
  const [isToken, setIsToken] = useState<boolean>(true);

  useEffect(() => {
    if (page === 1) {
      setData([]); // Clear data on initial load or refresh
    }
    if (!isLoading || !isEndReached) {
      getData({ keyword });
    }

  }, [page]);

  useEffect(() => {
    fetchOrder();
    getToken();
  }, [])

  useEffect(() => {
    filterActiveExpos();
  }, [data])

  useEffect(()=>{
    if(keyword.trim()){
      setPage(1); 
      setData([]);
      getData({ keyword });
    }
  },[keyword])

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

  const getToken = async () => {
    const token = await AsyncStorageUtil.getData('token')
    if (token) {
        setIsToken(true)
    } else {
        setIsToken(false)
    }
}


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

  const filterActiveExpos = () => {
    const currentDate = new Date();
    const _activeExpos: any = data.filter((expo: any) =>
      isAfter(parseISO(expo.expEndDate), currentDate)
    );
    setActiveExpos(_activeExpos);
  };

  const getData = async ({ keyword }: any) => {
    const token = await AsyncStorageUtil.getData('token');
        if (!token) {
          Alert.alert('Login Required','Log in or sign up to unlock your personalized journey! Seamlessly view and attend events, both online and offline.',[
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Login',
                    onPress: () => {dispatch(Logout())},
                }
            ]);
            return;
        }
    if (isLoading || isEndReached) return;
    setIsLoading(true);
    try {
      const response = await ExpoListingAPI({ url: `?page=${page}&limit=10`, keyword });
      const _data = response?.data?.data?.allExpo;
      if (_data && _data.length > 0) {
        setData(prevData => [...prevData, ..._data]);
      } else {
        setIsEndReached(true);
      }
    } catch (err) {
      // console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false); // Stop refreshing after data is fetched
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    setIsEndReached(false); // Allow fetching more data again
  };

  const loadMoreData = () => {
    if (!isEndReached && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const Item = ({ id, data }: ItemProps) => {
    return (
      <View style={{ marginHorizontal: 18 }}>
        <EventCard
          key={id}
          url={data.expImage}
          title={data.expName}
          eventStartDate={data.expStartDate}
          eventEndDate={data.expEndDate}
          cardClick={() => { navigation.navigate('EventDetails', { event: data.id }) }}
        />
      </View>
    );
  };

  const handleSearch = (data: any) => {
    //console.log(data,'data')
    setTimeout(() => {
      setKeyword(data);
    }, 1000)
  }

  return (
    <ScreenWrapper>
      <TopBar profile notification={isToken ? true : false} />
      <View style={{ marginVertical: 20, width: '100%', paddingHorizontal: 18 }}>
        <Search
          placeholder='Search'
          onChangeText={(val) => { handleSearch(val) }}
          value={keyword}
        /></View>
      {data ? (
        <FlatList
          data={registeredExpos}
          renderItem={({ item }) => (
            <Item
              key={item.id}
              id={item.id}
              data={item}
            />
          )}
          numColumns={1}
          horizontal={false}
          keyExtractor={(item: any) => item.id}
          style={{ margin: 3, width: '100%' }}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[COLORS.secondary.main]}
            />
          }
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading && !isRefreshing ? <ActivityIndicator size="large" color={COLORS.secondary.main} /> : null}
        />
      ) : <View><Text>No events registered</Text></View>}
    </ScreenWrapper>
  );
};

export default EventScreen;

const styles = StyleSheet.create({});
