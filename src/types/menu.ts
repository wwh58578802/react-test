export interface MenuProps {
    menuIList?: itemList[];
    activeTab: string;
    onItemClick?: (item: string) => void;
    onTabChange?: (item: string) => void;
}

interface itemList {
    label: string;
    key: string;
    icon: string;
    activeIcon: string;
}