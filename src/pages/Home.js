import { useEffect, useState } from 'react';
import ProductService from '../services/productService';
import { Table, Space, Button, Input } from 'antd';
import ProductForm from '../components/ProductForm';

const { Search } = Input;

function Home() {
    const [products, setProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editProduct, setEditProduct] = useState([]);
    const [formType, setFormType] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const columns = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(text, record, index)}>Edit</a>
                    <a onClick={() => handleDelete(text, record, index)}>Delete</a>
                </Space>
            ),
        },
    ];

    const getProducts = async () => {
        const response = await ProductService.getProducts();
        setProducts(response.data);
    }

    const handleEdit = (text, record, index) => {
        setShowEditModal(true);
        setEditProduct(record);
        setFormType("edit")
    }

    const handleDelete = async (text, record, index) => {
        const response = await ProductService.deleteProduct(record.sku);
        getProducts();
    }

    const handleSuccess = () => {
        setShowEditModal(false);
        getProducts();
    }

    const handleAdd = () => {
        setFormType("add")
        setShowEditModal(true);
    }

    const handleSearch = async (sku) => {
        if (sku) {
            const response = await ProductService.searchProducts(sku);
            setProducts([response.data]);
        } else {
            getProducts();
        }

    }

    return (
        <div>
            <h1>Product Management</h1>
            <Search placeholder="search by SKU" onSearch={handleSearch} style={{ width: 500, float: 'left' }} />
            <Button style={{ float: 'right' }} type="primary" onClick={handleAdd}>
                Add Product
            </Button>
            <Table columns={columns} dataSource={products} />
            <ProductForm
                type={formType}
                showEditModal={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSuccess={handleSuccess}
                product={editProduct} />
        </div>
    )
};

export default Home;