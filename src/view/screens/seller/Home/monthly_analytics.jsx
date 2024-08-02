import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { styled } from "nativewind";
import { themeColors } from "../../../styles";

const StyledView = styled(View);
const StyledText = styled(Text);

const toplist = [
    {
        id: 1,
        img: "https://img2.pic.in.th/pic/a8aae1119ea1eb5f46a566302a67b8a3.jpg",
        name: "ເສື້ອຜ້າແຟຊັ່ນ ດີຊາຍຣຽບ...",
        price: 159000,
        view: 99,
    },
    {
        id: 2,
        img: "https://img2.pic.in.th/pic/a8aae1119ea1eb5f46a566302a67b8a3.jpg",
        name: "ເສື້ອຜ້າແຟຊັ່ນ ດີຊາຍຣຽບ...",
        price: 159000,
        view: 88,
    },
    {
        id: 3,
        img: "https://img5.pic.in.th/file/secure-sv1/5207e11b470c444a8c8e2df13921f4bf.jpg",
        name: "ລ້າງລົດກະບະ",
        price: 159000,
        view: 77,
    }
]

const Monthly_analytics = () => {

  return <StyledView className="w-full">
  <View style={{ width: "100%" }} className="p-3 shadow-lg">
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
              <StyledText style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}>ສະຖິຕິການຄິກປະຈຳເດືອນ</StyledText>
          </StyledView>
          <StyledText style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}>ທາງໝົດ</StyledText>
      </StyledView>

      { toplist.map(item=> 
             <StyledView key={item.id} className="flex-row justify-between p-4">

                {/* Second View (4/12) */}
                <StyledView className="w-4/12 flex items-center justify-center">
                    <Image
                        source={{ uri: item.img} }
                        style={styles.avatarProduct}
                    />
                </StyledView>

                {/* Third View (6/12) */}
                <StyledView className="w-8/12 grid items-start justify-start ml-3" >
                     <StyledText style={styles.badgeText}>{item.name}</StyledText>
                     <StyledText style={styles.badgeText}>ລາຄາ: {item.price.toLocaleString('en-US')} ກີບ</StyledText>
                     <StyledText style={styles.badgeText}><StyledText style={{color: "#FF7466"}}>{item.view} </StyledText>ຜູ້ເຂົ້າຊົມ</StyledText>
                </StyledView>
            </StyledView>
            )} 

      </View>
      </StyledView>
}

const styles = StyleSheet.create({
    shadowContainer: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 0,
        borderWidth: 1,
        borderColor: "#CFCFCF",
    },
    iconContainer: {
        position: 'relative',
    },
    badgeContainer: {
        position: 'absolute',
        backgroundColor: "#FF7466",
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarProduct: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default Monthly_analytics