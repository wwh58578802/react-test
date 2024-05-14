export interface ModalProps {
    title: string;
    width: number;
    visible: boolean;
    onClose: () => void;
    content?: any;
    duration?: number;
    maskClosable?: boolean;
    isDuration: boolean
};