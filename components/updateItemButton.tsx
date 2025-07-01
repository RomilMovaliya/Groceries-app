import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import IncrementIcon from "../assets/IncrementIcon.svg";
import DecrementIcon from "../assets/decrementIcon.svg";
import { RootState } from "../app/Redux/Store";
import {
  decrementCartItemQuantity,
  incrementCartItemQuantity,
} from "../supabase/cart/cart.function";
import { getUserSession } from "../supabase/auth/authFunction";
import { Database } from "../database.types";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, IncremetQuantity } from "../app/Redux/CartSlice";

export type CART_ITEM = Database["public"]["Tables"]["cart"]["Row"];
interface UpdateItemButtonProps {
  itemData: {
    items_data: any;
    productid: number;
    id: number;
    name: string;
    quantity?: number;
  };
  storeItem?: CART_ITEM[];
  addQuantity: () => void;
  removeQuantity: () => void;
  quantity?: number;
  page?: string;
}

const UpdateItemButton: React.FC<UpdateItemButtonProps> = ({
  itemData,
  storeItem = [],
  addQuantity,
  removeQuantity,
  quantity,
}) => {
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserSession();
      if (userInfo.success) {
        setUserId(userInfo.user.session.user.user_metadata.sub);
      }
    };
    fetchUserInfo();
  }, []);

  const dispatch = useDispatch();
  const storedData = useSelector((state: RootState) => state.cart.items);

  const [quantityToShow, setQuantityToShow] = useState(1);

  console.log("itemdata", itemData);
  console.log("storeItem", JSON.stringify(storeItem, null, 2));

  // console.log("storeItem.find((item) => item?.items_data.id === itemData.id): ", storeItem.find((item) => item?.items_data.id === itemData?.items_data.id));

  const itemInSupabaseCart = useMemo(
    () => storeItem.find((item) => item?.items_data?.id === itemData?.items_data?.id),
    [storeItem, itemData?.id]
  );
  console.log("iteminsupabase 1", itemInSupabaseCart);

  useEffect(() => {
    const quantity = Number(
      itemInSupabaseCart?.quantity ?? itemData?.quantity ?? 1
    );
    setQuantityToShow(quantity);

  }, [itemInSupabaseCart?.quantity, itemData?.quantity]);

  const inCrementQuantityHandler = async () => {
    const newQty = quantityToShow + 1;

    const result = await incrementCartItemQuantity(userId, itemData.productid);

    if (result.success) {
      dispatch(IncremetQuantity(itemData.productid))
      addQuantity();
      setQuantityToShow(newQty);
    }
  };

  const deCrementQuantityHandler = async () => {
    if (quantityToShow <= 1) return;
    const newQty = quantityToShow - 1;
    const result = await decrementCartItemQuantity(userId, itemData.productid);
    if (result.success) {
      dispatch(decrementQuantity(itemData.productid))
      removeQuantity();
      setQuantityToShow(newQty);
    }
  };

  if (!itemInSupabaseCart) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          disabled={quantity === 1}
          onPress={() => {
            removeQuantity();
          }}
          style={styles.btnbox}
        >
          <DecrementIcon height={20} width={20} />
        </TouchableOpacity>
        <Text style={styles.rectangleBox}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => {
            addQuantity();
          }}
          style={styles.btnbox}
        >
          <IncrementIcon height={20} width={20} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnbox}
        disabled={quantityToShow === 1}
        onPress={deCrementQuantityHandler}
      >
        <DecrementIcon height={20} width={20} />
      </TouchableOpacity>

      <Text style={styles.rectangleBox}>{quantityToShow}</Text>

      <TouchableOpacity
        style={styles.btnbox}
        onPress={inCrementQuantityHandler}
      >
        <IncrementIcon height={20} width={20} />
      </TouchableOpacity>
    </View>
  );
};

export default UpdateItemButton;

const styles = StyleSheet.create({
  rectangleBox: {
    borderRadius: 6,
    width: 40,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 0.2,
  },
  container: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  btnbox: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#E2E2E2",
  },
});
