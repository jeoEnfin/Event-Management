import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants'
import { calculateTimeDifference, calculateTimeDifferenceForTwoDates, CiTruncate, isDateNotPassed } from '../../utils/common'
import { format } from 'date-fns'

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
}

const EventSmallCard = ({
  url,
  onPress,
  isWatched = true,
  buttonPress,
  isPaid = true,
  price,
  eventType,
  startDate ,
  endDate ,
  regStartDate,
  regEndDate,
  eventTitle,
  createrName
}: Props) => {

  const isRegisterStart =  isDateNotPassed(regStartDate|| '');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}>
      <ImageBackground
        source={{ uri: url ? url : 'https://www.shutterstock.com/image-photo/speaker-giving-talk-on-corporate-600nw-481869205.jpg' }}
        style={{ height: 143, width: '100%' }}
        resizeMode='cover'
      >
        <View style={styles.header}>
          <View style={styles.typeBody}>
            {eventType && <Text style={styles.typeStyle}>{eventType}</Text>}
          </View>
          {isWatched && <View style={styles.infoBody}>
            {endDate &&<Text style={styles.infoStyle}>Event {endDate && calculateTimeDifference(endDate)}</Text>}
          </View>}
        </View>
      {!isWatched && <View style={styles.footer}>
          <View style={styles.regInfoBody}>
            { regEndDate && regStartDate && <Text style={styles.regInfo}>Registration {regEndDate && regStartDate && calculateTimeDifferenceForTwoDates(regStartDate , regEndDate)}</Text>}
          </View>
        </View>}
      </ImageBackground>
      <View style={styles.detailBody}>
        <View style={{ gap: 4, height: 85,justifyContent: 'space-between' }}>
          <Text numberOfLines={2} style={styles.titleTxt}>{eventTitle && CiTruncate(eventTitle, 50)}</Text>
          {createrName && <Text style={styles.createdTxt}>by {createrName && CiTruncate(createrName, 20)}</Text>}
          {startDate && endDate && <Text style={styles.dateBody}>Date : <Text style={styles.dateTxt}>{startDate && format(new Date(startDate), 'dd MMM yyyy')}-{endDate && format(new Date(endDate), 'dd MMM yyyy')}</Text></Text>}
        </View>
        {!isWatched && <View style={styles.priceBody}>
          {isPaid && price && <Text style={styles.priceTxt}>$ {price}/-</Text>}
          <TouchableOpacity disabled={true} style={styles.btnBody} onPress={buttonPress}>
            <Text style={styles.btnText}>{isPaid ? 'Register' : 'Join'}</Text>
          </TouchableOpacity>
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
    left: '18%'
  },
  regInfoBody: {
    height: 21,
    backgroundColor: COLORS.secondary.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  regInfo: {
    color: COLORS.text.primary,
    fontSize: 10,
    fontWeight: '600',
    marginHorizontal: 7
  }
})