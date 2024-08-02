import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal, Pressable } from 'react-native';
import * as SolidIcons from "react-native-heroicons/solid";
import { styled } from 'nativewind';
import { themeColors } from "../../../styles";
import BottomSheet from '@gorhom/bottom-sheet';

const settings = [
  {
    id: 1,
    name: "ປ່ຽນພາສາ - Language"
  },
  {
    id: 2,
    name: "ການແຈ້ງເຕືອນ"
  }
];

const LanguageList = {
  la: {
    name: "laos",
    nativeName: "laos",
    flag: require("../../../../../assets/icons/laos_icon.png"),
  },
  th: {
    name: "thai",
    nativeName: "ภาษาไทย",
    flag: require("../../../../../assets/icons/thailand_icon.png"),
  },
  en: {
    name: "english",
    nativeName: "English",
    flag: require("../../../../../assets/icons/english_icon.png"),
  },
};

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Setting = ({ navigation }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const bottomSheetRef = useRef(null);

  const goBack = () => {
    navigation.goBack();
  };

  const openLanguageBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    closeBottomSheet();
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <StyledView style={{ flex: 1, backgroundColor: 'white' }}>
      <StyledView style={styles.appbar}>
        <StyledTouchableOpacity onPress={goBack} style={styles.backButton}>
          <SolidIcons.ArrowLeftIcon size={30} color={"#fff"} />
        </StyledTouchableOpacity>
        <StyledText style={styles.appbarTitle}>ການຕັ້ງຄ່າ</StyledText>
      </StyledView>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {settings.map((item) => (
          <StyledTouchableOpacity
            key={item.id}
            className="p-4 border-b border-gray-200"
            onPress={() => item.id === 1 ? openLanguageBottomSheet() : console.log(item.id)}
          >
            <StyledText className="text-lg font-bold">{item.name}</StyledText>
          </StyledTouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        visible={isBottomSheetOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={closeBottomSheet}
      >
        <Pressable style={styles.overlay} onPress={closeBottomSheet}>
          <BottomSheet
            ref={bottomSheetRef} // Assign ref to BottomSheet
            index={0} // Start index
            snapPoints={['30%', '50%']}
            style={styles.bottomSheet}
          >
            <StyledView className="p-4">
              <StyledText className="text-lg font-bold mb-4">Select Language</StyledText>
              {Object.keys(LanguageList).map((key) => {
                const language = LanguageList[key];
                return (
                  <StyledTouchableOpacity
                    key={key}
                    className="p-4 flex-row items-center border-b border-gray-200"
                    onPress={() => handleLanguageSelect(language)}
                  >
                    <Image source={language.flag} style={styles.flagIcon} />
                    <StyledText className="text-lg font-bold ml-4">{language.nativeName}</StyledText>
                  </StyledTouchableOpacity>
                );
              })}
            </StyledView>
            <StyledView style={{marginBottom: 20}}></StyledView>
          </BottomSheet>
        </Pressable>
      </Modal>
    </StyledView>
  );
};

const styles = StyleSheet.create({
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
  appbarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white', // Background color of the bottom sheet
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
  },
  flagIcon: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
});

export default Setting;
