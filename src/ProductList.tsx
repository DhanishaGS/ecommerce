import { Button, Card, Offcanvas } from "react-bootstrap";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Chip, Paper } from "@mui/material";
import './productList.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import FilterComponent from "./FilterComponent";
import { FaStar } from "react-icons/fa";
import './ProductDetails.css'

const ProductList = () => {
    let [products, setProducts] = useState([]);
    const filteredCategory = useAppSelector((state) => state.filterProducts.filteredItems) ?? [];
    // setProducts(products);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:5000/products")
            .then((response) => {
                setProducts(response.data);
                dispatch({ type: 'products/setProducts', payload: response.data })
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    // Filter products using useMemo to avoid recalculating on every render
    // const displayedProducts = useMemo(() => {
    //     if (filteredCategory.length > 0) {
    //         return products.filter((product: any) => filteredCategory.includes(product.category));
    //     }
    //     return products;
    // }, [products, filteredCategory]);
    const displayedProducts = filteredCategory.length > 0
        ? products.filter((product: any) => filteredCategory.includes(product.category))
        : products;
    if (isLoading) {
        return <p>Loading...</p>;
    } else {


        return (
            <Paper elevation={3} sx={{ minHeight: '80vh', width: '90vw', margin: 'auto' }} className="productDetailsContainer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
                <h6>{filteredCategory.length > 0 ? `Filtered Products - ${displayedProducts.length}` : `Product Lists - ${displayedProducts.length}`}</h6>
                <FilterComponent />
            </div>
                <section className="products">
                    {displayedProducts.map((product: any) => (
                        <Card
                            style={{ width: "18rem" }}
                            className="product"
                            key={product.id} onClick={() => navigate(`/productdetails/${product.id}`)}
                        >
                            <center>
                                <Card.Img
                                    style={{ width: "9rem", height: "12rem" , padding: "1rem"}}
                                    variant="top"
                                    src={product.image}
                                />
                            </center>
                            <Card.Body>
                                <Card.Title style={{ height: "5rem", overflow: "auto" }}>{product.title}</Card.Title>
                                {/* <Card.Text>{product.description}</Card.Text> */}
                            </Card.Body>
                            <div className="ratingContainer" style={{ padding: '0 20px'}}>
                                <Chip
                                    icon={<FaStar className="starIcon" />}
                                    label={`${product?.rating?.rate || 0}`}
                                    color="warning"
                                    variant="outlined"
                                />
                                <span className="reviewCount">
                                    ({product?.rating?.count || 0} reviews)
                                </span>
                            </div>
                        </Card>
                    ))}
                </section>
            </Paper>
        );
    }
};

export default ProductList;
