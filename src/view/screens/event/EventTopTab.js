import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { themeColors, themeStyles } from "../../styles";
import NavBar from "../../components/NavBar";
import FinishedEvent from "./FinishedEvent";
import CurrentEvent from "./CurrentEvent";
import React from "react";

const EventTopTab = ({ route }) => {
  const paramsEventId = route?.params?.eventId;
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        backgroundColor={'white'}
        outSideLeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <OutLineIcon.ArrowLeftIcon size={25} color={themeColors.titleTextColor} />
          </TouchableOpacity>
        }
        insideLeftIcon={
            <Text
              style={[
                themeStyles.titleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              Event
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
          name="CurrentEvent"
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
                ກຳລັງດຳເນີນການຢູ່
              </Text>
            ),
          }}
          component={CurrentEvent}
          initialParams={{
            eventId: paramsEventId,
          }}
        />
        <Tab.Screen
          name="FinishedEvent"
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
                ທີ່ສິ້ນສຸດແລ້ວ
              </Text>
            ),
          }}
          component={FinishedEvent}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default EventTopTab;
