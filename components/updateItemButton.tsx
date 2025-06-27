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

export type CART_ITEM = Database["public"]["Tables"]["cart"]["Row"];
interface UpdateItemButtonProps {
  itemData: {
    id: number;
    name: string;
    quantity?: number;
  };
  storeItem?: CART_ITEM[];
  addQuantity: () => void;
  removeQuantity: () => void;
  quantity?: number;
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

  const [quantityToShow, setQuantityToShow] = useState(1);

  const itemInSupabaseCart = useMemo(
    () => storeItem.find((item) => item?.id === itemData?.id),
    [storeItem, itemData?.id]
  );

  useEffect(() => {
    const quantity = Number(
      itemInSupabaseCart?.quantity ?? itemData?.quantity ?? 1
    );
    setQuantityToShow(quantity);
  }, [itemInSupabaseCart?.quantity, itemData?.quantity]);

  const inCrementQuantityHandler = async () => {
    const newQty = quantityToShow + 1;

    const result = await incrementCartItemQuantity(userId, itemData.id);
    console.log("itemData.id", itemData.id);
    console.log("userId", userId);

    if (result.success) {
      addQuantity();
      setQuantityToShow(newQty);
      console.log("result.item", result.item);
    }
    console.log("message", result.message);
  };

  const deCrementQuantityHandler = async () => {
    if (quantityToShow <= 1) return;
    const newQty = quantityToShow - 1;
    const result = await decrementCartItemQuantity(userId, itemData.id);
    if (result.success) {
      removeQuantity();
      setQuantityToShow(newQty);
      console.log("result.item", result);
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
