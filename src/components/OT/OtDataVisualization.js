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
import IconFont from "react-native-vector-icons/FontAwesome";
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
  const [tooltipData, setTooltipData] = useState({ active: 0, discharge: 0 });

  const handleLinePress = (monthIndex) => {
    // Get data for the particular month
    const activePatients = lineChartData.datasets[0].data[monthIndex]; // Active Patient Data
    const dischargePatients = lineChartData.datasets[1].data[monthIndex]; // Discharge Patient Data

    // Update tooltip data and show it
    setTooltipData({
      active: activePatients,
      discharge: dischargePatients,
    });
    setShowTooltip(true);
  };

  // Sample data for line charts (Active Patients and Discharge Patients)
  const activePatientsData = [
    { x: "Jan", y: 150 },
    { x: "Feb", y: 200 },
    { x: "Mar", y: 250 },
    { x: "Apr", y: 180 },
    { x: "May", y: 300 },
    { x: "Jun", y: 220 },
    { x: "Jul", y: 150 },
  ];

  const dischargePatientsData = [
    { x: "Jan", y: 100 },
    { x: "Feb", y: 180 },
    { x: "Mar", y: 100 },
    { x: "Apr", y: 150 },
    { x: "May", y: 220 },
    { x: "Jun", y: 190 },
    { x: "Jul", y: 130 },
  ];
  const pieChartData = [
    {
      name: "Yellow",
      population: 2230,
      color: "#FDD835",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Red",
      population: 5801,
      color: "#D32F2F",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Green",
      population: 10301,
      color: "#388E3C",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

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
        data: [150, 200, 250, 180, 300, 220, 150, 180, 230, 210, 190, 170], // Active Patients Data extended
        color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`, // Purple for Active Patients
        strokeWidth: 2,
        label: "Active Patient",
        fill: false,
      },
      {
        data: [100, 180, 100, 150, 220, 190, 130, 160, 140, 170, 120, 110], // Discharge Patients Data extended
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Green for Discharge Patients
        strokeWidth: 2,
        label: "Discharge Patient",
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
  const currentMonthIndex = currentMonth.getMonth();

  const chartWidth = screenWidth - 30; // Width of the chart
  const totalMonths = 12; // Total months on the x-axis

  // Calculate the x-position for the vertical line
  const verticalLinePosition = (currentMonthIndex / totalMonths) * chartWidth;


  let selectedYear = dayjs().year();

// Get the current month (0-indexed, so January is 0, February is 1, etc.)
let selectedMonth = new Date().getMonth();

const getLineChartData = async() => {
  console.log("patientStatus============",patientStatus.operationTheatre)
  const barGraphResponse = await authFetch(
    `patient/${user.hospitalID}/patients/count/fullYear/${selectedYear}/${patientStatus.emergency}`,
    user.token
  );
  // console.log("barGraphResponse=====ot============",barGraphResponse)
  let filterMonth = 'year'
  const filterValue = '2024'

  const barGraphResponseot = await authFetch(
    `patient/${user.hospitalID}/patients/count/fullYearFilter/${patientStatus.emergency}?filter=${filterMonth}&filterValue=${filterValue}&zone="" `,
    user.token
  );

  // console.log("barGraphResponseot=====ot============",barGraphResponseot)

}
 
useEffect(() => {
  getLineChartData()
},[])

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
              onPressIn={() => handleLinePress(currentMonthIndex)} // Trigger on press
              onPressOut={() => setShowTooltip(false)} // Hide on release
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
                  {`Active: ${tooltipData.active}, Discharge: ${tooltipData.discharge}`}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Patients visited by zone</Text>
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
