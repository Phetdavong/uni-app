import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import * as SolidIcons from "react-native-heroicons/solid";
import { themeColors } from "../../../styles";

const Policy = ({ navigation }) => {

  const goBack = () => {
    navigation.goBack();
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
        <Text style={styles.appbarTitle}>ນະໂຍບາຍການຈັດການຂໍ້ມູນສ່ວນຕົວ</Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ marginBottom: 16, fontSize: 20, color: themeColors.primaryColor, fontWeight: 'bold' }}>
          ນະໂຍບາຍ
        </Text>
        <Text style={{ marginBottom: 16, fontSize: 14, fontWeight: 'bold' }}>
          Uni Marketbub ເຂົ້າໃຈວ່າຜູ້ໃຊ້ງານຂອງເຮົາໃຫ້ຄວາມສຳຄັນ
          ກັບຂໍ້ມູນສ່ວນບຸກຄົນຂອງຕົນເອງ ແລະ ວິທີເກັບລວບລວມການໃຊ້
          ການເປີດເຜີຍ ແລະ ການເກັບຮັກສາຂໍ້ມູນສ່ວນບຸກຄົນນັ້ນ ພວກເຮົາ
          ມຸ່ງມັ່ນທີ່ຈະຈັດການຂໍ້ມູນສ່ວນບຸກຄົນຂອງທ່ານໃຫ້ເປັນໄປຕາມກົດ
          ໜາຍທີ່ກ່ຽວຂໍ້ຂອງການໃຊ້ບໍລິການ.
        </Text>
        <Text style={{ marginBottom: 16, fontSize: 14, fontWeight: 'bold' }}>
          ຟັງຊັ່ນ ການຊື້ຂາຍສິນຄ້າ ຫຼື ການບໍລິການທີ່ມີຢູ່ພາຍໃນແຟສ
          ຟອມ ຫຼື ການຕິດຕໍ່ກັບພວກເຮົາຜ່ານທາງບໍລິການແອັບພິເຄຊັ່ນ
          ຜຸ້ແທນງານການບໍລິການລູກຄ້າ ຫຼື ເຂົ້າເຖິງບໍລິການ ຫຼື ອຸປະກອນອິນ
          ເຕີເນັດອື່ນໆທີ່ສາມາດເຂົ້າເຖິງໄດ້.
        </Text>
        <Text style={{ marginBottom: 16, fontSize: 14, fontWeight: 'bold' }}>
          ກະລຸນາອ່ານນະໂຍບາຍຄວາມເປັນສ່ວນຕົວສະບັບນີ້ຢ່າງລະອຽດ
          ລະມັດລະວັງການກົດ ຫຼື ເຮັດເຄື່ອງມາຍທີ່ຖຶກຕ້ອງໃນການລົງທະບຽນ
          ຟັງຊັ່ນ ການຊື້ຂາຍສິນຄ້າ ຫຼື ການບໍລິການທີ່ມີຢູ່ພາຍໃນແຟສຟອມ
          ຫຼື ການຕິດຕໍ່ກັບພວກເຮົາຜ່ານທາງບໍລິການແອັບພິເຄຊັ່ນຜຸ້ແທນ
          ງານການບໍລິການລູກຄ້າ ຫຼື ເຂົ້າເຖິງບໍລິການ ຫຼື ອຸປະກອນອິນເຕີເນັດ
          ອື່ນໆທີ່ສາມາດເຂົ້າເຖິງໄດ
        </Text>
        {/* Add more content as needed */}
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
});

export default Policy;
