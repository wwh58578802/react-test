import { MenuProps } from '@/types/menu'
import SvgIcon from "@/components/svgIcon/svgIcon";
import './menu.scss'

export const Menu = ({ activeTab, onTabChange }: MenuProps) => {
    //menu list
    const menuIList = [{
        label: 'Miners',
        key: 'miners',
        activeIcon: <SvgIcon name="icon-miners-on" size={24}></SvgIcon>,
        icon: <SvgIcon name="icon-miners-off" size={24}></SvgIcon>
    }, {
        label: 'Asteroids',
        key: 'asteroids',
        activeIcon: <SvgIcon name="icon-asteroids-on" size={24}></SvgIcon>,
        icon: <SvgIcon name="icon-asteroids-off" size={24} ></SvgIcon >
    }, {
        label: 'Planets',
        key: 'planets',
        activeIcon: <SvgIcon name="icon-planets-on" size={24}></SvgIcon>,
        icon: <SvgIcon name="icon-planets-off" size={24} ></SvgIcon >
    }];
    const onItemClick = (key: string) => {
        if (onTabChange) {
            onTabChange(key)
        }
    }

    return (
        <div className='menu-list'>
            <ul>
                {menuIList.map((item, index) => (
                    <li className='menu-item' key={index} onClick={() => onItemClick(item.key)}>
                        <span>
                            {
                                activeTab === item.key ? item.activeIcon : item.icon
                            }
                        </span>
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}