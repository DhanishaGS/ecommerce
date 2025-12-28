import { Chip, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProducts } from "./api/services";
import FilterComponent from "./filterComponent";
import './ProductDetails.css';
import './productList.css';
import { useAppSelector } from "./store/hooks";
import type { Item } from "./types/ItemInterface";
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const filteredCategory: string[] = useAppSelector((state) => state.filterProducts.filteredItems) ?? [];
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (data) {
          setProducts(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts()
    }, []);
    const displayedProducts = filteredCategory.length > 0
        ? products.filter((product: Item) => filteredCategory.includes(product.category))
        : products;
    if (isLoading) {
        return <p>Loading...</p>;
    } else {
        if (error) {
            return <p>Something went wrong: {error}</p>;
        }
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
                                <Card.Img  alt="Product Image"
                                    style={{ width: "9rem", height: "12rem", padding: "1rem" }}
                                    variant="top"
                                    src={product.image || null}
                                />
                            </center>
                            <Card.Body>
                                <Card.Title style={{ height: "5rem", overflow: "auto" }}>{product.title}</Card.Title>
                                {/* <Card.Text>{product.description}</Card.Text> */}
                            </Card.Body>
                            <div className="ratingContainer" style={{ padding: '0 20px' }}>
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
