import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { styled } from "nativewind";
import * as OutLineIcon from "react-native-heroicons/outline";
import * as SolidIcons from "react-native-heroicons/solid";
import { themeColors } from "../../../styles";

const StyledView = styled(View);
const StyledText = styled(Text);

const Container = styled(View, {
  container: 'relative',
});

const Overall = () => {

    return <StyledView className="flex flex-wrap justify-center p-4">
        <StyledView className="w-full">
            <StyledView className="bg-white items-center justify-center">
                <View style={styles.shadowContainer} className="p-3 shadow-lg">
                    {/* Box head */}
                    <StyledView className="bg-white"
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>
                        <StyledView
                            className="bg-white items-center justify-center"
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}>
                            <StyledView className="border-2 border-red-500 rounded-full w-10 h-10 items-center justify-center">
                                <Container>
                                    <SolidIcons.CalendarDaysIcon size={25} color={themeColors.primaryColor} />
                                    <View style={styles.searchIconContainer}>
                                        <OutLineIcon.MagnifyingGlassIcon size={15} color={themeColors.primaryColor} />
                                    </View>
                                </Container>
                            </StyledView>
                            <StyledText style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}>ເມສາ ປີ 2024</StyledText>
                        </StyledView>
                        <SolidIcons.ChevronRightIcon
                            size={30}
                            color={themeColors.blackColor}
                        />
                    </StyledView>
                    {/* Box Footer */}
                    <StyledView
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                        }}>
                        {/* Left */}
                        <StyledView
                            style={{ ...styles.centeredView }}>
                            <StyledText style={{ fontSize: 18, textAlign: 'center', fontWeight: 500 }}>ລາຍຮັບທັງໝົດ</StyledText>
                            <StyledText style={[styles.text, styles.bold, styles.boldText]}>LAK7,560,000 </StyledText>
                        </StyledView>

                        <View style={styles.divider} />
                        {/* Right */}
                        <StyledView
                            style={{ ...styles.centeredView }}>
                            <StyledText style={{ fontSize: 18, textAlign: 'center', fontWeight: 500 }}>ຈຳນວນອໍເດີ</StyledText>
                            <StyledText style={[styles.text, styles.bold, styles.boldText]}>50</StyledText>
                        </StyledView>
                    </StyledView>
                </View>
            </StyledView>
            <StyledView
                style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}>
                {/* Left */}
                <StyledView
                    style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={() => console.log('Button Pressed')}>
                        <OutLineIcon.PlusIcon size={35} color={themeColors.primaryColor} />
                    </TouchableOpacity>
                    <StyledText style={{ marginTop: 5, fontSize: 16, textAlign: "center", fontWeight: 'bold' }}>ເພີ່ມສິນຄ້າ</StyledText>
                </StyledView>


                {/* Right */}
                <StyledView
                    style={{ alignItems: 'center', }}>
                    <TouchableOpacity style={styles.button} onPress={() => console.log('Button Pressed')}>
                        <OutLineIcon.PlusIcon size={35} color={themeColors.primaryColor} />
                    </TouchableOpacity>
                    <StyledText style={{ marginTop: 5, fontSize: 16, textAlign: "center", fontWeight: 'bold' }}>ເພິ່ມບໍລິການ</StyledText>
                </StyledView>
            </StyledView>
        </StyledView>
    </StyledView>
}

const styles = StyleSheet.create({
    searchIconContainer: {
      position: 'absolute',
      bottom: -3,
      right: -3,
      padding: 0
    },
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
    boxView: {
      width: 320,
      height: 144,
      paddingVertical: 12,
      gap: 16,
      borderRadius: 10,
      borderTopWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      opacity: 0,
    },
    divider: {
      width: 2,
      backgroundColor: '#ccc',
      marginTop: 20,
    },
    centeredView: {
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
    },
    bold: {
      fontWeight: 'bold',
    },
    boldText: {
      marginTop: 15,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F3F3F3',
      padding: 10,
      borderRadius: 5,
      // iOS shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      // Android shadow
      elevation: 5,
    },
  });

export default Overall