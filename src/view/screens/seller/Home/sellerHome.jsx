import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { styled } from "nativewind";
import { useNavigation } from '@react-navigation/native';
import * as OutLineIcon from "react-native-heroicons/outline";
import * as SolidIcons from "react-native-heroicons/solid";
import NavBar from "../../../components/NavBar";
import { themeColors } from "../../../styles";

import Overall from "./Overall";
import Orders from "./Orders"
import TopProducts from "./TopProducts"
import Monthly_analytics from "./monthly_analytics"

const StyledView = styled(View);
const StyledText = styled(Text);

const SellerHome = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <NavBar
        backgroundColor={"#ffff"}
        outSideLeftIcon={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <OutLineIcon.Bars3Icon size={25} color={themeColors.blackColor} />
          </TouchableOpacity>
        }
        insideLeftIcon={
          <Image
            source={require("../../../../../assets/logos/UniSeller_text.png")}
            style={{ width: 150, height: 30 }}
          />
        }
        /*insideRightIcon={
          <TouchableOpacity>
            <OutLineIcon.ShoppingCartIcon size={25} color={themeColors.primaryColor} />
          </TouchableOpacity>
        }*/
        outSideRightIcon={
          <TouchableOpacity onPress={() => { }}>
            <View style={styles.iconContainer}>
              <SolidIcons.ChatBubbleLeftEllipsisIcon
                size={30}
                color={themeColors.primaryColor}
              />
              <View style={styles.badgeContainer}>
                <StyledText style={styles.badgeText}>3</StyledText>
              </View>
            </View>
          </TouchableOpacity>
        }
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* */} 
        <Overall />

        <StyledView className="h-1 w-full bg-gray-200" />

        <Orders />

        <StyledView className="h-1 w-full bg-gray-200" />

        <TopProducts />

        <StyledView className="h-1 w-full bg-gray-200" />
        <Monthly_analytics />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    shadowContainer: {
      width: "100%",
      backgroundColor: "white",
      border: 1,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 0,
      borderColor: "#F3F3F3",
      shadowColor: "#000000",  // iOS
      elevation: 4,             // Android
      shadowOffset: { width: 0, height: 4 }, // iOS
      shadowOpacity: 0.4,       // iOS
      shadowRadius: 4,          // iOS
      elevation: 4,             // Android
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
    },
    iconContainer: {
      position: 'relative',
    },
    badgeContainer: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: 'green',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });



export default SellerHome;
