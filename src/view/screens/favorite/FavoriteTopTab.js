import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import AllFavoriteProduct from "./AllFavoriteProduct";
import AllFavoriteService from "./AllFavoriteService";
import NavBar from "../../components/NavBar";
import React from "react";

const FavoriteTopTab = () => {
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
        initialRouteName={"AllFavoriteProduct"}
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
          name="AllFavoriteProduct"
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
          component={AllFavoriteProduct}
        />
        <Tab.Screen
          name="AllFavoriteService"
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
          component={AllFavoriteService}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default FavoriteTopTab;
