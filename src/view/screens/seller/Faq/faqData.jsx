// FaqDetail.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as SolidIcons from "react-native-heroicons/solid";
import { themeColors } from "../../../styles";

const FaqDetail = ({navigation}) => {
  const route = useRoute();
  const { faq } = route.params;

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>
            <SolidIcons.ArrowLeftIcon
              size={30}
              color={"#ffff"}
            />
          </Text>
        </TouchableOpacity>
        <Text style={styles.appbarTitle}>{faq.title}</Text>
      </View>
      <View style={styles.container}>
          <Text style={styles.detail}>{faq.detail}</Text>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  appbar: {
    height: 56,
    backgroundColor: themeColors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  appbarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 16,
  },
});

export default FaqDetail;
