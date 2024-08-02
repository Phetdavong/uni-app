import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import AllRecommendService from "./AllRecommendService";
import AllRecommendProduct from "./AllRecommendProduct";
import AllRecommedCompany from "./AllRecommedCompany";
import NavBar from "../../components/NavBar";
import React from "react";

const RecommdedTopTab = () => {
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
            ແນະນຳ
          </Text>
        }
      />
      <Tab.Navigator
        initialRouteName={"CurrentEvent"}
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
          name="AllRecommendProduct"
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
          component={AllRecommendProduct}
        />
        <Tab.Screen
          name="AllRecommendService"
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
          component={AllRecommendService}
        />
        <Tab.Screen
          name="AllRecommedCompany"
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
          component={AllRecommedCompany}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default RecommdedTopTab;
