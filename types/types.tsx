import { ButtonProps, ImageSourcePropType, TextInputProps, TextProps, TextStyle, TouchableOpacityProps } from "react-native";

export interface DropdownItem {
    id: number;
    name: string;
}

export interface CustomDropdownProps extends TouchableOpacityProps {
    data: DropdownItem[];
    onSelect: (item: DropdownItem) => void;
}

export interface Zone {
    id: number;
    name: string;
}

export interface Area {
    id: number;
    name: string;
}

export interface MyButtonProps extends ButtonProps, TextInputProps {
    title: string
    textStyle?: TextStyle,
    loader?: boolean
}

export interface MyProductTitle extends TextProps {
    title: string
}

export interface ProductData {
    id: number,
    name: string,
    pieces: number,
    price: number,
    img: ImageSourcePropType
}