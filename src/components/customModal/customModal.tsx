import React, { useEffect } from 'react';
import { ModalProps } from '@/types/modal'
import { Modal } from 'antd';

export const CustomModal: React.FC<ModalProps> = ({ title, width, visible, onClose, content, duration, isDuration }) => {
    useEffect(() => {
        let timeout: number;
        if (isDuration) {
            if (visible) {
                timeout = window.setTimeout(onClose, duration);
            }
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [visible, onClose, duration]);

    return (
        <Modal title={title} width={width} open={visible} onCancel={onClose} footer={null} maskClosable={false}>
            {content}
        </Modal>
    );
};