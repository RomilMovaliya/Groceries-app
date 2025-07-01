import {
  ActivityIndicator,
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
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const loadCartItems = async (uid: string, refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    const cartResult = await fetchCartItems(uid);
    if (cartResult.success && cartResult.data) {
      setCartItems(cartResult.data);
    } else {
      console.log("Cart fetch failed:", cartResult.message);
    }

    if (refresh) {
      setIsRefreshing(false);
    } else {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        const userInfo = await getUserSession();
        if (userInfo.success) {
          const id = userInfo.user.session.user.user_metadata.sub;
          setUserId(id);
          await loadCartItems(id);
        }
      };
      init();
    }, [])
  );

  const removeItemFn = async (itemId: number) => {
    if (!userId) return;
    const result = await removeItemFromCart(userId, itemId);
    if (result.success) {
      await loadCartItems(userId);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.header}>My Cart</Text>

        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={cartItems}
          refreshing={isRefreshing}
          onRefresh={() => userId && loadCartItems(userId, true)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  resizeMode="contain"
                  source={
                    typeof item.img === "string" ? { uri: item.img } : item.img
                  }
                />
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <CancelIcon
                    onPress={() => removeItemFn(item.id)}
                    height={20}
                    width={20}
                  />
                </View>
                <Text>1Kg Price</Text>
                <View style={styles.footerRow}>
                  <UpdateItemButton
                    storeItem={cartItems}
                    itemData={item}
                    addQuantity={() => { }}
                    removeQuantity={() => { }}
                  />
                  <Text style={styles.priceText}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />

        <View style={styles.checkoutContainer}>
          <Button
            onPress={() => bottomSheetRef.current?.expand()}
            title="Go To Checkout"
          />
          <Text style={styles.totalText}>${total.toFixed(2)}</Text>
        </View>

        <CheckoutBottomSheet
          ref={bottomSheetRef}
          totalprice={total.toFixed(2)}
          children={""}
        />

        {isLoading && <ActivityIndicator
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 10,
            bottom: 10
          }}
          size={'large'}
          color={'green'}
        />}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 12,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  listContainer: {
    paddingHorizontal: 20,
    gap: 5,
  },
  separator: {
    borderColor: "grey",
    borderWidth: 0.6,
  },
  itemRow: {
    height: responsiveHeight(20),
    flexDirection: "row",
  },
  imageContainer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: responsiveWidth(25),
    height: responsiveHeight(12),
  },
  detailsContainer: {
    flex: 0.7,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 12,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    marginTop: 5,
    fontSize: 18,
  },
  checkoutContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "flex-end",
  },
  totalText: {
    position: "absolute",
    color: "white",
    right: 30,
    bottom: 15,
    borderRadius: 9,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
