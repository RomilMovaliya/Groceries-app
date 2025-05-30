import { ButtonProps, TextInputProps, TextProps, TouchableOpacityProps } from "react-native";

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
}

export interface MyProductTitle extends TextProps {
    title: string
}

export interface ProductData {
    id: number,
    name: string,
    pieces: string,
    price: number,
    img: string
}