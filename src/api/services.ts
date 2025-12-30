import type { Item } from '../types/ItemInterface';
import axios from './axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return false;
  }
};

export const getProductbyId = async (productsId:string) => {
  try {
    const response = await axios.get(`/products/${productsId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${productsId}:`, error);
    return false;
  }
};
export const addProduct = async (product: Item) => {
  try {
    const response = await axios.post(`/products`, product);
    return response.data;
  } catch (error) {
    console.error(`Error adding product:`, error);
    return false;
  }
};
export const updateProduct = async (productsId: string, product: Item) => {
  try {
    const response = await axios.put(`/products/${productsId}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${productsId}:`, error);
    return false;
  }
};
export const deleteProduct = async (productsId: string) => {
  try {
    const response = await axios.delete(`/products/${productsId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${productsId}:`, error);
    return false;
  }
};
//just for testing user fetch functionality
export const getUsers = async () => {
  try {
    const response = await axios.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return false;
  }
};
export const updateUsers = async (newUser: any) => {
  try {
    const response = await axios.post('/users', newUser);
    return response.data;
  } catch (error) {
    console.error('Error updating users:', error);
    return false;
  }
};
