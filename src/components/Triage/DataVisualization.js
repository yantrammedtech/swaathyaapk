import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LineChartComponent from './LineChart';
import { useSelector } from 'react-redux';
import { authFetch } from '../../axios/authFetch';

const screenWidth = Dimensions.get('window').width;

const DataVisualization = () => {
  const user = useSelector((state) => state.currentUserData)
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
  try {
    const response = await authFetch(
      `patient/${user.hospitalID}/patients/count/zone`,
      user.token
    );
    console.log('API Response:', response); // Log the API response

    if (response.message === 'success') {
      const totalPatientCount = response.count.reduce((acc, curr) => acc + curr.patient_count, 0);
      console.log('Total Patient Count:', totalPatientCount);

      const data = response.count.map((res) => ({
        // name: `Zone ${res.zone}`,
        name: zoneLabels[res.zone] || `Zone ${res.zone}`,
        population: (res.patient_count / totalPatientCount) * 100,
        color: zoneColors[res.zone] || '#000', // Default to black if zone color is not found
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }));

      console.log('Transformed Data:', data); // Log the transformed data
      setPieChartData(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}



  useEffect(() => {
    getData()
  },[])
console.log("data==",pieChartData)
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
        <PieChart
        data={pieChartData}
        width={screenWidth - 50}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="6"
        center={[0, 0]} 
        hasLegend={true}
        absolute
      />
         <View style={styles.paracontainer}>
      {/* Visited Text */}
      <Text style={styles.visitedText}>visited</Text>
      
      {/* Images */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/person.avif')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/person3.avif')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/person.avif')}
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
});

export default DataVisualization;
