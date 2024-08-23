import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormData from './Registration'
import { COLORS } from '../../constants'
import { GetRegistrationFieldsAPI } from './api/Registration-Fields'
import ScreenWrapper from '../../components/ScreenWrapper'
import AsyncStorageUtil from '../../utils/services/LocalCache'
import OverlayLoader from '../../components/modals/OverlayLoader'

type Props = {
  route: any;
}

const Payment = ({ route }: Props) => {
  const { event } = route.params;
  const [fieldData, setFieldData] = useState([]);
  const [loading , setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (event) {
      getFields();
    }
  }, [event])

  const getFields = async () => {
    setLoading(true);
    await AsyncStorageUtil.saveData('tenant_id', event.expTenantId)
    try {
      const fields = await GetRegistrationFieldsAPI({ expId: event?.id });
      //console.log(fields?.data?.data?.data,'Registration')
      if (fields?.data?.data?.data) {
        const filteredFields: any = filterByStatus(fields?.data?.data?.data);
        console.log(filteredFields, 'filteredFields')
        setFieldData(filteredFields)
      }
      setLoading(false);
    } catch (err: any) {
      console.log(err, 'er----')
      setLoading(false);
    }
  }

  const filterByStatus = (data: any[]) => {
    return data.filter(item => item.pFStatus === 1);
  };

  return (
    <ScreenWrapper>
      <View style={{ width: '100%' }}>
        {!loading && <FormData data={fieldData} eventData={event} />}
      </View>
      <OverlayLoader visible={loading} />
    </ScreenWrapper>
  )
}

export default Payment

const styles = StyleSheet.create({})