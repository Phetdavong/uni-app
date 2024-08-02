
import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from "react-native";
import { styled } from "nativewind";
import * as SolidIcons from "react-native-heroicons/solid";
import { themeColors } from "../../../styles";

const StyledView = styled(View);
const StyledText = styled(Text);

const products = [{
    id: 1,
    name: "ໂມງແທ້ ນຳເຂົ້າຈາກເກົາຫຼີ",
    qty: 4,
    img: "https://img5.pic.in.th/file/secure-sv1/d87714f441851a383eb7709bc820e8a1.jpg",
    price: 235000
},
{
    id: 2,
    name: "ໂມງແທ້ ນຳເຂົ້າຈາກເກົາຫຼີ",
    qty: 1,
    img: "https://img5.pic.in.th/file/secure-sv1/d87714f441851a383eb7709bc820e8a1.jpg",
    price: 235000
}]

const Orders = () => {
    const [showProduct, setShowProduct] = useState(false)
    const totalPrice = products.reduce((acc, item) => acc + (item.qty * item.price), 0);

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
                    <StyledText style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}>ອໍເດີມາໃຫມ່</StyledText>
                </StyledView>
                <StyledText style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}>ທາງໝົດ</StyledText>
            </StyledView>
            {/* Header */}
            <View style={{ ...styles.shadowContainer, marginTop: 15 }} className="p-3 shadow-lg">
                <StyledView
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                    <StyledView
                        className="bg-white items-center justify-center"
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                        }}>
                        <StyledView style={styles.profileContainer}>
                            <Image
                                source={{ uri: 'https://img5.pic.in.th/file/secure-sv1/7768c8613249919ab34689845850a960.jpg' }}
                                style={styles.avatar}
                            />
                            <StyledView
                                style={{
                                    justifyContent: "flex-start",
                                }}>
                                <StyledText style={styles.name}>John Doe</StyledText>
                                <StyledText style={{ fontSize: 12}}>02/04/2024 15:45</StyledText>
                            </StyledView>

                        </StyledView>
                    </StyledView>
                    {showProduct ? <SolidIcons.ChevronUpIcon
                        onPress={() => setShowProduct(false)}
                        style={{ cursor: "pointer" }}
                        size={30}
                        color={themeColors.blackColor}
                    /> : <SolidIcons.ChevronRightIcon
                        onPress={() => setShowProduct(true)}
                        style={{ cursor: "pointer" }}
                        size={30}
                        color={themeColors.blackColor}
                    />}
                </StyledView>
                {/* Orders */}
                {showProduct && products.map(item => <StyledView 
                    key={item.id}
                    style={{ padding: 10 }}>
                    <StyledView
                        key={item.id}
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>
                        <StyledView
                            className="bg-white items-center justify-center"
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 10,
                            }}>
                            <StyledView style={{ ...styles.profileContainer, alignItems: "flex-start" }}>
                                <Image
                                    source={{ uri: item.img }}
                                    style={styles.avatarProduct}
                                />
                                <StyledText style={styles.name}>{item.name}</StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledView
                            className="bg-white items-center justify-center"
                            style={{
                                justifyContent: "space-between",
                                padding: 10,
                            }}>
                            <StyledText style={styles.name}>ຈຳນວນ: {item.qty}</StyledText>
                            <StyledText style={styles.name}>ລາຄາ: {item.price.toLocaleString('en-US')}</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>)}
                {/* Footer  */}
                <StyledView
                    style={{
                        marginTop: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                    <StyledText style={styles.name}>ຈຳນວນ: {products.length}</StyledText>
                    <StyledText style={styles.name}>ລາຄາລວມ: {totalPrice.toLocaleString('en-US')} ກີບ</StyledText>
                </StyledView>
            </View>
            <View style={{ ...styles.shadowContainer, marginTop: 15 }} className="p-3 shadow-lg">
                <StyledView
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                    <StyledView
                        className="bg-white items-center justify-center"
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                        }}>
                        <StyledView style={styles.profileContainer}>
                            <Image
                                source={{ uri: 'https://img5.pic.in.th/file/secure-sv1/7768c8613249919ab34689845850a960.jpg' }}
                                style={styles.avatar}
                            />
                            <StyledView
                                style={{
                                    justifyContent: "flex-start",
                                }}>
                                <StyledText style={styles.name}>John Doe</StyledText>
                                <StyledText style={{ fontSize: 12}}>02/04/2024 15:45</StyledText>
                            </StyledView>

                        </StyledView>

                    </StyledView>
                </StyledView>
                <StyledView
                    key={1}
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                    <StyledView
                        className="bg-white items-center justify-center"
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                        }}>
                        <StyledView style={{ ...styles.profileContainer, alignItems: "flex-start" }}>
                            <Image
                                source={{ uri: "https://img5.pic.in.th/file/secure-sv1/5207e11b470c444a8c8e2df13921f4bf.jpg" }}
                                style={styles.avatarProduct}
                            />
                            <StyledView>
                                <StyledText style={styles.name}>{"ບໍລິການທີ່ໃຊ້: ລ້າງລົດ"}</StyledText>
                                <StyledText style={styles.name}>{"ວັນທີ່ຈອງ: 02/04/2024 "}</StyledText>
                            </StyledView>

                        </StyledView>
                    </StyledView>
                    <StyledView
                        className="bg-white items-center justify-center"
                        style={{
                            justifyContent: "space-between",
                            padding: 10,
                        }}>
                        <StyledText style={styles.name}>ລາຄາ: 235,000</StyledText>
                        <StyledText style={styles.name}>ເວລາ:  15:45</StyledText>
                    </StyledView>
                </StyledView>
            </View>
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
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    avatarProduct: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default Orders