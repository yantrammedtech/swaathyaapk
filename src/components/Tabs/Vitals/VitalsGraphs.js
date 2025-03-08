import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { authFetch } from '../../../axios/authFetch';
import dayjs from 'dayjs';

let VitalsGraphs = ({ category, user, patientID ,unit}) => {
  const [vitals, setVitals] = useState([]);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  // Set unit dynamically, '°C' for temperature
   unit = category === 'temperature' ? '°C' : unit;

  const getFilteredData = useCallback(async () => {
    try {
      const response = await authFetch(
        `vitals/${user.hospitalID}/${patientID}/single?vital=${category}&date=${date}`,
        user.token
      );
      if (response.message === "success" && response.vitals) {
        setVitals(response.vitals);
      } else {
        setVitals([]);
      }
    } catch (error) {
      console.error('Failed to fetch vitals:', error);
      setVitals([]);
    }
  }, [category, date, patientID, user.hospitalID, user.token]);

  useEffect(() => {
    getFilteredData();
  }, [getFilteredData]);

  const chartData = React.useMemo(() => {
    const filtered = vitals
      .filter((v) => {
        const timeKey = `${category}Time`;
        const valueKey = category;

        return v[timeKey] && !isNaN(Number(v[valueKey]));
      })
      .map((v) => {
        const timeKey = `${category}Time`;
        const valueKey = category;

        const adjustedTime = dayjs(v[timeKey]).add(5, 'hour').add(30, 'minute');

        return {
          time: adjustedTime.format('HH:mm'),
          value: Number(v[valueKey])
        };
      });

    return {
      labels: filtered.map((item) => item.time),
      datasets: [
        {
          data: filtered.map((item) => item.value),
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        }
      ],
      legend: [`${category} (${unit})`]
    };
  }, [vitals, category, unit]);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <View style={{ flex: 1 }}>
      {chartData?.labels?.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ width: Math.max(chartData.labels.length * 50, 350) }}>
            <LineChart
              data={chartData}
              width={Math.max(chartData.labels.length * 50, 350)} // Dynamically set width
              height={220}
              yAxisLabel=""
              yAxisSuffix={` ${unit}`}
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                marginLeft:10,
                borderRadius: 16,
              }}
            />
          </View>
        </ScrollView>
      ) : (
        <Text style={{ textAlign: 'center' }}>No data available</Text>
      )}
    </View>
  );
};

export default VitalsGraphs;
