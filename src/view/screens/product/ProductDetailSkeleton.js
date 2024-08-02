import {
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React from "react";
import Skeleton from "react-native-reanimated-skeleton";

const ProductDetailSkeleton = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Skeleton
            layout={[
              {
                width: screenWidth,
                height: screenWidth,
              },
            ]}
          />

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginBottom: 5,
              justifyContent: "space-between",
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <View style={{ flexDirection: "row" }} className="space-x-2">
              <View>
                <Skeleton
                  layout={[
                    {
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    },
                  ]}
                />
              </View>

              <View className="space-y-2">
                <View>
                  <Skeleton
                    layout={[
                      {
                        width: 80,
                        height: 20,
                        alignSelf: "flex-start",
                      },
                    ]}
                  />
                </View>
                <View>
                  <Skeleton
                    layout={[
                      {
                        width: 140,
                        height: 10,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            <View>
              <Skeleton
                layout={[
                  {
                    width: 80,
                    height: 20,
                    alignSelf: "flex-end",
                  },
                ]}
              />
            </View>
          </View>
          <View
            style={{ backgroundColor: "white", padding: 20, marginBottom: 5 }}
            className="space-y-8"
          >
            <View>
              <Skeleton
                layout={[
                  {
                    width: 120,
                    height: 20,
                    alignSelf: "flex-start",
                  },
                ]}
              />
            </View>
            <View className="space-y-4">
              <View>
                <Skeleton
                  layout={[
                    {
                      width: 140,
                      height: 20,
                      alignSelf: "flex-start",
                    },
                  ]}
                />
              </View>
              <View>
                <Skeleton
                  layout={[
                    {
                      width: 120,
                      height: 10,
                      alignSelf: "flex-start",
                    },
                  ]}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Skeleton
                    layout={[
                      {
                        width: 120,
                        height: 20,
                        alignSelf: "flex-start",
                      },
                    ]}
                  />
                </View>
                <View>
                  <Skeleton
                    layout={[
                      {
                        width: 60,
                        height: 20,
                        alignSelf: "flex-start",
                      },
                    ]}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  {[...Array(3).keys()].map((item, index) => (
                    <View key={index}>
                      <Skeleton
                        layout={[
                          {
                            width: screenWidth * 0.9,
                            height: 20,
                            alignSelf: "flex-start",
                            marginBottom: index === 3 ? 0 : 10,
                          },
                        ]}
                      />
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    {[...Array(2).keys()].map((item, index) => (
                      <View key={index}>
                        <Skeleton
                          layout={[
                            {
                              width: 80,
                              height: 20,
                              alignSelf: "flex-start",
                              marginRight: index === 1 ? 0 : 10,
                            },
                          ]}
                        />
                      </View>
                    ))}
                  </View>
                  <View>
                    <Skeleton
                      layout={[
                        {
                          width: 20,
                          height: 20,
                          alignSelf: "flex-start",
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5
            }}
          >
            <View>
              <Skeleton
                layout={[
                  {
                    width: 140,
                    height: 20,
                    alignSelf: "flex-start",
                  },
                ]}
              />
            </View>
            <View>
              <Skeleton
                layout={[
                  {
                    width: 20,
                    height: 20,
                    alignSelf: "flex-start",
                  },
                ]}
              />
            </View>
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: "white",
            }}
            className="space-y-4"
          >
            <View>
              <Skeleton
                layout={[
                  {
                    width: 140,
                    height: 20,
                    alignSelf: "flex-start",
                  },
                ]}
              />
            </View>
            <View>
              <Skeleton
                layout={[
                  {
                    width: "100%",
                    height: 170,
                    borderRadius: 10,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailSkeleton;
