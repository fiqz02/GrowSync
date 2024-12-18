import { onValueWritten } from "firebase-functions/v2/database";
import * as admin from "firebase-admin";

admin.initializeApp();

const messaging = admin.messaging();

// Define thresholds for sensors
const SENSOR_THRESHOLDS = {
  temperature: { min: 20, max: 35 },
  humidity: { min: 50, max: 90 },
  pH: { min: 5, max: 9 },
  waterLevel: { min: 25, max: 100 },
} as const;

type SensorType = keyof typeof SENSOR_THRESHOLDS;

export const sensorAlert = onValueWritten(
  {
    ref: "irrigationSystemLogs/{sensorType}/{timestamp}", // Database path
    region: "asia-southeast1", // Use the database's region
  },
  async (event) => {
    const sensorType = event.params.sensorType as SensorType;

    if (!(sensorType in SENSOR_THRESHOLDS)) {
      console.error(`Invalid sensorType: ${sensorType}`);
      return;
    }

    const afterValue = event.data?.after?.val();

    if (!afterValue) {
      console.error(`No value found for sensorType: ${sensorType}`);
      return;
    }

    const { min, max } = SENSOR_THRESHOLDS[sensorType];

    if (afterValue < min || afterValue > max) {
      const alertMessage = `Alert! The ${sensorType} value is out of range: ${afterValue}. Threshold: ${min}-${max}`;
      console.log(alertMessage);

      // Updated Notification Logic
      try {
        await messaging.send({
          topic: "sensor-alerts",
          notification: {
            title: "Sensor Alert 🚨",
            body: alertMessage,
          },
          android: {
            priority: "high",
          },
          apns: {
            payload: {
              aps: {
                alert: {
                  title: "Sensor Alert 🚨",
                  body: alertMessage,
                },
                sound: "default",
              },
            },
          },
        });

        console.log(`Notification sent successfully for ${sensorType}: ${afterValue}`);
      } catch (error) {
        console.error("Failed to send notification:", error);
      }
    }
  }
);
