import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllRecommendService from "../screens/recommend/AllRecommendService";
import AllRecommendProduct from "../screens/recommend/AllRecommendProduct";
// import RegisterSeller from "../screens/registerSeller/RegisterSeller";
import RegisterSellerTwo from "../screens/registerSeller/RegisterSellerTwo";
import AllRecommedCompany from "../screens/recommend/AllRecommedCompany";
import UsagePolicySeller from "../screens/policy/AppUsagePolicySeller";
import ProductImageList from "../screens/product/ProductImageList";
import RecommdedTopTab from "../screens/recommend/RecommdedTopTab";
import RegisterSellerThree from "../screens/registerSeller/RegisterSellerThree";
import RegisterSellerFour from "../screens/registerSeller/RegisterSellerFour";
import RegisterSellerFive from "../screens/registerSeller/RegisterSellerFive";
import FavoriteTopTab from "../screens/favorite/FavoriteTopTab";
import { NavigationContainer } from "@react-navigation/native";
import CardIdRegister from "../screens/registerSeller/CardIdRegister";
import FamilyBookRegister from "../screens/registerSeller/FamilyBookRegister";
import PassportRegister from "../screens/registerSeller/PassportRegister";
import AppUsagePolicy from "../screens/policy/AppUsagePolicy";
import ProductDetail from "../screens/product/ProductDetail";
import CompanyDetail from "../screens/company/CompanyDetail";
import PopularTopTab from "../screens/popular/PopularTopTab";
import StorageProvider from "../providers/StorageProvider";
import FinishedEvent from "../screens/event/FinishedEvent";
import EventDetails from "../screens/event/EventDetails";
import CurrentEvent from "../screens/event/CurrentEvent";
import EventTopTab from "../screens/event/EventTopTab";
import AllFollow from "../screens/follow/AllFollow";
import Splash from "../screens/splash/Splash";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";
import HomeDrawer from "./HomeDrawer";

import RegisterSeller from "../screens/seller/register/RegisterSeller";
import DetailStore from "../screens/seller/register/detailStore/DetailStore";
import DetailOpenShop from "../screens/seller/register/detailOpenShop/DetailOpenShop";
import IdentityVerification from "../screens/seller/register/identityVerification/IdentityVerification";
import SellerSubmitSuccess from "../screens/seller/register/sellerSubmitSuccess/SellerSubmitSuccess";
import Profile from "../screens/seller/profile/Profile";
import QuestionModal from "../screens/seller/profile/modal/QuestionModal";

import React from "react";
import { store } from "../../../src/stores/store";
import { Provider } from "react-redux";

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <StorageProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="AllFollow" component={AllFollow} />
            <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
            <Stack.Screen name="EventTopTab" component={EventTopTab} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
            <Stack.Screen name="CurrentEvent" component={CurrentEvent} />
            <Stack.Screen name="FinishedEvent" component={FinishedEvent} />
            <Stack.Screen name="CompanyDetail" component={CompanyDetail} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="PopularTopTab" component={PopularTopTab} />
            <Stack.Screen name="RecommdedTopTab" component={RecommdedTopTab} />
            
            <Stack.Screen name="RegisterSeller" component={RegisterSeller} />
            <Stack.Screen name="DetailStore" component={DetailStore} />
            <Stack.Screen name="DetailOpenShop" component={DetailOpenShop} />
            <Stack.Screen name="IdentityVerification" component={IdentityVerification} />
            <Stack.Screen name="SellerSubmitSuccess" component={SellerSubmitSuccess} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="QuestionModal" component={QuestionModal} />
            <Stack.Screen
              name="RegisterSellerTwo"
              component={RegisterSellerTwo}
            />
            <Stack.Screen
              name="RegisterSellerThree"
              component={RegisterSellerThree}
            />
            <Stack.Screen
              name="RegisterSellerFour"
              component={RegisterSellerFour}
            />
            <Stack.Screen
              name="RegisterSellerFive"
              component={RegisterSellerFive}
            />
            <Stack.Screen name="AppUsagePolicy" component={AppUsagePolicy} />
            <Stack.Screen name="FavoriteTopTab" component={FavoriteTopTab} />
            <Stack.Screen name="CardIdRegister" component={CardIdRegister} />
            <Stack.Screen
              name="FamilyBookRegister"
              component={FamilyBookRegister}
            />
            <Stack.Screen
              name="PassportRegister"
              component={PassportRegister}
            />
            <Stack.Screen
              name="ProductImageList"
              component={ProductImageList}
            />
            <Stack.Screen
              name="UsagePolicySeller"
              component={UsagePolicySeller}
            />
            <Stack.Screen
              name="AllRecommedCompany"
              component={AllRecommedCompany}
            />
            <Stack.Screen
              name="AllRecommendService"
              component={AllRecommendService}
            />
            <Stack.Screen
              name="AllRecommendProduct"
              component={AllRecommendProduct}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StorageProvider>
    </Provider>
  );
};

export default AppNavigation;
