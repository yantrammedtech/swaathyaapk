import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const faqs = [
  {
    question: 'How do I create a new patient?',
    answer: [
      '• Look for a button or link that says "Add New Patient" or "New Patient."',
      '• This is often prominently displayed on the patient management screen.',
    ],
  },
  {
    question: 'How can I reset my password?',
    answer: ['• To reset your password/gate the profile page and add "New Password arm Password then click on Update Changes.'],
  },
  {
    question: 'How can I update my profile?',
    answer: ['• To update your profile, go to the profie page and Upecad image and then click on Updete Changes'],
  },
];

const HelpSupportScreen = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const navigation = useNavigation();
  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Help & Support</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#786EFF' }]} onPress={() => navigation.navigate('Videos')}>
          <Icon name="play-circle-outline" size={40} color="#fff" />
          <Text style={styles.buttonText}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#F95B4F' }]} onPress={() => navigation.navigate('Manuals')}>
        <Ionicons name="book-outline" size={40} color="#fff" />
          <Text style={styles.buttonText}>Manuals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#F77E9F' }]}  onPress={() => navigation.navigate('Support')}>
          <Ionicons  name="help-circle-outline" size={40} color="#fff" />
          <Text style={styles.buttonText}>Support & Ticket</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.faqHeader}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <TouchableOpacity onPress={() => toggleFAQ(index)} style={styles.faqQuestion}>
            <Text style={styles.faqQuestionText}>{faq.question}</Text>
            <Ionicons 
              name={expandedFAQ === index ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          {expandedFAQ === index && (
            <View style={styles.faqAnswer}>
              {faq.answer.map((line, i) => (
                <Text key={i} style={styles.faqAnswerText}>
                  {line}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: 80,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  faqHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#1A73E8',
  },
  faqContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    alignItems: 'center',
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqAnswer: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#555',
  },
});

export default HelpSupportScreen;
