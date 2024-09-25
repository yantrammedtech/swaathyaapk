import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LineChartComponent from './LineChart';
import { useSelector } from 'react-redux';
import { authFetch } from '../../axios/authFetch';

const screenWidth = Dimensions.get('window').width;

const EmrgDataVisualization = () => {
  const user = useSelector((state) => state.currentUserData)
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const currentZone = useSelector((state) =>state.currentZone)

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const getMonthYearString = () => {
    const options = { year: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(currentMonth);
  };

  // Simulate data change based on the current month
  const generateLineChartData = () => {
    const baseData = [30, 45, 28, 80, 99, 43, 50, 60,];
    const monthOffset = currentMonth.getMonth();
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', ],
      datasets: [
        {
          data: baseData.map(value => value + monthOffset * 10), 
          strokeWidth: 2,
        },
      ],
    };
  };
  

  // Data for PieChart (unchanged)
  // const pieChartData = [
  //   { name: 'Green Zone', population: 60, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  //   { name: 'Red Zone', population: 30, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  //   { name: 'Yellow Zone', population: 10, color: 'yellow', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  // ];

  const [data, setData] = React.useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  const zoneColors = {
    1: '#FF6347', // Red
    2: '#FFD700', // Yellow
    3: '#32CD32', // Green
  };
   // Define labels for each zone
   const zoneLabels = {
    1: 'Red Zone',
    2: 'Yellow Zone',
    3: 'Green Zone',
  };
  
  const getData = async () => {
    const selectedWardDataFilter = 'year'; // Adjust this filter as needed
  
    try {
      const responseWard = await authFetch(
        `ward/${user.hospitalID}/distributionForStaff/${selectedWardDataFilter}?role=${user.role}&userID=${user.id}`,
        user.token
      );
      console.log('API Response:', responseWard); // Log the API response
  
      if (responseWard.message === 'success') {
        const data = responseWard.summary.map((res, index) => ({
          name: res.ward,
          population: parseFloat(res.percentage), // Convert percentage to float
          color: getColorForIndex(index), // Use the index to determine a color
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        }));
  
        console.log('Transformed Data:', data); // Log the transformed data
        setPieChartData(data); // Set the transformed data to state
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Function to get color based on index
  const getColorForIndex = (index) => {
    const colors = [
      '#ff6b6b', '#ffe66d', '#6fffa3', '#34ebba', '#ffa726', '#fb8c00', '#e26a00', '#ff4081'
    ];
    return colors[index % colors.length]; // Cycle through colors
  };
  


  useEffect(() => {
    getData()
  },[])
console.log("data==",pieChartData)
console.log("currentZone===",currentZone)
  return (
    <ScrollView style={styles.container}>
      {/* Date Selector */}
      <View style={styles.dateContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePreviousMonth}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.dateSelector}>
          <Text style={styles.monthText}>{getMonthYearString()}</Text>
        </View>
        <TouchableOpacity style={styles.arrowButton} onPress={handleNextMonth}>
          <Icon name="arrow-right" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Patients visited by Month */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Patients visited by Month</Text>
        <LineChartComponent data={generateLineChartData()} currentMonth={currentMonth} />
      </View>

      {/* Patients visited by Zone */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Patients visited by Zone</Text>
       <View style={styles.piecontainer}>
  <PieChart
    data={pieChartData} // Updated with the new data
    width={screenWidth - 50}
    height={220}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }}
    accessor="population" // Accessor now points to percentage from the API
    backgroundColor="transparent"
    paddingLeft="10"
    center={[0, 0]}
    hasLegend={false} // Disable the default legend
    absolute
  />

  {/* Custom Legend Below the Pie Chart */}
  <View style={styles.legendContainer}>
    {pieChartData.map((item, index) => (
      <View key={index} style={styles.legendItem}>
        <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
        <Text style={styles.legendText}>{item.name}: {item.population}%</Text>
      </View>
    ))}
  </View>
</View>
 

         <View style={styles.paracontainer}>
      {/* Visited Text */}
      <Text style={styles.visitedText}>visited</Text>
      
      {/* Images */}
      <View style={styles.imageContainer}>
        <Image
          source={{}}
          style={styles.image}
        />
        <Image
          source={{}}
          style={styles.image}
        />
        <Image
          source={{}}
          style={styles.image}
        />
      </View>
      
      {/* 200+ Text */}
      <Text style={styles.numberText}>200+</Text>
    </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  arrowButton: {
    marginHorizontal: 10,
  },
  dateSelector: {
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    color: '#000',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    // padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    width:"100%",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1977f3',
  },
  paracontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:10,
    padding:10,
  },
  visitedText: {
    fontSize: 16,
    marginRight: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 15, // Make images circular
    marginLeft: -10,  // Overlap images slightly
  },
  numberText: {
    fontSize: 16,
    color: 'blue',
    fontWeight:"bold",
  },
  piecontainer: {
    flex: 1,
    justifyContent: 'center', // Centers the PieChart vertically
    alignItems: 'center', // Centers the PieChart horizontally
    padding: 20, // Add padding to ensure proper spacing
  },
  legendContainer: {
    marginTop: 15, // Space between the PieChart and the labels
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: 'row', // Layout the color box and text side by side
    alignItems: 'center',
    marginBottom: 5, // Add space between each label
  },
  legendColorBox: {
    width: 15,
    height: 15,
    borderRadius:10,
    marginRight: 10, // Space between the color box and text
  },
  legendText: {
    fontSize: 14,
    color: '#333', // Text color
  },
});

export default EmrgDataVisualization;
