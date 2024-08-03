import { FlatList, RefreshControl, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import TopBar from '../../components/TopBar';
import { ExpoListingAPI } from './apis/ExpoListApi';
import { useNavigation } from '@react-navigation/native';
import EventSmallCard from '../../components/cards/EventSmallCard';
import { COLORS } from '../../constants';
import { isAfter, parseISO } from 'date-fns';
import CustomEventBanner from '../../components/common/CustomEventBanner';

type Props = {};

type ItemProps = {
  id: string;
  data: any;
};

const EventScreen = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const [activeExpos, setActiveExpos] = useState(null);

  useEffect(() => {
    if (page === 1) {
      setData([]); // Clear data on initial load or refresh
    }
    if (!isLoading || !isEndReached) {
      getData();
    }

  }, [page]);

  useEffect(() => {
    filterActiveExpos();
  }, [data])

  const filterActiveExpos = () => {
    const currentDate = new Date();
    const _activeExpos: any = data.filter((expo: any) =>
      isAfter(parseISO(expo.expEndDate), currentDate)
    );
    setActiveExpos(_activeExpos);
  };

  const getData = async () => {
    if (isLoading || isEndReached) return;

    setIsLoading(true);
    try {
      const response = await ExpoListingAPI({ url: `?page=${page}&limit=10` });
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
      <View style={{ marginVertical: 6,paddingHorizontal: 16}}>
        <CustomEventBanner
          key={id}
          url={data.expBanerImage}
          eventType={data.expType}
          startDate={data.expStartDate}
          endDate={data.expEndDate}
          eventTitle={data.expName}
          isWatched={false}
          isPaid={data.expIsPaid}
          regStartDate={data.expRegistrationStartDate}
          regEndDate={data.expRegistrationEndDate}
          createrName={data.expCreator}
          price={data.expPrice}
          isRegistrationEnabled={data.expIsRegistrationEnabled}
          onPress={() => navigation.navigate('EventDetails', { event: data.id })}
          buttonPress={() => navigation.navigate('EventDetails', { event: data.id })}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <TopBar profile notification search />
      <View style={{width: '100%',paddingHorizontal: 22,marginBottom: 10,marginTop: 20}}>
        <Text style={{fontSize: 20,fontWeight: '600',color: COLORS.text.main}}>Events</Text>
      </View>
      {data && (
        <FlatList
          data={activeExpos}
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
      )}
    </ScreenWrapper>
  );
};

export default EventScreen;

const styles = StyleSheet.create({});
