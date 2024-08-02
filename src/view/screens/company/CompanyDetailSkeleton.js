import { View, ScrollView, Dimensions, SafeAreaView } from "react-native";
import React from "react";
import Skeleton from "react-native-reanimated-skeleton";

const CompanyDetailSkeleton = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Skeleton
            layout={[
              {
                width: screenWidth,
                height: 200,
              },
            ]}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: 5,
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <View style={{ flexDirection: "row"}} className="space-x-2 items-center">
            <View>
              <Skeleton
                layout={[
                  {
                    width: 50,
                    height: 50,
                    borderRadius: 100,
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
          style={{
            marginBottom: 5,
            backgroundColor: "white",
            padding: 20,
          }}
        >
          {[...Array(2).keys()].map((index, item) => (
            <View style={{ marginBottom: index === 1 ? 0 : 20 }}>
              <View style={{ flexDirection: "row" }} className="space-x-4">
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
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "space-between",
                }}
                className="space-x-4"
              >
                <View style={{ flexDirection: "row" }} className="space-x-4">
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
                  <View>
                    <Skeleton
                      layout={[
                        {
                          width: 200,
                          height: 20,
                          alignSelf: "flex-start",
                        },
                      ]}
                    />
                  </View>
                </View>
                <View>
                  <Skeleton
                    layout={[
                      {
                        width: 20,
                        height: 20,
                        alignSelf: "flex-end",
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyDetailSkeleton;
