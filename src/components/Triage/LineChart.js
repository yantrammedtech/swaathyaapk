import React, { useEffect } from 'react';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { authFetch } from '../../axios/authFetch';
import { useSelector } from 'react-redux';
import { patientStatus } from '../../utility/role';

// Get screen width for responsive design
const screenWidth = Dimensions.get('window').width;

const LineChartComponent = ({currentMonth}) => {
  const user = useSelector((state) => state.currentUserData);
  const [dataTable, setDataTable] = React.useState([]);

  const zoneType = {
    red: '1',
    yellow: '2',
    green: '3',
  };

  const filterMonth = 'year';
  const filterValue = '';
  // const filterMonth = currentMonth ? 'month' : 'year';
  // const filterValue = currentMonth 
  //   ? (new Date(currentMonth).getMonth() + 1).toString()  // Extract month (1-based index)
  //   : new Date().getFullYear().toString();  // Use current year

  const barData = async () => {
    try {
      const barGraphResponse = await authFetch(
        `patient/${user.hospitalID}/patients/count/fullYearFilter/${patientStatus.emergency}?filter=${filterMonth}&filterValue=${filterValue}&zone=${[
          zoneType.red,
          zoneType.green,
          zoneType.yellow,
        ].join(',')}`,
        user.token
      );

      if (barGraphResponse.message === 'success') {
        setDataTable(barGraphResponse.counts || []);
      }
    } catch (error) {
      console.error('Error fetching bar data:', error);
    }
  };

  useEffect(() => {
    barData();
  }, []);

  // Define all months of the year
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  // Initialize counts for all months
  const counts = months.map(month => ({
    month,
    count: 0,
  }));

  // Update counts with the data from the backend
  dataTable.forEach(item => {
    const monthIndex = item.filter_value - 1; // Convert filter_value to 0-based index
    if (monthIndex >= 0 && monthIndex < counts.length) {
      counts[monthIndex].count = item.count;
    }
  });

  // Prepare chart data
  const chartData = {
    labels: counts.map(item => item.month), // X-axis labels
    datasets: [
      {
        data: counts.map(item => item.count), // Y-axis values
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Line color
        strokeWidth: 2, // Line thickness
      },
    ],
  };

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Text and axis color
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '0', // Remove dots
      strokeWidth: '0',
      stroke: '#ffffff',
    },
    propsForLabels: {
      fill: 'rgba(0, 0, 0, 0)', // Hide label color
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth - 40} // Responsive width
          height={220}
          chartConfig={chartConfig}
          bezier // Smooth lines
          style={styles.chartStyle}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  chartContainer: {
    position: 'relative',
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#fff', // White background for visibility
    padding: 10,
    alignItems: 'center', // Center the chart
    marginLeft: -20, // Shift the chart to the left
  },
  chartStyle: {
    borderRadius: 16,
    width: '100%',
  },
});

export default LineChartComponent;
