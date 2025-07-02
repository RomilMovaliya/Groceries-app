import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import IncrementIcon from "../assets/IncrementIcon.svg";
import DecrementIcon from "../assets/decrementIcon.svg";
import { getUserSession } from "../supabase/auth/authFunction";
import { Database } from "../database.types";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCartItem,
  decrementCartItem,
} from "../app/Redux/cart.thunks";
import {
  CartWithItem,
  IncremetQuantity,
  decrementQuantity,
} from "../app/Redux/CartSlice";

export type CART_ITEM = Database["public"]["Tables"]["cart"]["Row"];

interface UpdateItemButtonProps {
  itemData: {
    items_data: any;
    productid: number;
    id: number;
    name: string;
    quantity?: number;
  };
  storeItem?: CartWithItem[];
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
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const [quantityToShow, setQuantityToShow] = useState(1);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserSession();
      if (userInfo.success) {
        setUserId(userInfo.user.session.user.user_metadata.sub);
      }
    };
    fetchUserInfo();
  }, []);

  const itemInReduxCart = useMemo(
    () =>
      storeItem.find(
        (item) => item?.items_data?.id === itemData?.items_data?.id
      ),
    [storeItem, itemData?.items_data?.id]
  );

  useEffect(() => {
    const quantity = Number(
      itemInReduxCart?.quantity ?? itemData?.quantity ?? 1
    );
    setQuantityToShow(quantity);
  }, [itemInReduxCart?.quantity, itemData?.quantity]);

  const inCrementQuantityHandler = () => {
    if (!userId) return;
    dispatch(incrementCartItem({ userId, productid: itemData.productid }) as any);
    dispatch(IncremetQuantity(itemData.id));
    setQuantityToShow((prev) => prev + 1);
  };

  const deCrementQuantityHandler = () => {
    if (!userId || quantityToShow <= 1) return;
    dispatch(decrementCartItem({ userId, productid: itemData.productid }) as any);
    dispatch(decrementQuantity(itemData.id));
    setQuantityToShow((prev) => prev - 1);
  };

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

      <TouchableOpacity style={styles.btnbox} onPress={inCrementQuantityHandler}>
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
