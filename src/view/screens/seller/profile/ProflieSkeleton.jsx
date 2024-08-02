import { View, ScrollView, Dimensions, SafeAreaView } from "react-native";
import React from "react";
import Skeleton from "react-native-reanimated-skeleton";

const ProflieSkeleton = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            position: "absolute",
            top: 100,
            alignSelf: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Skeleton
            layout={[
              {
                alignSelf: "center",
                width: 150,
                height: 150,
                borderColor: "#FFFFFF",
                borderRadius: 100,
                borderWidth: 4,
              },
            ]}
          />
        </View>
        <Skeleton
          layout={[
            {
              width: "100%",
              height: 200,
            },
          ]}
        />

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <View style={{ flex: 1, padding: 15, marginTop: 80 }}>
            <View>
              <View>
                <Skeleton
                  layout={[
                    {
                      alignSelf: "flex-start",
                      width: 140,
                      height: 20,
                    },
                  ]}
                />
              </View>
              <View>
                <Skeleton
                  layout={[
                    {
                      width: "100%",
                      height: 58,
                      marginTop: 10,
                    },
                  ]}
                />
              </View>
            </View>
            <View className="mt-8">
              <View>
                <Skeleton
                  layout={[
                    {
                      alignSelf: "flex-start",
                      width: 140,
                      height: 20,
                    },
                  ]}
                />
              </View>
              <View>
                <Skeleton
                  layout={[
                    {
                      width: "100%",
                      height: 58,
                      marginTop: 10,
                    },
                  ]}
                />
              </View>
            </View>
            <View className="mt-8">
              <View>
                <Skeleton
                  layout={[
                    {
                      alignSelf: "flex-start",
                      width: 140,
                      height: 20,
                    },
                  ]}
                />
              </View>
              <View>
                <Skeleton
                  layout={[
                    {
                      width: "100%",
                      height: 58,
                      marginTop: 10,
                    },
                  ]}
                />
              </View>
            </View>

            <View className="mt-8">
              <View>
                <Skeleton
                  layout={[
                    {
                      alignSelf: "flex-start",
                      width: 200,
                      height: 20,
                    },
                  ]}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <View>
                  <Skeleton
                    layout={[
                      {
                        width: 290,
                        height: 18,
                        marginLeft: 30,
                      },
                    ]}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <View>
                  <Skeleton
                    layout={[
                      {
                        width: 157,
                        height: 10,
                        marginLeft: 10,
                      },
                    ]}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <View>
                  <Skeleton
                    layout={[
                      {
                        alignSelf: "flex-start",
                        width: 200,
                        height: 18,
                      },
                    ]}
                  />
                </View>
                <View>
                  <Skeleton
                    layout={[
                      {
                        alignSelf: "flex-end",
                        width: 70,
                        height: 18,
                        marginLeft: 10,
                      },
                    ]}
                  />
                </View>
              </View> 
            </View>
          </View>
        </View>

        <View style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
          <View>
          
            <View>
              <Skeleton
                layout={[
                  {
                    width: "100%",
                    height: 15,
                  },
                ]}
              />
            </View>
            <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <View>
                  <Skeleton
                    layout={[
                      {
                        alignSelf: "flex-start",
                        width: 100,
                        height: 18,
                      },
                    ]}
                  />
                </View>
                <View>
                  <Skeleton
                    layout={[
                      {
                        alignSelf: "flex-end",
                        width: 200,
                        height: 18,
                        marginLeft: 10,
                      },
                    ]}
                  />
                </View>
              </View>
              <View>
              <Skeleton
                layout={[
                  {
                    width: '100%',
                    height: 10,
                    alignSelf: "flex-end",
                    marginTop: 8
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
                    marginTop: 8,
                  },
                ]}
              />
            </View>
            
            
            <View>
              <Skeleton
                layout={[
                  {
                    width: 152,
                    height: 58,
                    borderRadius: 10,
                    marginTop: 10,
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

export default ProflieSkeleton;
