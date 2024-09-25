import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView ,FlatList } from 'react-native';
import { authFetch } from '../../../axios/authFetch';
import { useSelector } from 'react-redux';
import { statusDict } from '../../../utility/role';

const SupportScreen = () => {
    const user = useSelector((state) => state.currentUserData);
    const [activeTab, setActiveTab] = useState('ticketRaised');
    const navigation = useNavigation();


    const [ticketData, setTicketData] = React.useState([]);

    const getAllData = async () => {
      const res = await authFetch(
        `ticket/hospital/${user.hospitalID}/getAllTickets/${user.id}`,
        user.token
      );
      if (res.message == "success") {
        setTicketData(res.tickets);
      }
    };
    React.useEffect(() => {
      getAllData();
    }, [user]);

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ticketRaised' && styles.activeTab]} 
          onPress={() => setActiveTab('ticketRaised')}
        >
          <Text style={[styles.tabText, activeTab === 'ticketRaised' && styles.activeTabText]}>
            Ticket raised
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]} 
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display content based on active tab */}
     
      <View style={styles.content}>
  {activeTab === 'ticketRaised' ? (
       <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}  showsVerticalScrollIndicator={true} >
<FlatList
  data={ticketData}
  renderItem={({ item }) => (
    <View key={item.id} style={styles.ticketheaderRow}>
      <View>
        <Text style={styles.ticketheading}>{item.module}</Text>
        <Text style={styles.ticketsubText}>
          Type: <Text style={styles.boldText}>{item.type}</Text>
        </Text>
        <Text style={styles.dateText}>
          Status: <Text style={styles.boldText}>{statusDict[item.status]}</Text>
        </Text>
        <Text style={styles.ticketTimeText}>
          Assigned to: <Text style={styles.boldText}>
            {item.assignedName?.[0].toUpperCase() + item.assignedName?.slice(1) || "Not assigned yet"}
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.ticketnotSelectedButton}>
        <Text style={styles.ticketnotSelectedButtonText}>Not Selected</Text>
      </TouchableOpacity>
    </View>
  )}
  keyExtractor={(item) => item.id}
/>

   
 
      </ScrollView>
  ) : (
    <Text style={styles.contentText}>History Content</Text>
  )}
</View>

      <TouchableOpacity style={styles.createTicketButton} onPress={() => navigation.navigate('Chat')}>
        <Text style={styles.createTicketButtonText}>Create ticket</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  ticketRaisedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#FFC107', 
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  historyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollContainer: {
    paddingBottom: 20,
    flexGrow: 1,
},
scrollView: {
    flex: 1, // Ensure the ScrollView takes full height
    width: '100%', // Ensure it takes full width
},
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  createTicketButton: {
    backgroundColor: '#1A73E8', // Change color as needed
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  createTicketButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderRadius: 5, // Adding a slight rounding to the edges
    elevation: 3, // Reducing elevation to make the shadow less harsh on Android
    marginHorizontal: 5, 
    shadowColor: 'rgba(200, 200, 200, 0.7)', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
     backgroundColor: '#FFC107',
     borderRadius:16,
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#fff', 
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    width:"100%",

  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },
  ticketcontainer: {
    flex: 1,
    padding: 10, 
    maxHeight: 120,
    width:'100%'
  },
  ticketheaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10,
    backgroundColor: '#e8f1fe',
    padding: 10,
  },
  ticketheading: {
    fontSize: 15,
    fontWeight: 'bold', // Bold text for heading
    color: '#000', // Black text color
  },
  ticketnotSelectedButton: {
    borderWidth: 1,
    borderColor: 'red', // Red border
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  ticketnotSelectedButtonText: {
    color: 'red', // Red text for the button
    fontSize: 12,
  },
  ticketsubText: {
    fontSize: 13,
    color: '#000', // Black text for "Technical issue"
    marginBottom: 2, // Space below
  },
  ticketTimeText: {
    fontSize: 13,
    color: '#000', // Black text for date and time
    marginBottom: 1, // Space below
  },
  boldText: {
    fontWeight: '600',
    color:"#2d2d2d"
},
});

export default SupportScreen;
