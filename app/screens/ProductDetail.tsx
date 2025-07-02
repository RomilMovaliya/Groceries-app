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
import { getUserSession } from "../../supabase/auth/authFunction";
import {
  addItemToFavorite,
  fetchFavoriteItems,
  removeItemFromFavorite,
} from "../../supabase/favorite/favorite.function";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { addCartItem, fetchCart } from "../Redux/cart.thunks";

export type ITEM = Database["public"]["Tables"]["items_data"]["Row"];
export type CART_ITEM = Database["public"]["Tables"]["cart"]["Row"];

const ProductDetail = () => {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const parentId = Number(searchParams.get("parentid"));
  const navigation = useNavigation();

  const [quantity, setQuantity] = useState(1);
  const [filterProduct, setFilterProduct] = useState<ITEM | null>(null);
  const [like, setLike] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [fullCartItem, setFullCartItem] = useState<any>();
  const [isInCart, setIsInCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const dispatch = useDispatch();
  const { items: cartItems, loading } = useSelector(
    (state: RootState) => state.cart
  );

  // Initialize user session
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserSession();
      if (userInfo.success) {
        const uid = userInfo.user.session.user.user_metadata.sub;
        setUserId(uid);
        // Load cart items when user is found
        await dispatch(fetchCart(uid) as any);
      }
    };
    fetchUserInfo();
  }, [dispatch]);

  // Fetch product data
  useEffect(() => {
    const productListDataFunc = async () => {
      if (!parentId || !id) {
        console.warn("Invalid parentId or id");
        return;
      }

      try {
        const productListData = await fetchItemData(parentId);
        const matchedProduct = productListData.data?.find(
          (item) => item.id === id
        );

        if (matchedProduct) {
          setFilterProduct(matchedProduct);

          // Create cart item payload
          const payload = {
            items_data: matchedProduct,
            productid: matchedProduct.id,
            quantity: quantity,
            id: 0, // This will be set by the database
            category_id: matchedProduct.category_id,
          };
          setFullCartItem(payload);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    productListDataFunc();
  }, [id, parentId, quantity]);

  // Check if item is in cart
  useEffect(() => {
    if (filterProduct && cartItems.length >= 0) {
      const exists = cartItems.some(
        (item) => item.productid === filterProduct.id
      );
      setIsInCart(exists);
    }
  }, [filterProduct, cartItems]);

  // Fetch favorite status
  useEffect(() => {
    const fetchFavoriteData = async () => {
      if (!userId || !filterProduct) return;

      try {
        const result = await fetchFavoriteItems(userId);
        if (result.success) {
          const itemInFav = result.data.some(
            (item) => item.id === filterProduct.id
          );
          setLike(itemInFav);
        }
      } catch (error) {
        console.error("Error fetching favorite data:", error);
      }
    };
    fetchFavoriteData();
  }, [filterProduct, userId]);

  const addToCartFunc = async () => {
    if (!filterProduct || !userId || isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      const payload = {

        productid: filterProduct.id,
        quantity: quantity,
        userid: userId,
        category_id: filterProduct.category_id,
      };

      const result = await dispatch(addCartItem({ userId, item: payload }) as any);

      if (result.type.endsWith('/fulfilled')) {
        setIsInCart(true);
        // Optionally refresh cart to get latest data
        await dispatch(fetchCart(userId) as any);
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const favoriteItemHandler = async () => {
    if (!filterProduct || !userId) return;

    try {
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
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  if (!filterProduct) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
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
            style={styles.productImage}
            resizeMode="contain"
            source={{ uri: filterProduct.img }}
          />
        </View>

        <View style={styles.topheading}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon height={24} width={24} />
          </TouchableOpacity>
          <ShareIcon height={25} width={25} />
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.productTitle}>{filterProduct.name}</Text>
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
          storeItem={cartItems}
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
          title={isInCart ? "Already in Cart" : "Add To Basket"}
          onPress={addToCartFunc}
          loader={isAddingToCart}
          disabled={isInCart || isAddingToCart}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topheading: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 30,
    justifyContent: "space-between",
    zIndex: 1,
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
  productImage: {
    width: "90%",
    height: "100%",
    alignSelf: "center",
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  subtitleText: {
    color: "#7C7C7C",
    paddingHorizontal: 20,
    fontSize: 16,
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
    minWidth: 40,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 8,
    paddingVertical: 8,
  },
  bottomButton: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E2E2",
    backgroundColor: "white",
  },
});
