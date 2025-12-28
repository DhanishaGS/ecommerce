import { Grid, Paper, Chip, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import './ProductDetails.css';
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { TbShoppingCartShare } from "react-icons/tb";
import { IoArrowBack } from "react-icons/io5";
import { useAppDispatch } from "./store/hooks";
import { getProductbyId } from "./api/services";
const ProductDetails = () => {
    const routeParam = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [productdetails, setProductsDetails] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const buyNow = (e: React.MouseEvent) => {
        navigate("/cart");
    }
    const movetoCart = (e: React.MouseEvent, product: any) => {
        dispatch({ type: 'cart/addCart', payload: product })
        navigate("/cart");
    }
     useEffect(() => {
            const fetchProducts = async () => {
          try {
            const data = await getProductbyId(routeParam.id);
            if (data) {
              setProductsDetails(data);
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
          } finally {
            setIsLoading(false);
          }
        };
        fetchProducts()
        }, []);
    return (
        <>
            <div style={{ padding: '0 5vw' }}>
                <Button
                    variant="outline-secondary"
                    onClick={() => {
                        console.log("Back button clicked");
                        navigate("/products");
                    }}
                    style={{ margin: '10px 0' }}
                >
                    <IoArrowBack /> Back
                </Button>
            </div>
            <Paper elevation={3} sx={{ minHeight: '80vh', width: '90vw', margin: 'auto' }} className="productDetailsContainer">
                <Grid container spacing={2} sx={{ height: '100%', alignItems: 'stretch' }}>
                    <Grid size={6} sx={{ display: 'flex' }}>
                        <Card className="cardContainer">
                            <div className="imageContainer">
                                <Card.Img variant="top" src={productdetails?.image} className="productImage" />
                            </div>
                            <Card.Footer className="cardFooter">
                                <Button variant="secondary" onClick={buyNow}><TbShoppingCartShare /> Buy Now</Button>
                                <Button variant="primary" onClick={(e) => movetoCart(e, productdetails)}><FaShoppingCart /> Add to Cart</Button>
                            </Card.Footer>
                        </Card>
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex' }}>
                        <Card className="cardContainer">
                            <Card.Body className="cardBody">
                                <h3 className="productTitle">
                                    {productdetails?.title}
                                </h3>

                                <div className="ratingContainer">
                                    <Chip
                                        icon={<FaStar className="starIcon" />}
                                        label={`${productdetails?.rating?.rate || 0}`}
                                        color="warning"
                                        variant="outlined"
                                    />
                                    <span className="reviewCount">
                                        ({productdetails?.rating?.count || 0} reviews)
                                    </span>
                                </div>

                                <Divider sx={{ marginBottom: '20px' }} />

                                <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                                    <Grid size={4}>
                                        <strong className="sectionLabel">Description:</strong>
                                    </Grid>
                                    <Grid size={8}>
                                        <p className="descriptionText">
                                            {productdetails?.description}
                                        </p>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                                    <Grid size={4}>
                                        <strong className="sectionLabel">Category:</strong>
                                    </Grid>
                                    <Grid size={8}>
                                        <Chip label={productdetails?.category} color="primary" size="small" />
                                    </Grid>
                                </Grid>

                                <Divider sx={{ marginBottom: '20px' }} />

                                <h4 className="priceText">
                                    ${productdetails?.price}
                                </h4>
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default ProductDetails