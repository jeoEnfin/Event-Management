import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { config } from '../../utils/config';
import { format } from 'date-fns';

type Props = {
    url?: string; 
    title?: string;
    eventStartDate?: string;
    eventEndDate?: string;
    cardClick?: ()=>void;
}

const EventCard = ({
    url,
    title,
    eventStartDate,
    eventEndDate,
    cardClick
}: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={cardClick} >
            <View style={styles.logoContainer}>
                <Image
                    source={{ 
                        uri: url === 'default.webp' 
                          ? `${config.CLOUD_FRONT_URL}/uploads/ci/default/expo/default.webp` 
                          : (url && (url.startsWith('https') || url.startsWith('http')))
                            ? url 
                            : `${config.CLOUD_FRONT_URL}/uploads/ci/${config.SERVER_DOMAIN}/expo/${url}` 
                      }}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={styles.detailsContainer}>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.titleTxt}>{title}</Text>
                {eventStartDate && eventEndDate && <Text style={styles.dateBody}>Date : <Text style={styles.dateTxt}>{eventStartDate && format(new Date(eventStartDate), 'dd MMM yyyy')}-{eventEndDate && format(new Date(eventEndDate), 'dd MMM yyyy')}</Text></Text>}
                </View>
        </TouchableOpacity>
    )
}

export default EventCard

const styles = StyleSheet.create({
    container: {
     width: '100%',
     height: 97,
     backgroundColor: COLORS._background.primary,
     padding: 12,
     marginVertical: 9,
     borderRadius: 6,
     elevation: 5,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
     flexDirection: 'row',
     alignItems: 'center'
    },
    logoContainer: {
        width: 73,
        height: 73,
        borderRadius: 6,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        borderWidth: 2,
        borderColor: COLORS.secondary.main
    },
    detailsContainer: {
        flex: 1,
        paddingHorizontal: 10,
        height: '100%',
        justifyContent: 'space-between',
        paddingVertical: 3
    },
    titleTxt: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text.main
    },
    dateBody: {
        color: COLORS.text.main,
        fontSize: 12,
        fontWeight: '400'
      },
      dateTxt: {
        color: COLORS.text.main,
        fontSize: 14,
        fontWeight: '600'
      },
})