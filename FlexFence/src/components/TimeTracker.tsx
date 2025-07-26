
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // or use another icon set

const TimeTracker = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (secs: number) => {
    const hrs = String(Math.floor(secs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const secsStr = String(secs % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secsStr}`;
  };

  const progress = (seconds % 3600) / 3600 * 100; // example for 1 hour max

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live time{'\n'}tracker</Text>
      <AnimatedCircularProgress
        size={160}
        width={10}
        fill={progress}
        tintColor="#00BCD4"
        backgroundColor="#E0E0E0"
        rotation={0}
        lineCap="round"
      >
        {() => (
          <View style={styles.center}>
            <Text style={styles.timeText}>{formatTime(seconds)}</Text>
            <Text style={styles.workText}>Work time</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <TouchableOpacity onPress={() => setRunning((r) => !r)} style={styles.button}>
        <LinearGradient
          colors={['#1F229A', '#0BC1D8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Ionicons name={running ? 'pause' : 'play'} size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#D7E8FC',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    position: 'absolute',
    top: 12,
    left: 16,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    textAlign: 'left',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  workText: {
    fontSize: 12,
    color: '#999',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  gradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TimeTracker;
