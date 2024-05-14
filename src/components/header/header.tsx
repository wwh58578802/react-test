import { Layout } from 'antd'
import SvgIcon from "@/components/svgIcon/svgIcon";
import './header.scss'
const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    return (
        <>
            <Header>
                <i className="icon-header">
                    <SvgIcon name="icon-header" size={24}></SvgIcon></i>
                <span className='header-title'>BACKEND MINER</span>
            </Header>
        </>

    );
};

export default HeaderComponent;
