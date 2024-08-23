import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { differenceInSeconds, formatDuration, intervalToDuration } from 'date-fns';
import { COLORS } from '../../../constants';

type CountdownTimerProps = {
  endTime: string; // The time the countdown ends
  style?: StyleProp<ViewStyle>;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime, style }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endDate = new Date(endTime);

    const updateTimer = () => {
      const now = new Date();
      const duration = differenceInSeconds(endDate, now);

      if (duration > 0) {
        const timeInterval = intervalToDuration({
          start: now,
          end: endDate,
        });

        setTimeLeft({
          days: timeInterval.days || 0,
          hours: timeInterval.hours || 0,
          minutes: timeInterval.minutes || 0,
          seconds: timeInterval.seconds || 0,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.timeBody}>
        <Text style={styles.timerText}>{timeLeft.days}</Text>
        <Text style={styles.labelText}>Days</Text>
      </View>
      <View style={styles.gapLine}></View>
      <View style={styles.timeBody}>
        <Text style={styles.timerText}>{timeLeft.hours}</Text>
        <Text style={styles.labelText}>Hours</Text>
      </View>
      <View style={styles.gapLine}></View>
      <View style={styles.timeBody}>
        <Text style={styles.timerText}>{timeLeft.minutes}</Text>
        <Text style={styles.labelText}>Minites</Text>
      </View>
      <View style={styles.gapLine}></View>
      <View style={styles.timeBody}>
        <Text style={styles.timerText}>{timeLeft.seconds}</Text>
        <Text style={styles.labelText}>Seconds</Text>
      </View>
      {/* <Text style={styles.timerText}>
        {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: COLORS._background.primary,
    borderRadius: 10,
    flexDirection: 'row',
    width: '90%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.main,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.text.default,
    marginTop: 5,
  },
  timeBody: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  gapLine: {
    width: 1,
    height: '90%',
    backgroundColor: COLORS.text.disable,
    //marginHorizontal: 10,
  }
});

export default CountdownTimer;