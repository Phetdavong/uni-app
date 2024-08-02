import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import DrawerContent from "./DrawerContent";
import { Dimensions } from "react-native";
import Home from "../screens/home/Home";
import React from "react";

const HomeDrawer = () => {
  const Drawer = createDrawerNavigator();
  const drawerWidth = Dimensions.get("window").width * 0.9;

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: drawerWidth,
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
