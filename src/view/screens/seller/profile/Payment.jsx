import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import * as OutLineIcon from "react-native-heroicons/outline";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { themeColors, themeStyles } from "../../../styles";
import { setCompanyPayments } from "../../../../stores/sellerProfile/sellerProfile.store";

const Payment = ({ payments, setPayments, paymentOpts }) => {
  const { company, status, error } = useSelector((state) => state.company);
  const [isChecked, setIsChecked] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const selectPayment = (item, check, index) => {
    // if check is true then unchecked and remove item from company payment
    if (check) {
      let arr = isChecked;
      arr[index] = false;

      setIsChecked(arr);

      const company_payments = company.company_payments.filter((el) => {
        const ptid = el.ptid;
        if (ptid !== item.ptid) return el;
      });

      dispatch(setCompanyPayments(company_payments));
    }

    // if check is false then check and add item to company payment
    else {
      let arr = isChecked;
      arr[index] = true;
      setIsChecked(arr);

      const updatedCompanyPayments = [...company.company_payments, item];

      dispatch(setCompanyPayments(updatedCompanyPayments));
    }
  };

  useEffect(() => {
   
    let arr = Array.from({ length: payments.length }).fill(false);

    payments.forEach((payment, index) => {
      let foundIndex = paymentOpts.findIndex(
        (option) => option.ptid === payment.ptid
      );
      if (foundIndex !== -1) {
        arr[index] = true;
      }
    });

    setIsChecked(arr);
  }, [paymentOpts]);

  return (
    <View>
      <View>
        <Text
          style={[
            themeStyles.subTitleTextStyle,
            { color: themeColors.subtitleTextColor },
            { marginTop: 16 },
          ]}
        >
          {t("ທະນາຄານທີ່ສາມາດຈ່າຍໄດ້")}
        </Text>
      </View>
      <View>
        {payments.map((item, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <TouchableOpacity
              key={index}
              onPress={() => {
                selectPayment(item, isChecked[index], index);
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
              {isChecked[index] == true ? (
                <>
                  <OutLineIcon.CheckIcon
                    size={15}
                    strokeWidth={3}
                    color={themeColors.primaryColorS}
                  />
                </>
              ) : null}
            </TouchableOpacity>
            <Image
              source={{ uri: item.payment_type_img?.image?.imagesUrl }}
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
    </View>
  );
};

export default Payment;
