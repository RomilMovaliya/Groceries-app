export interface DropdownItem {
    id: number;
    name: string;
}

export interface CustomDropdownProps {
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