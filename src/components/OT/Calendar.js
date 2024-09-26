import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import dayjs from "dayjs";
import Footer from "./Footer";
import moment from "moment";
// import { Calendar } from 'react-native-calendars';

const Calendar = () => {
  const navigation = useNavigation();
  const [dates, setDates] = useState([]);

  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD")); // Get today's date
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  // Filter schedules based on the current date and beyond
  useEffect(() => {
    const upcomingSchedules = schedules.filter((schedule) =>
      moment(schedule.date).isSameOrAfter(currentDate)
    );
    setFilteredSchedules(upcomingSchedules);
  }, [currentDate]);

  // Function to generate dates from the selected date
  const generateDates = (startIndex) => {
    const today = new Date();
    const daysArray = [];

    for (let i = startIndex; i < startIndex + 8; i++) {
      // Display next 8 days starting from selected day
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = dayjs(date).format("ddd"); // Get day of the week, e.g., "Thu"
      const day = dayjs(date).format("DD"); // Get day, e.g., "26"
      daysArray.push({ dayOfWeek, day });
    }

    setDates(daysArray);
  };

  useEffect(() => {
    generateDates(0); // Start from today
  }, []);

  const formatDate = () => {
    const date = new Date();

    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Extract day to add ordinal suffix (st, nd, rd, th)
    const day = date.getDate();
    let suffix = "th";

    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }

    return formattedDate.replace(/\d+/, `${day}${suffix}`);
  };

  const renderDateItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.dateItem,
        // Apply blue background if selected
      ]}
      onPress={() => onDateSelect(index)} // Select the date
    >
      <Text style={[styles.dateText]}>{item.day}</Text>
      <Text style={[styles.dayText]}>{item.dayOfWeek}</Text>
    </TouchableOpacity>
  );

  const schedules = [
    {
      date: "2024-9-26",
      time: "8 AM",
      details: "Ravi - Surgery Room 10",
      bgColor: "#FFA500",
    },
    {
      date: "2024-10-27",
      time: "11 AM",
      details: "Vilas - MRI Room 5",
      bgColor: "#6495ED",
    },
    {
      date: "2024-9-25",
      time: "9 AM",
      details: "John - Consultation Room 2",
      bgColor: "#FF6347",
    },
    {
      date: "2024-9-26",
      time: "10 AM",
      details: "Maya - X-Ray Room 8",
      bgColor: "#32CD32",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{formatDate()}</Text>
        </View>

        <View style={styles.calendar}>
          <FlatList
            horizontal
            data={dates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderDateItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <ScrollView style={styles.scheduleContainer}>
          <Text style={styles.scheduleHeading}>Patient Schedules</Text>
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule, index) => (
              <View
                key={index}
                style={[
                  styles.scheduleItem,
                  { backgroundColor: schedule.bgColor },
                ]}
              >
                <Text style={styles.scheduleDate}>
                  {moment(schedule.date).format("dddd, MMMM Do")}
                </Text>
                <Text style={styles.scheduleTime}>{schedule.time}</Text>
                <Text style={styles.scheduleDetails}>{schedule.details}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noSchedulesText}>No schedules available.</Text>
          )}
        </ScrollView>
      </ScrollView>
      <Footer activeRoute="Calendar" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
  },
  headerText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  calendar: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateItem: {
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
  },

  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // Default text color for unselected
  },
  dayText: {
    fontSize: 14,
    color: "#666", // Default text color for unselected
  },
  scheduleContainer: {
    padding: 16,
  },
  scheduleHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scheduleItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  scheduleDetails: {
    fontSize: 14,
    color: "#FFF",
  },
});

export default Calendar;
