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
import { CartWithItem } from "../app/Redux/CartSlice";

export type CART_ITEM = Database["public"]["Tables"]["cart"]["Row"];

interface UpdateItemButtonProps {
  itemData: {
    items_data: any;
    productid: number;
    id: number;
    name?: string;
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
  quantity,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

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
        (item) => item?.productid === itemData?.productid
      ),
    [storeItem, itemData?.productid]
  );

  // Use Redux cart quantity if available, otherwise use local quantity or itemData quantity
  const currentQuantity = itemInReduxCart?.quantity ?? quantity ?? itemData?.quantity ?? 1;

  const incrementQuantityHandler = async () => {
    if (!userId || isUpdating || !itemData?.productid) return;

    setIsUpdating(true);
    try {
      if (itemInReduxCart) {
        // Item is in cart, update via Redux
        await dispatch(incrementCartItem({ userId, productid: itemData.productid }) as any);
      } else {
        // Item not in cart, use local handler
        addQuantity();
      }
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const decrementQuantityHandler = async () => {
    if (!userId || currentQuantity <= 1 || isUpdating || !itemData?.productid) return;

    setIsUpdating(true);
    try {
      if (itemInReduxCart) {
        // Item is in cart, update via Redux
        await dispatch(decrementCartItem({ userId, productid: itemData.productid }) as any);
      } else {
        // Item not in cart, use local handler
        removeQuantity();
      }
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        // style={[styles.btnbox, (currentQuantity === 1 || isUpdating) && styles.disabled]}
        disabled={currentQuantity === 1 || isUpdating}
        onPress={decrementQuantityHandler}
      >
        <DecrementIcon height={20} width={20} />
      </TouchableOpacity>

      <View style={styles.rectangleBox}>
        <Text style={styles.quantityText} allowFontScaling={false}>
          {currentQuantity}
        </Text>
      </View>

      <TouchableOpacity
        // style={[styles.btnbox, isUpdating && styles.disabled]}
        disabled={isUpdating}
        onPress={incrementQuantityHandler}
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.2,
    backgroundColor: "#fff",
    minWidth: 40,      // 👈 lock min size
    minHeight: 40,     // 👈 lock min size
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    textAlignVertical: "center",

  },

  container: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 20,
  },
  btnbox: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#E2E2E2",
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});