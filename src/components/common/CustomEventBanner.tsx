import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants'
import { calculateTimeDifference, calculateTimeDifferenceForTwoDates, CiTruncate, isDateNotPassed } from '../../utils/common'
import { format } from 'date-fns'
import { config } from '../../utils/config'
import { Icon } from 'react-native-elements'


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
  viewPress?: () => void;
}

const CustomEventBanner = ({
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

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}>
      <View
        style={{ height: 218, width: '100%', overflow: 'hidden', borderRadius: 12 }}
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
              : (url && (url.startsWith('https' || 'http') 
                ? url 
                : `${config.CLOUD_FRONT_URL}/${url}` ))
          }}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            console.info('error')
            setLoading(false);
            setError(true);
          }}
        />
        <Image
          style={styles.shade}
          resizeMode='stretch'
          source={require('../../assets/ci/bannerShade2.png')}
          alt='No image'
        />
        <View style={styles.header}>
          <View style={styles.typeBody}>
            {eventType && <Text style={styles.typeStyle}>{eventType}</Text>}
          </View>
          {!isWatched && <View style={styles.infoBody}>
            {regEndDate && regStartDate && <Text style={styles.infoStyle}>Event registration {regEndDate && regStartDate && calculateTimeDifferenceForTwoDates(regStartDate, regEndDate)}</Text>}
          </View>}
        </View>
        {/* {!isWatched && <View style={styles.footer}>
              <View style={styles.regInfoBody}>
                {regEndDate && regStartDate && <Text style={styles.regInfo}>Registration {regEndDate && regStartDate && calculateTimeDifferenceForTwoDates(regStartDate, regEndDate)}</Text>}
              </View>
            </View>} */}
        <View style={styles.detailBody}>
          <View style={{ gap: 10, height: 85, justifyContent: 'flex-end' }}>
            <Text numberOfLines={2} style={styles.titleTxt}>{eventTitle && CiTruncate(eventTitle, 50)}</Text>
            {createrName && <Text style={styles.createdTxt}>by {createrName && CiTruncate(createrName, 20)}</Text>}
            {startDate && endDate && <Text style={styles.dateBody}>Date : <Text style={styles.dateTxt}>{startDate && format(new Date(startDate), 'dd MMM yyyy')}-{endDate && format(new Date(endDate), 'dd MMM yyyy')}</Text></Text>}
          </View>
          {!isWatched && <View style={styles.priceBody}>
            {(isPaid && price) ?
              <View style={{flexDirection: 'row',alignItems: 'center',gap : 5}}>
                <Icon name='euro' color={COLORS.text.primary} size={22} />
                <Text style={styles.priceTxt}>{price}/-</Text>
              </View>
              : <Text style={styles.priceTxt}>FREE</Text>}
           {isRegisterEnded ? <TouchableOpacity disabled={true} style={styles.btnBody} onPress={buttonPress}>
            <Text style={styles.btnText}>{isRegistrationEnabled ? 'Register' : 'View'}</Text>
          </TouchableOpacity> : <TouchableOpacity disabled={true} style={styles.btnBody} onPress={viewPress}>
            <Text style={styles.btnText}>View</Text>
          </TouchableOpacity>}
          </View>}
        </View>
      </View>

    </TouchableOpacity>
  )
}

export default CustomEventBanner

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 'auto',
    backgroundColor: COLORS._background.primary,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  btnText: {
    color: COLORS.text.primary,
    fontWeight: '600',
    fontSize: 14
  },
  btnBody: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.secondary.main,
    height: 42,
    width: 95,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: COLORS.secondary.main
  },
  detailBody: {
    flex: 1,
    padding: 20,
    width: '100%',
    marginVertical: 4,
    position: 'absolute',
    bottom: 0
  },
  priceBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  },
  priceTxt: {
    color: COLORS.text.primary,
    fontSize: 22,
    fontWeight: '700',
  },
  titleTxt: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: '700'
  },
  createdTxt: {
    color: COLORS.text.primary,
    fontSize: 12,
    fontWeight: '500'
  },
  dateBody: {
    color: COLORS.text.primary,
    fontSize: 12,
    fontWeight: '400'
  },
  dateTxt: {
    color: COLORS.text.primary,
    fontSize: 14,
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
    backgroundColor: COLORS.default.primary,
    height: 19,
    maxWidth: '25%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    top: 11,
    left: 18
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  infoBody: {
    backgroundColor: COLORS.secondary.main,
    height: 21,
    maxWidth: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    borderBottomLeftRadius: 10
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    position: 'absolute',
    borderRadius: 12,
  },
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
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
  shade: {
    width: '100%',
    height: 218,
    position: 'absolute',
    borderRadius: 12
  },
})