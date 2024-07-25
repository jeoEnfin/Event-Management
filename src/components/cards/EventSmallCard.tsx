import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants'
import { calculateTimeDifference, calculateTimeDifferenceForTwoDates, CiTruncate, isDateNotPassed, isDurationLessThan24Hours } from '../../utils/common'
import { format } from 'date-fns'
import { config } from '../../utils/config'


type Props = {
  url?: string;
  onPress?: () => void;
  isWatched?: boolean;
  buttonPress?: () => void;
  isPaid?: boolean;
  price?: string;
  eventType?: string;
  startDate?: string;
  endDate?: string;
  regStartDate?: string;
  regEndDate?: string;
  eventTitle?: string;
  createrName?: string;
  isRegistrationEnabled?: boolean;
  viewPress?: ()=>void;
}

const EventSmallCard = ({
  url,
  onPress,
  isWatched = true,
  buttonPress,
  isPaid = true,
  price,
  eventType,
  startDate,
  endDate,
  regStartDate,
  regEndDate,
  eventTitle,
  createrName,
  isRegistrationEnabled,
  viewPress
}: Props) => {

  const isRegisterEnded = isDateNotPassed(regEndDate || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEventEnded, setIsEventEnded] = useState<boolean>(false);
  const [isBelow24H,setIsBelow24H] = useState<boolean>(false);

  useEffect(()=>{
    if(regStartDate && regEndDate){
      const _isEnded = calculateTimeDifferenceForTwoDates(regStartDate, regEndDate);
      const _isBelow24H = isDurationLessThan24Hours(regEndDate);
      
      if(_isBelow24H){
        setIsBelow24H(_isBelow24H);
      }
      
      if(_isEnded === 'ended'){
        setIsEventEnded(true);
      }else{
        setIsEventEnded(false);
      }

    }

  },[regStartDate,regEndDate])

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}>
      <View
        style={{ height: 143, width: '100%' }}
      >{loading && (
        <View style={styles.previewContainer}>
          <Image source={require('../../assets/errors/plainBackground.jpg')} style={styles.preview} />
          <ActivityIndicator style={styles.loader} size="large" color={COLORS.secondary.main} />
        </View>
      )}
        <Image
          style={styles.image}
          source={{ 
            uri: url === 'default.jpg' 
              ? `${config.CLOUD_FRONT_URL}/uploads/${config.SERVER_DOMAIN}/default/expo/default.jpg` 
              : (url && (url.startsWith('https') || url.startsWith('http')))
                ? url 
                : `${config.CLOUD_FRONT_URL}/uploads/${config.SERVER_DOMAIN}/default/expo/${url}` 
          }}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            console.info('error')
            setLoading(false);
            setError(true);
          }}
        />
        <View style={styles.header}>
          <View style={styles.typeBody}>
            {eventType && <Text style={styles.typeStyle}>{eventType}</Text>}
          </View>
          {isWatched && <View style={styles.infoBody}>
            {endDate && <Text style={styles.infoStyle}>Event {endDate && calculateTimeDifference(startDate,endDate)}</Text>}
          </View>}
        </View>
        {!isWatched && <View style={styles.footer}>
          <View style={styles.regInfoBody}>
            {regEndDate && regStartDate && <Text style={[styles.regInfo,isEventEnded && {backgroundColor: COLORS.text.error}, isBelow24H && {backgroundColor: 'orange'}]}>Event registration {regEndDate && regStartDate && calculateTimeDifferenceForTwoDates(regStartDate, regEndDate)}</Text>}
          </View>
        </View>}
      </View>
      <View style={styles.detailBody}>
        <View style={{ gap: 4, height: 70, justifyContent: 'space-between' }}>
          <Text numberOfLines={2} style={styles.titleTxt}>{eventTitle && CiTruncate(eventTitle, 50)}</Text>
          {/* {createrName && <Text style={styles.createdTxt}>by {createrName && CiTruncate(createrName, 20)}</Text>} */}
          {startDate && endDate && <Text style={styles.dateBody}>Date : <Text style={styles.dateTxt}>{startDate && format(new Date(startDate), 'dd MMM yyyy')}-{endDate && format(new Date(endDate), 'dd MMM yyyy')}</Text></Text>}
        </View>
        {!isWatched && <View style={styles.priceBody}>
          {(isPaid && price) ? <Text style={styles.priceTxt}>$ {price}/-</Text> : <Text style={styles.priceTxt}>FREE</Text>}
          {isRegisterEnded ? <TouchableOpacity disabled={true} style={styles.btnBody} onPress={buttonPress}>
            <Text style={styles.btnText}>{isRegistrationEnabled ? 'Register' : 'View'}</Text>
          </TouchableOpacity> : <TouchableOpacity disabled={true} style={styles.btnBody} onPress={viewPress}>
            <Text style={styles.btnText}>View</Text>
          </TouchableOpacity>}
        </View>}
      </View>
    </TouchableOpacity>
  )
}

export default EventSmallCard

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 'auto',
    backgroundColor: COLORS._background.primary,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  btnText: {
    color: COLORS.secondary.main,
    fontWeight: '600'
  },
  btnBody: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.secondary.main,
    height: 39,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  detailBody: {
    padding: 10,
    width: '100%',
    marginVertical: 5,
  },
  priceBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7
  },
  priceTxt: {
    color: COLORS.text.main,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 7
  },
  titleTxt: {
    color: COLORS.text.main,
    fontSize: 16,
    fontWeight: '700'
  },
  createdTxt: {
    color: COLORS.text.main,
    fontSize: 12,
    fontWeight: '500'
  },
  dateBody: {
    color: COLORS.text.main,
    fontSize: 12,
    fontWeight: '400'
  },
  dateTxt: {
    color: COLORS.text.main,
    fontSize: 13,
    fontWeight: '600'
  },
  typeStyle: {
    color: COLORS.text.primary,
    fontSize: 10,
    fontWeight: '600',
    marginHorizontal: 5
  },
  infoStyle: {
    color: COLORS.text.primary,
    fontSize: 10,
    fontWeight: '600',
    marginHorizontal: 5
  },
  typeBody: {
    backgroundColor: COLORS.default.dark,
    height: 19,
    maxWidth: '25%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    top: 5,
    left: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  infoBody: {
    backgroundColor: COLORS.info.main,
    height: 21,
    maxWidth: '70%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    top: 5,
    right: 5
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  regInfoBody: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  regInfo: {
    color: COLORS.text.primary,
    backgroundColor: COLORS.secondary.main,
    fontSize: 10,
    fontWeight: '600',
    padding: 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '90%'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute'
  },
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  loader: {
    position: 'absolute',
  },
  errorImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
})