export interface MenuProps {
    menuIList?: Array<itemList>;
    activeTab: string;
    onItemClick?: (item: string) => void;
    onTabChange?: (item: string) => void;
}

interface itemList {
    label: string,
    key: string,
    icon: any,
    activeIcon: any;
}