import { Modal } from 'antd';
import { Form, Input, InputNumber, Button, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'

export const CreateMinnerForm = ({ planetsData, onSlectChange, submitForm, createModalVisible, setCreateModalVisible }: any) => {
    const [form] = useForm();
    const { Option } = Select;

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
    const validateMessages = {
        required: 'Please enter ${label}',
        types: {
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const handleSlectChange = (planetId: string) => {
        onSlectChange(planetId)
    };

    const closeModal = () => {
        setCreateModalVisible(false);
        form.resetFields();
    };

    const handleSubmitForm = (formData: any) => {
        form.resetFields();
        submitForm(formData);
    };

    return (
        <>
            <Modal title='Create a minner' width={447} open={createModalVisible} onCancel={closeModal} footer={null} maskClosable={false}>
                <Form
                    {...layout}
                    form={form}
                    onFinish={handleSubmitForm}
                    style={{ maxWidth: 447 }}
                    validateMessages={validateMessages}
                >
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="planet" label="Planet" rules={[{ required: true }]}>
                        <Select className="custom-select" placeholder="Select a planet" onChange={handleSlectChange}>
                            {planetsData?.map((item: any) => (
                                <Option key={item._id} value={item._id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <div className="create-minner-form-content">
                        <h2 className='create-minner-form-text mar-t-l'>Assign points</h2>
                        <div className='create-minner-form-item'>
                            <Form.Item name='carryCapacity' label="carryCapacity" rules={[{ required: true, type: 'number', min: 1, max: 200 }]}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name='travelSpeed' label="travelSpeed" rules={[{ required: true, type: 'number', min: 1, max: 200 }]}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name='miningSpeed' label="miningSpeed" rules={[{ required: true, type: 'number', min: 1, max: 200 }]}>
                                <InputNumber />
                            </Form.Item>
                        </div>
                        <div className='create-minner-form-footer'>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
                                <Button htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    )
}