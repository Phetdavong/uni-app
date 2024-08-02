import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import AllPopularCompany from "./AllPopularCompany";
import AllPopularProduct from "./AllPopularProduct";
import AllPopularService from "./AllPopularService";
import NavBar from "../../components/NavBar";
import React from "react";

const PopularTopTab = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        backgroundColor={"white"}
        outSideLeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <OutLineIcon.ArrowLeftIcon
              size={25}
              color={themeColors.titleTextColor}
            />
          </TouchableOpacity>
        }
        insideLeftIcon={
          <Text
            style={[
              themeStyles.titleTextStyle,
              { color: themeColors.titleTextColor },
            ]}
          >
            ເປັນທີ່ນິຍົມ
          </Text>
        }
      />
      <Tab.Navigator
        initialRouteName={"AllPopularProduct"}
        screenOptions={{
          animationEnabled: true,
          lazy: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "blue",
            height: 8,
          },
          tabBarActiveTintColor: themeColors.primaryColor,

          tabBarIndicatorStyle: {
            backgroundColor: themeColors.primaryColor,
            height: 4,
          },

          tabBarIndicatorContainerStyle: {
            alignSelf: "center",
          },
          tabBarOptions: {
            style: {
              elevation: 0,
            },
          },
        }}
      >
        <Tab.Screen
          name="AllPopularProduct"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  {
                    color: focused
                      ? themeColors.primaryColor
                      : themeColors.titleTextColor,
                  },
                ]}
              >
                ສິນຄ້າ
              </Text>
            ),
          }}
          component={AllPopularProduct}
        />
        <Tab.Screen
          name="AllPopularService"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  {
                    color: focused
                      ? themeColors.primaryColor
                      : themeColors.titleTextColor,
                  },
                ]}
              >
                ການບໍລິການ
              </Text>
            ),
          }}
          component={AllPopularService}
        />
        <Tab.Screen
          name="AllPopularCompany"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  themeStyles.titleTextStyle,
                  {
                    color: focused
                      ? themeColors.primaryColor
                      : themeColors.titleTextColor,
                  },
                ]}
              >
                ຮ້ານ
              </Text>
            ),
          }}
          component={AllPopularCompany}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default PopularTopTab;
