import React from 'react';
import { View, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const LineChartComponent = ({ data }) => {
    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Text and axis color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#1f77b4',
        },
      };
    

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartContainer}>
      <LineChart
          data={data}
          width={screenWidth - 40} 
          height={220}
          chartConfig={{
            ...chartConfig,
            yAxisLabel: '', 
            yAxisSuffix: '', 
            propsForBackgroundLines: {
              strokeWidth: 0, 
            },
          }}
          bezier
          style={styles.chartStyle}
        />
       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chartContainer: {
    position: 'relative',
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  chartStyle: {
    borderRadius: 16,
  },
  
});

export default LineChartComponent;
