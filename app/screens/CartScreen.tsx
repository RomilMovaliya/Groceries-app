import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CancelIcon from "../../assets/cancelIcon.svg";
import UpdateItemButton from "../../components/updateItemButton";
import Button from "../../components/button";
import CheckoutBottomSheet from "../../components/checkoutBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  fetchCartItems,
  removeItemFromCart,
} from "../../supabase/cart/cart.function";
import { Database } from "../../database.types";
import { getUserSession } from "../../supabase/auth/authFunction";
import { useFocusEffect } from "expo-router";

type ITEM = Database["public"]["Tables"]["cart"]["Row"];
const CartScreen = () => {
  const [cartItems, setCartItems] = useState<ITEM[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState();

  useFocusEffect(
    useCallback(() => {
      console.log("CartScreen is focused");

      const fetchUserAndCart = async () => {
        const userInfo = await getUserSession();
        if (userInfo.success) {
          const id = userInfo.user.session.user.user_metadata.sub;
          setUserId(id);

          const cartResult = await fetchCartItems(id);
          if (cartResult.success && cartResult.data) {
            setCartItems(cartResult.data);
            console.log(
              "Cart items refreshed:",
              JSON.stringify(cartResult.data, null, 2)
            );
          } else {
            console.log("Cart fetch failed:", cartResult.message);
          }
        } else {
          console.log("User session fetch failed.");
        }
      };

      fetchUserAndCart();
    }, [])
  );

  const removeItemFn = async (userid: string, id: number) => {
    const result = await removeItemFromCart(userid, id);
    if (result.success) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1 }}>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                paddingVertical: 12,
                borderBottomColor: "grey",
                borderBottomWidth: 0.5,
              }}
            >
              My Cart
            </Text>
          </View>
          <FlatList
            keyExtractor={(item, index) => `${item.id}-${index}`}
            scrollEnabled={true}
            style={{
              marginTop: 10,
            }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderColor: "grey",
                  borderWidth: 0.6,
                }}
              />
            )}
            contentContainerStyle={{
              gap: 5,
              paddingHorizontal: 20,
            }}
            data={cartItems}
            renderItem={({ item }) => {
              console.log("Rendering item:", item);
              return (
                <View
                  style={{
                    height: responsiveHeight(20),
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 0.3,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: responsiveWidth(25),
                        height: responsiveHeight(12),
                      }}
                      resizeMode="contain"
                      source={
                        typeof item.img === "string"
                          ? { uri: item.img }
                          : item.img
                      }
                    />
                  </View>

                  <View
                    style={{
                      flex: 0.7,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {item.name}
                      </Text>
                      <CancelIcon
                        onPress={() => {
                          removeItemFn(userId, item.id);
                        }}
                        height={20}
                        width={20}
                      />
                    </View>

                    <Text>1Kg Price</Text>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <UpdateItemButton
                        storeItem={cartItems}
                        itemData={item}
                        addQuantity={() => setQuantity((prev) => prev + 1)}
                        removeQuantity={() =>
                          setQuantity((prev) => Math.max(prev - 1, 1))
                        }
                      />
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: 18,
                        }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              justifyContent: "flex-end",
              marginVertical: 10,
            }}
          >
            <Button
              onPress={() => {
                console.log("bottom sheet will open");
                bottomSheetRef.current.expand();
              }}
              title="Go To Checkout"
            />
            <Text
              style={{
                position: "absolute",
                color: "white",
                right: 30,
                bottom: 15,
                borderRadius: 9,
                paddingHorizontal: 10,
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
            >
              ${total.toFixed(2)}
            </Text>
          </View>

          <CheckoutBottomSheet
            ref={bottomSheetRef}
            totalprice={total.toFixed(2)}
            children={""}

          />
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
