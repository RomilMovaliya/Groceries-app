import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import LeftIcon from "../../assets/leftColorIcon.svg";
import { fetchFavoriteItems } from "../../supabase/favorite/favorite.function";
import { getUserSession } from "../../supabase/auth/authFunction";
import { addItemToCart } from "../../supabase/cart/cart.function";
import { router } from "expo-router";
import { Database } from "../../database.types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { addCartItem } from "../Redux/cart.thunks";

type ITEM_CART = Database["public"]["Tables"]["cart"]["Row"];
const FavoriteScreen = () => {
  const [userId, setUserId] = useState();
  const [favoriteData, setFavoriteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const dispatch = useDispatch();
  const { items: cartItems, loading } = useSelector(
    (state: RootState) => state.cart
  );
  const fetchUserInfo = async () => {
    const userInfo = await getUserSession();
    if (userInfo.success) {
      setUserId(userInfo.user.session.user.user_metadata.sub);
    }
  };

  const loadFavorites = async (isRefresh = false) => {
    if (!userId) return;
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    const data = await fetchFavoriteItems(userId);
    if (data.success) {
      setFavoriteData(data.data);
    }
    if (isRefresh) {
      setIsRefreshing(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userId) loadFavorites();
  }, [userId]);

  const addToCartFunc = async (item: ITEM_CART) => {
    if (!item) return;

    const payload = {
      id: item.id,
      category_id: item.category_id,
      productid: item.id,
      quantity: 1,
      userid: userId,
    };
    console.log("payload", payload);


    const addData = await addItemToCart(payload, userId);

    if (addData.success) {
      await dispatch(addCartItem({ userId, item: payload }) as any);
      console.log("Item added to Supabase cart successfully");
    } else {
      console.error("Failed to add item to cart:", addData.message);
    }
  };

  return (
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
          Favorite
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <FlatList
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          refreshing={isRefreshing}
          onRefresh={() => loadFavorites(true)}
          data={favoriteData}
          renderItem={({ item }) => (
            <View
              style={{
                height: responsiveHeight(20),
                flexDirection: "row",
                borderBottomWidth: 1.8,
                borderBottomColor: "#E2E2E2",
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
                    typeof item.img === "string" ? { uri: item.img } : item.img
                  }
                />
              </View>

              <View
                style={{
                  flex: 0.7,
                  paddingHorizontal: 10,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text>{item.name}</Text>
                    <Text>{item.pieces}gm, Price</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text>${item.price}</Text>
                    <LeftIcon height={18} width={18} />
                  </View>
                </View>
              </View>
            </View>
          )}
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
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          <Button
            onPress={async () => {
              setButtonLoading(true);
              for (const item of favoriteData) {
                await addToCartFunc(item);
              }
              await fetchFavoriteItems(userId);
              setButtonLoading(false);
              router.navigate("/tabs/cart");
            }}
            title="Add All To Cart"
            loader={buttonLoading}
            disabled={buttonLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
