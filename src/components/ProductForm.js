import { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import ProductService from '../services/productService';

function EditProduct({ showEditModal, onSuccess, product, onClose, type }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setIsModalVisible(showEditModal);
    }, [showEditModal])

    const handleCancel = () => {
        setIsModalVisible(false);
        onClose();
    };

    const onFinish = async (values) => {
        if (type === "edit") {
            const response = await ProductService.updateProduct(values);
            if (response) {
                onSuccess();
            }
        } else if(type === "add") {
            const response = await ProductService.addProduct(values);
            if (response) {
                onSuccess();
            }
        }

    };

    return (
        <>
            {isModalVisible && (
                <Modal
                    title={type === "add" ? "Add Product" : "Edit product"}
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{
                            sku: product.sku,
                            name: product.product_name,
                            qty: product.qty,
                            price: product.price,
                            unit: product.unit,
                            status: product.status
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="SKU"
                            name="sku"
                            rules={[{ required: true, message: 'Please input your data!' }]}
                        >
                            <Input disabled={!type === "add"} />
                        </Form.Item>

                        <Form.Item
                            label="Product Name"
                            name="product_name"
                            rules={[{ required: true, message: 'Please input your data!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Quantity"
                            name="qty"
                            rules={[{ required: true, message: 'Please input your data!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your data!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Unit"
                            name="unit"
                            rules={[{ required: true, message: 'Please input your data!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Please input your data!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                {type === "add" ? "Add Product" : "Save product"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>)}
        </>
    )
};

export default EditProduct;