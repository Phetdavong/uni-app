// Faq.js

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SolidIcons from "react-native-heroicons/solid";
import { themeColors } from "../../../styles";

const faqs = [
  {
    id: 1,
    title: "ຊ່ອງທາງໃນການຊຳລະ ແລະ ຄ່າທຳນຍມອື່ນໆ",
    detail: `Uni markethub ມີຊ່ອງທາງການຊຳລະເງິນ 3 ຊ່ອງທາງຄື: ເງິນສົດ, WALLET (ເງິນໃນບັນຊີ Uni), ແລະ ບັດ Credit ຫຼື Debit. ພວກເຮົາແນະນຳໃຫ້ຜູ້ໃຊ້ບໍລິການເລືອກການຊຳລະເງິນຜ່ານ Wallet ເພື່ອຄວາມສະດວກສູງສຸດໃນການໃຊ້ງານເພາະວ່າທ່ານຈະໄດ້ຊຳລະຕາມຈຳນວນເງິນໂຊໃນແອັບ.`
  },
  {
    id: 2,
    title: "ເປັນຫຍັງຈຶ່ງມີຄ່າທຳນຽມການຍົກເລິກ",
    detail: `Uni markethub ມີຊ່ອງທາງການຊຳລະເງິນ 3 ຊ່ອງທາງຄື:
ເງິນສົດ, WALLET (ເງິນໃນບັນຊີ Uni), ແລະ ບັດ Credit ຫຼື Debit. ພວກເຮົາແນະນຳໃຫ້ຜູ້ໃຊ້ບໍລິການເລືອກການຊຳລະເງິນຜ່ານ Wallet ເພື່ອຄວາມສະດວກສູງສຸດໃນການໃຊ້ງານເພາະວ່າທ່ານຈະໄດ້ຊຳລະຕາມຈຳນວນເງິນໂຊໃນແອັບ.`
  }
];

const Faq = ({navigation}) => {

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToDetail = (faq) => {
    navigation.navigate('FaqDetail', { faq });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>
            <SolidIcons.ArrowLeftIcon
              size={30}
              color={"#ffff"}
            />
          </Text>
        </TouchableOpacity>
        <Text style={styles.appbarTitle}>ຄຳຖາມທີ່ພົບຫຼາຍ FAQ</Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {faqs.map((faq) => (
          <TouchableOpacity
            key={faq.id}
            style={styles.faqItem}
            onPress={() => navigateToDetail(faq)}
          >
            <Text style={{...styles.title, padding: 5, fontWeight: "bold"}}>{faq.title}</Text>
            <SolidIcons.ChevronRightIcon size={20} color={themeColors.primaryColor} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  appbarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 16,
  },
});

export default Faq;
