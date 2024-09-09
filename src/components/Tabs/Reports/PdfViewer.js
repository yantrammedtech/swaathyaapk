import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const PDFViewerScreen = ({ route }) => {
  const { fileURL } = route.params;
  console.log('File URL:', fileURL);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: fileURL }}
        style={styles.webview}
        onError={(error) => {
          console.log(error);
          Alert.alert('Error', 'Failed to load PDF');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PDFViewerScreen;
