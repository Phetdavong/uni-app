import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as OutLineIcon from "react-native-heroicons/outline";
import { themeColors, themeStyles } from "../../../styles";
import { setCompanyDelivery, addCompanyDelivery, removeCompanyDelivery } from "../../../../stores/sellerProfile/sellerProfile.store";

const Delivery = ({ deliveries, setDeliveries, deliveriesOpts , setDeliveriesOpts}) => {
  const { t } = useTranslation();
  const { company, status, error } = useSelector((state) => state.company);
  const [isChecked, setIsChecked] = useState( Array.from({ length: deliveries.length }).fill(false));
  const dispatch = useDispatch();

  const selectDelivery = (item, check, index) => {
    
    if (!check) {
      setIsChecked((preVal)=>{
        const newState = [...preVal];
        newState[index] = true;
        return newState;
      });
     
      dispatch(addCompanyDelivery(item));
    } else {
      // remove delivery from company
      setIsChecked((preVal)=>{
        const newState = [...preVal];
        newState[index] = false;
        return newState;
      });
      dispatch(removeCompanyDelivery(item));
    }
  };

  useEffect(() => {

    setIsChecked((preVal)=>{
      const newState = [...preVal];
      deliveries.forEach((item,index) => {
        const foundIndex = deliveriesOpts.findIndex((el)=>(item.delid === el.delid));
        if(foundIndex !== -1 ) newState[index] = true;
      });
      return newState;

    });
  }, [deliveriesOpts]);

  return (
    <View style={{ marginTop: 16 }}>
      <View>
        <Text
          style={[
            themeStyles.subTitleTextStyle,
            { color: themeColors.subtitleTextColor },
            { marginTop: 16 },
          ]}
        >
          {t("ຂົນສົ່ງທີ່ສະດວກໃນການຈັດສົ່ງໃຫ້ລູກຄ້າ")}
        </Text>
      </View>
      {deliveries.map((item, index) => (
        <View
          key={item.delid}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <TouchableOpacity
            onPress={() => {
              selectDelivery(item, isChecked[index], index);
            }}
            style={{
              marginTop: 5,
              width: 18,
              height: 16.94,
              alignItems: "center",
              justifyContent: "center",
              borderColor: isChecked[index]
                ? themeColors.primaryColor
                : themeColors.textColor,
              borderWidth: 2,
              borderColor: isChecked[index]
                ? themeColors.primaryColorS
                : "#CFCFCF",
            }}
          >
            {isChecked[index] ? (
              <OutLineIcon.CheckIcon
                size={15}
                strokeWidth={3}
                color={themeColors.primaryColorS}
              />
            ) : null}
          </TouchableOpacity>

          <Image
            source={{ uri: item.delivery_image?.image?.imagesUrl }}
            style={{
              width: 20,
              height: 20,
              marginTop: 5,
              marginLeft: 8,
              borderRadius: 10
            }}
          />

          <Text
            style={{
              marginLeft: 8,
              marginTop: 5,
              color: "#394052",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {item.name_la}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Delivery;
