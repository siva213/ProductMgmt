import axios from 'axios';
import authHeader from './authHeader';

const API_URL =  "https://hoodwink.medkomtek.net/api"

class ProductService {

  addProduct({ sku, product_name, qty, price, unit, status }) {
    return axios.post(API_URL + '/item/add', { sku, product_name, qty, price, unit, status }, { headers: authHeader() });
  }

  updateProduct({ sku, product_name, qty, price, unit, status }) {
    return axios.post(API_URL + '/item/update', { sku, product_name, qty, price, unit, status }, { headers: authHeader() });
  }

  deleteProduct(sku) {
    return axios.post(API_URL + '/item/delete', { sku }, { headers: authHeader() });
  }

  getProducts() {
    return axios.get(API_URL + '/items', { headers: authHeader() });
  }

  searchProducts(sku) {
    return axios.post(API_URL + '/item/search', { sku },  { headers: authHeader() });
  }
}

export default new ProductService();