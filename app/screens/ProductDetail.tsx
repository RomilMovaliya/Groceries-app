import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackIcon from "../../assets/backIcon.svg";
import ShareIcon from "../../assets/shareIcon.svg";
import { router, useNavigation } from "expo-router";
import UpdateItemButton from "../../components/updateItemButton";
import ProductDescription from "../../components/productDescription";
import Button from "../../components/button";
import { useSearchParams } from "expo-router/build/hooks";
import Icon from "@react-native-vector-icons/material-design-icons";
import { fetchItemData } from "../../supabase/data/dataFunction";
import { Database } from "../../database.types";
import {
  addItemToCart,
  fetchCartItems,
} from "../../supabase/cart/cart.function";
import { getUserSession } from "../../supabase/auth/authFunction";
import {
  addItemToFavorite,
  fetchFavoriteItems,
  removeItemFromFavorite,
} from "../../supabase/favorite/favorite.function";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { addCartItem } from "../Redux/cart.thunks";

export type ITEM = Database["public"]["Tables"]["items_data"]["Row"];
export type CART_ITEM = Database["public"]["Tables"]["cart"]["Row"];
const ProductDetail = () => {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const parentId = Number(searchParams.get("parentid"));
  const navigation = useNavigation();

  const [quantity, setQuantity] = useState(1);
  const [filterProduct, setFilterProduct] = useState<ITEM | null>(null);
  const [cartapiItems, setCartapiItems] = useState<CART_ITEM[]>([]);
  const [like, setLike] = useState(false);
  const [userId, setUserId] = useState();
  const [fullCartItem, setFullCartItem] = useState<any>();
  const [isInCart, setIsInCart] = useState(false);

  const dispatch = useDispatch();
  const { items: cartItems, loading } = useSelector(
    (state: RootState) => state.cart
  );


  //console.log("Cart State:", cartItems);


  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserSession();
      if (userInfo.success) {
        setUserId(userInfo.user.session.user.user_metadata.sub);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const productListDataFunc = async () => {
      if (!parentId || !id) {
        console.warn("Invalid parentId or id");
        return;
      }
      const productListData = await fetchItemData(parentId);
      // console.log("productListData", JSON.stringify(productListData.data, null, 2));

      const matchedProduct = productListData.data?.find(
        (item) => item.id === id
      );
      setFilterProduct(matchedProduct ?? null);
      // console.log("Matched Product:", JSON.stringify(matchedProduct, null, 2));
    };

    productListDataFunc();
  }, [id, parentId]);

  useEffect(() => {
    if (!userId) return;

    const cartItemFunc = async () => {
      const cartItems = await fetchCartItems(userId);
      // console.log("cartItems", cartItems.data);

      if (cartItems.success && cartItems.data) {
        setCartapiItems(cartItems.data);
        const exists = cartItems.data.some(
          (cartItem) => cartItem.productid === filterProduct?.id
        );
        setIsInCart(exists);
        // console.log("foundItems", JSON.stringify(cartItems.data, null, 2));
      }
    };
    cartItemFunc();
  }, [userId]);

  useEffect(() => {
    if (filterProduct) {
      const exists = cartItems.some(
        (item) => item.productid === filterProduct.id
      );
      setIsInCart(exists);
    }
  }, [userId, cartItems, filterProduct]);


  useEffect(() => {
    if (!userId || !filterProduct) return;

    const checkCartItem = async () => {
      // Use API cart only if redux cart is empty
      if (cartItems.length === 0) {
        const cartRes = await fetchCartItems(userId);
        if (cartRes.success && cartRes.data) {
          const inCart = cartRes.data.some(
            (item) => item.productid === filterProduct.id
          );
          setIsInCart(inCart);
          setCartapiItems(cartRes.data);
        }
      } else {
        const exists = cartItems.some(
          (item) => item.productid === filterProduct.id
        );
        setIsInCart(exists);
      }
    };

    checkCartItem();
  }, [userId, filterProduct]);

  const addToCartFunc = async () => {
    if (!filterProduct) return;

    const payload = {
      category_id: filterProduct.category_id,
      productid: filterProduct.id,
      quantity: quantity,
    };

    const addData = await addItemToCart(payload, userId);

    if (addData.success) {
      await dispatch(addCartItem({ userId, item: payload }) as any);
    } else {
      console.error("Failed to add item to cart:", addData.message);
    }
  };

  useEffect(() => {
    const productListDataFunc = async () => {
      if (!parentId || !id) {
        console.warn("Invalid parentId or id");
        return;
      }
      const productListData = await fetchItemData(parentId);
      const matchedProduct = productListData.data?.find(
        (item) => item.id === id
      );
      setFilterProduct(matchedProduct ?? null);
      const payload = {
        items_data: matchedProduct,
        productid: matchedProduct?.id,
        quantity: 1,
      }
      //console.log("payload", payload);

      setFullCartItem(payload);
    };

    productListDataFunc();
  }, [id, parentId]);

  useEffect(() => {
    const fetchFavoriteData = async () => {
      const result = await fetchFavoriteItems(userId);

      if (result.success) {
        const iteminfav = result.data.some(
          (item) => item.id === filterProduct?.id
        );
        setLike(iteminfav);
      }
    };
    fetchFavoriteData();
  }, [filterProduct]);

  const favoriteItemHandler = async () => {
    if (!filterProduct || !userId) return;

    if (like) {
      const removed = await removeItemFromFavorite(userId, filterProduct.id);
      if (removed.success) {
        setLike(false);
      }
    } else {
      const favoritePayload = {
        ...filterProduct,
        quantity: 1,
        userid: userId,
      };
      const added = await addItemToFavorite(favoritePayload, userId);
      if (added.success) {
        setLike(true);
      }
    }
  };

  if (!filterProduct) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading product details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBox}>
          <Image
            style={{
              width: "90%",
              height: "100%",
              alignSelf: "center",
              marginBottom: 10,
            }}
            resizeMode="contain"
            source={{ uri: filterProduct.img }}
          />
        </View>

        <View style={styles.topheading}>
          <BackIcon
            height={24}
            width={24}
            onPress={() => navigation.goBack()}
          />
          <ShareIcon height={25} width={25} />
        </View>

        <View style={styles.titleRow}>
          <Text>{filterProduct.name}</Text>
          <TouchableOpacity onPress={favoriteItemHandler}>
            <Icon
              name={like ? "heart" : "heart-outline"}
              color={like ? "red" : "black"}
              size={24}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitleText}>
          1kg, Price ${filterProduct.price}
        </Text>

        <UpdateItemButton
          itemData={fullCartItem}
          storeItem={cartapiItems}
          addQuantity={() => setQuantity((prev) => prev + 1)}
          removeQuantity={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          quantity={quantity}
        />

        <ProductDescription
          title="Product Detail"
          description={filterProduct.productdetails}
          weight={false}
          rating={0}
        />
        <ProductDescription
          title="Nutritions"
          description={filterProduct.nutritions}
          weight={true}
          rating={0}
        />
        <ProductDescription
          title="Review"
          description={filterProduct.review}
          weight={false}
          rating={filterProduct.rating}
        />
      </ScrollView>

      <View style={styles.bottomButton}>
        <Button
          title="Add To Basket"
          onPress={() => addToCartFunc()}
          loader={loading}
          disabled={isInCart || loading}
        />

      </View>
    </SafeAreaView>
  );
};
export default ProductDetail;
const styles = StyleSheet.create({
  topheading: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 30,
    justifyContent: "space-between",
  },
  topBox: {
    alignSelf: "center",
    width: "100%",
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: "#E2E3E2",
    height: 200,
    marginTop: 80,
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  subtitleText: {
    color: "#7C7C7C",
    paddingHorizontal: 20,
  },
  bottomButton: {
    padding: 20,
    borderColor: "#E2E2E2",
    backgroundColor: "white",
  },
});
