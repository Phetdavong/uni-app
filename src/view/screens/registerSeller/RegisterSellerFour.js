import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  Platform,
  Modal,
  StyleSheet,
} from "react-native";
import { themeColors, themeStyles } from "../../styles/index";
import * as OutLineIcon from "react-native-heroicons/outline";
import NavBarPageRegis from "../../components/NavBarPageRegis";
import RegisterDucList from "../../../service/constantData/RegisterDucList";
import NavBar from "../../components/NavBar";
import RadiusButton from "../../components/RadiusButton";
import CardTextChoice from "../../components/CardTextChoice";
import RegisterFourApiModel from "../../../viewApiModel/registerSellerApiModels/RegisterFourApiModel";
import RegisterSellerFourViewModel from "../../../viewModel/registerSellerViewModels/RegisterSellerFourViewModel";
import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useDispatch } from "react-redux";
import { registerTypeDocument } from "../../../stores/features/RegisterSlice";
import { company } from "../../../model/seller.model";

const RegisterSeller = ({ navigation }) => {
  const { isChecked, setIsChecked, selectedId, setSelectedId } =
    RegisterSellerFourViewModel();

  const dispatch = useDispatch();

  const handleRegisterDocumentType = () => {
    dispatch(registerTypeDocument({ cdtid: selectedId, company_document_Name: documentName}));
  };
  const {
    CompanyDocumentTypeData,
    setCompanyDocumentTypeData,
    CompanyDocumentTypeLoadIng,
    setCompanyDocumentTypeLoadIng,
    CompanyDocumentTypeError,
    setCompanyDocumentTypeError,
    CompanyDocumentTypeCount,
    setCompanyDocumentTypeCount,
    handleGetCompanyDocumentType,
  } = RegisterFourApiModel.getCompanyDocumentTypeApi();

  useEffect(() => {
    handleGetCompanyDocumentType();
  }, []);

  const handleCheckCardChange = (id) => {
    setSelectedId(id);
  };
  const handleCheckCardName = (textTitle) =>{
    setDocumentName(textTitle);
  };

  const [documentName, setDocumentName] = useState();
  const [destiny, setDestiny] = useState();

  // console.log("Id name ===>", selectedId, documentName)

  // useEffect(() => {}, [documentName]);
  // useEffect(() => {}, [selectedId]);

  // ຝັງຊັ້ນ Route ໄປຕາມຊື່
  const registerDestiny = (data, item) => {
    return data.find((docItem) => docItem.cdtid === item?.cdtid).destiny;
  };

  //ຝັງຊັ້ນເຂົ້າໄປເອົາໂຕໜັງສືມາສະເເດງຕາມໄອດີ
  const registerDocDetail = (data, item) => {
    return data.find((docItem) => docItem.cdtid === item?.cdtid).name_la;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NavBar
          backgroundColor={themeColors.primaryColorS}
          outSideLeftIcon={
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterSellerThree")}
            >
              <OutLineIcon.ArrowLeftIcon
                size={30}
                color={themeColors.bgColor}
              />
            </TouchableOpacity>
          }
          insideLeftIcon={
            <Text
              style={[
                themeStyles.headerTextStyle,
                { color: themeColors.bgColor },
              ]}
            >
              ສະມັກເປັນຜູ້ຂາຍ
            </Text>
          }
        />
        <NavBarPageRegis value={3} />

        <View style={{ padding: 20, flex: 1 }}>
          <Text
            style={[
              themeStyles.titleTextStyle,
              { color: themeColors.primaryColorS },
            ]}
          >
            ການຢືນຢັນໂຕຕົນ
          </Text>

          <View className="mt-5">
            <Text
              style={[
                themeStyles.subTitleTextStyle,
                { color: themeColors.titleTextColor },
              ]}
            >
              ເລືອກປະເພດເອກະສານທີ່ໃຊ້ໃນການຢືນຢັນໂຕຕົນ
            </Text>
            <View className="mt-5">
              <FlatList
                scrollEnabled={false}
                data={CompanyDocumentTypeData}
                renderItem={({ item, index }) => (
                  <CardTextChoice
                    id={item.cdtid}
                    selectedId={selectedId}
                    textTitle={item.name_la}
                    textDetail={registerDocDetail(RegisterDucList, item)}
                    index={index}
                    onPress={() => {
                      handleCheckCardChange(item.cdtid);
                      setDestiny(registerDestiny(RegisterDucList, item));
                      handleCheckCardName(item.name_la)
                    }}
                    length={item?.length}
                  /> 
                )}
              />
            </View>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <RadiusButton
            text={"ໄປຕໍ່"}
            disable={selectedId !== destiny}
            onPress={() => {
              // handleRegisterDocumentType(), navigation.navigate(destiny);
              navigation.navigate("RegisterSellerFive");
            }}
            textColor={themeColors.bgColor}
            textStyle={themeColors.subTitleTextStyle}
            backgroundColor={
              selectedId === destiny
                ? themeColors.disableColor
                : themeColors.primaryColorS
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterSeller;
