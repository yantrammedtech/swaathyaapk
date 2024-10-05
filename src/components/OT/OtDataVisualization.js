import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { PieChart } from "react-native-chart-kit";
import { LineChart } from "react-native-chart-kit";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { authFetch } from "../../axios/authFetch";
import dayjs from 'dayjs';
import { patientStatus } from "../../utility/role";

const OtDataVisualization = () => {
  const user = useSelector((state) => state.currentUserData);

  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({ emergency: 0, elective: 0 });
  const [emergencyData, setEmergencyData] = useState([])
  const [electiveData, setElectiveData] = useState([])

  const [electiveCount, setElectiveCount] = React.useState(0);
  const [emergencyCount, setEmergencyCount] = React.useState(0);

  

 
  const pieChartData = [
    {
      name: "Elective",
      population: parseFloat(electiveCount),
      color: "#3ce7b3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Emergency",
      population: parseFloat(emergencyCount),
      color: "#a357f4",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
   
  ];

 
  const emergencyCounts = emergencyData.length > 0 ? emergencyData.map((item) => item.count) : Array(12).fill(0);
const electiveCounts = electiveData.length > 0 ? electiveData.map((item) => item.count) : Array(12).fill(0);


  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        // data:[1,2,3,4,5,6,7,8,9,10,11,12],
       data: emergencyCounts, 
        color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`, // Purple for Active Patients
        strokeWidth: 2,
        label: "Emergency Patient",
        fill: false,
      },
      {
        // data:[1,2,3,4,5,6,7,8,9,10,11,12],

        data: electiveCounts, 
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Green for Discharge Patients
        strokeWidth: 2,
        label: "Elective Patient",
        fill: false,
      },
    ],
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const getMonthYearString = () => {
    const options = { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(currentMonth);
  };
  const MonthIndex = currentMonth.getMonth() ;
  const currentMonthIndex = MonthIndex + 1

  const chartWidth = screenWidth - 30; // Width of the chart
  const totalMonths = 12; // Total months on the x-axis

  // Calculate the x-position for the vertical line
  const verticalLinePosition = (currentMonthIndex / totalMonths) * chartWidth;


  let selectedYear = dayjs().year();
  let patientType =''

const getLineChartData = async() => {
  try{
    patientType = 'emergency'
    const barGraphResponse = await authFetch(
      `patient/${user.hospitalID}/patients/count/fullYear/${patientType}/${selectedYear}/${patientStatus.operationTheatre}`,
      user.token
    );
    setEmergencyData(barGraphResponse.counts)
     patientType = 'elective'
    const barGraphResponse2 = await authFetch(
      `patient/${user.hospitalID}/patients/count/fullYear/${patientType}/${selectedYear}/${patientStatus.operationTheatre}`,
      user.token
    );
    setElectiveData(barGraphResponse2.counts)
    

  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
}
 
useEffect(() => {
  getLineChartData()
},[])

React.useEffect(() => {
  if (user.token) {
    const getOTPatientTypeCount = async () => {
      const result = await authFetch(
        `ot/${user.hospitalID}/getOTPatientTypeCount`,
        user.token
      );
      if (result.status == 200) {
        setElectiveCount(result.data.elective);
        setEmergencyCount(result.data.emergency);
      }
    };
    getOTPatientTypeCount();
  }
}, [user.hospitalID, user.token]);


const handleLinePress = (monthIndex) => {
  const emergencyCountForMonth = emergencyCounts[monthIndex] || 0;
  const electiveCountForMonth = electiveCounts[monthIndex] || 0;

  // Update tooltip data and show it
  setTooltipData({
    emergency: emergencyCountForMonth,
    elective: electiveCountForMonth,
  });
  setShowTooltip(true);
};



  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Date Selector */}
        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handlePreviousMonth}
          >
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.dateSelector}>
            <Text style={styles.monthText}>{getMonthYearString()}</Text>
          </View>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handleNextMonth}
          >
            <Icon name="arrow-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Line Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Patients visited by Month</Text>
          <LineChart
            data={lineChartData}
            width={screenWidth - 30}
            height={250}
            verticalLabelRotation={0}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0, // No decimal places
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForBackgroundLines: {
                strokeDasharray: "", // Removes the dashed background lines
                stroke: "transparent", // Makes background lines invisible
                strokeWidth: 0,
              },
              yLabelsOffset: 100, // Pushes y-axis labels out of view
              xLabelsOffset: -10, // Optional: Adjust x-axis label position if needed
              formatYLabel: () => "", // Ensures y-axis labels are empty
              propsForDots: {
                r: "0", // Removes dots by setting radius to 0
              },
              fillShadowGradient: "transparent", // Makes the fill transparent
              fillShadowGradientOpacity: 0, // Ensures the fill shadow gradient is fully transparent
            }}
            bezier // For curved lines
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginLeft: -10, // Move the chart slightly to the left
            }}
          />

          <View
            style={[
              styles.verticalLine,
              { left: verticalLinePosition }, // Position the line based on the month
            ]}
          >
            <Pressable
              onPressIn={() => {
                handleLinePress(currentMonthIndex); // Trigger on press
                setShowTooltip(true); // Ensure tooltip is shown when the line is pressed
              }}
              onPressOut={() => setShowTooltip(false)} 
            >
              <View
                style={[
                  styles.verticalLine,
                  { left: verticalLinePosition }, // Position the line based on the month
                ]}
              />
            </Pressable>

            {showTooltip && (
              <View style={[styles.tooltip, { left: verticalLinePosition }]}>
                <Text style={styles.tooltipText}>
                {`Emergency: ${tooltipData.emergency}, Elective: ${tooltipData.elective}`}
                </Text>
              </View>
            )}
          </View>

         
        </View>

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Patients Percentage</Text>
          <PieChart
            data={pieChartData}
            width={screenWidth}
            height={200}
            chartConfig={{
              color: () => `rgba(0, 0, 0, 1)`,
              decimalPlaces: 0,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute // Shows the actual values instead of percentages
          />
        </View>
      </ScrollView>
      <Footer activeRoute="bar-chart" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#fff",
  },
  chartContainer: {
    backgroundColor: "#fff",
    position: "relative",
    padding: 15,
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navButton: {
    padding: 10,
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  arrowButton: {
    marginHorizontal: 10,
  },
  dateSelector: {
    alignItems: "center",
  },
  monthText: {
    fontSize: 18,
    color: "#000",
  },
  verticalLine: {
    position: "absolute",
    width: 2, // The thickness of the vertical line
    height: 200, // Should match the height of your chart
    backgroundColor: "#ccc", // The color of the line (adjust as needed)
    top: 55, // Move the line down by 25 pixels from the top (adjust this value as needed)
  },
  tooltip: {
    position: "absolute",
    top: 0, // Place the tooltip above the chart
    padding: 5,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  tooltipText: {
    color: "#fff", // White text color
    fontSize: 12,
  },
});

export default OtDataVisualization;
