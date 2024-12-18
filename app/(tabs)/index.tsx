import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import { database } from '../firebase.config';
import { ref, onValue } from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';

// Define the structure of each sensor's data
type Sensor = {
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  normalRange?: string;
};

// Icon mapping for sensors
const SensorIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Temperature':
      return <Icon source="thermometer" size={24} color="#FFFFFF" />;
    case 'Humidity':
      return <Icon source="water-percent" size={24} color="#FFFFFF" />;
    case 'pH Level':
      return <Icon source="flask" size={24} color="#FFFFFF" />;
    case 'Water Level':
      return <Icon source="waves" size={24} color="#FFFFFF" />;
    default:
      return null;
  }
};

// Determine status color based on value ranges
const getStatusColor = (value: number, min: number, max: number) => {
  if (value < min) return '#F44336'; // Red (Danger)
  if (value > max) return '#FFC107'; // Yellow (Warning)
  return '#32CD32'; // Green (Safe)
};

const EnhancedMonitoringDashboard = () => {
  const [sensorsData, setSensorsData] = useState<Sensor[]>([]);

  useEffect(() => {
    const dataRef = ref(database, 'irrigationSystemLogs');

    const listener = onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log('Fetched Data:', data); // Debugging fetched data
        if (data) {
          // Function to retrieve the latest value from a timestamped object
          const getLatestValue = (sensorData: { [timestamp: string]: number }) => {
            const timestamps = Object.keys(sensorData);
            const latestTimestamp = timestamps.sort().pop(); // Get latest timestamp
            return latestTimestamp ? sensorData[latestTimestamp] : 0;
          };

          // Mapping formatted sensor data
          const formattedData: Sensor[] = [
            {
              name: 'Temperature',
              value: getLatestValue(data.temperature),
              unit: '°C',
              min: 20,
              max: 35,
              normalRange: '20-30 °C',
            },
            {
              name: 'Humidity',
              value: getLatestValue(data.humidity),
              unit: '%',
              min: 50,
              max: 90,
              normalRange: '60-80 %',
            },
            {
              name: 'pH Level',
              value: getLatestValue(data.pH),
              unit: 'pH',
              min: 4,
              max: 8,
              normalRange: '6.0-7.0 pH',
            },
            {
              name: 'Water Level',
              value: getLatestValue(data.waterLevelPercentage),
              unit: '%',
              min: 0,
              max: 100,
            },
          ];

          setSensorsData(formattedData);
        }
      },
      (error) => {
        console.error('Error fetching data from Firebase:', error);
      }
    );

    return () => listener(); // Cleanup listener
  }, []);

  const getProgress = (value: number, min: number, max: number) => {
    return (value - min) / (max - min);
  };

  return (
    <LinearGradient colors={['#87CEEB', '#4682B4']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Monitoring Dashboard</Text>

        {sensorsData.length > 0 ? (
          <View style={styles.rowContainer}>
            {sensorsData.map((sensor, index) => {
              const statusColor = getStatusColor(sensor.value, sensor.min, sensor.max);

              return (
                <View key={index} style={styles.sensorCard}>
                  <View style={styles.iconLabelRow}>
                    <SensorIcon type={sensor.name} />
                    <Text style={styles.sensorLabel}>{sensor.name}</Text>
                  </View>
                  <Text style={styles.valueLabel}>
                    {sensor.value} {sensor.unit}
                  </Text>
                  <Progress.Bar
                    progress={getProgress(sensor.value, sensor.min, sensor.max)}
                    width={null}
                    height={10}
                    color={statusColor}
                    unfilledColor="rgba(255, 255, 255, 0.3)"
                    borderWidth={0}
                    borderRadius={5}
                    style={styles.progressBar}
                  />
                  {sensor.normalRange && (
                    <Text style={styles.normalRange}>Normal: {sensor.normalRange}</Text>
                  )}
                </View>
              );
            })}
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading data...</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'column',
  },
  sensorCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    marginBottom: 15,
    width: '100%',
    borderRadius: 15,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sensorLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  valueLabel: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginVertical: 5,
  },
  progressBar: {
    marginVertical: 8,
  },
  normalRange: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 3,
    color: '#FFFFFF',
  },
  loadingText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default EnhancedMonitoringDashboard;
