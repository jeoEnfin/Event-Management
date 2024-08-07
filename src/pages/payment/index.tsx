import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormData from './Registration'
import { COLORS } from '../../constants'
import { GetRegistrationFieldsAPI } from './api/Registration-Fields'
import ScreenWrapper from '../../components/ScreenWrapper'

type Props = {
  route: any;
}

const Payment = ({route}: Props) => {
  const { event } = route.params;
  const [fieldData, setFieldData] = useState([]);
  
  useEffect(() => {
    getFields();
  }, [])

  const getFields = async () => {
    try {
      let fields = await GetRegistrationFieldsAPI();
      if (fields) {
        setFieldData(fields?.data?.data)
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <ScreenWrapper>
      <View style={{ width: '100%' }}>
        {fieldData && <FormData data={fieldData} eventData={event} />}
      </View>
    </ScreenWrapper>
  )
}

export default Payment

const styles = StyleSheet.create({})