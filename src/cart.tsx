import { Button } from "react-bootstrap";
import { Paper, Grid } from "@mui/material";
import styles from './cart.module.css';
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { Item } from "./types/ItemInterface";

const Cart = () => {
    let cartItems = useAppSelector((state) => state.cart.items);
    if (localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    }

    
    const dispatch = useAppDispatch();


    const removeItem = (item: Item) => {
        dispatch({ type: 'cart/removeCart', payload: item })
    }


    const decrementQuantity = (itemId: string) => {
        dispatch({ type: 'cart/decrementQuantity', payload: itemId })
    }
    const incrementQuantity = (itemId: string) => {
        dispatch({ type: 'cart/incrementQuantity', payload: itemId })
    }

    if (cartItems.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <h5>Your cart is empty.</h5>
            </div>
        );
    }

    return (
        <div className={styles.cartContainer}>
            <Grid container spacing={2}>
                <Grid size={8} className={styles.cartItemsGrid}>
                    <Paper elevation={3}>
                        {cartItems.map((cartItem: any) => (
                            <Paper key={cartItem.id} className={styles.cartItemPaper}>
                                <Grid container spacing={2}>
                                    <Grid size={4}>
                                        <img src={cartItem.image} alt={cartItem.title} className={styles.productImage} />
                                        <div className={styles.quantityControls}>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => decrementQuantity(cartItem.id)}
                                            >
                                                -
                                            </Button>
                                            <input
                                                type="text"
                                                readOnly
                                                value={cartItem.count}
                                                className={styles.quantityInput}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => incrementQuantity(cartItem.id)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid size={8} className={styles.productDetails}>
                                        <div>
                                            <h5 className={styles.productTitle}>{cartItem.title}</h5>
                                            <p className={styles.productPrice}>${cartItem.price}</p>
                                        </div>
                                        <div className={styles.removeButtonContainer}>
                                            <Button variant="danger" onClick={() => removeItem(cartItem)}>Remove Item</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Paper>
                </Grid>

                <Grid size={4}>
                    <Paper elevation={3} className={styles.orderSummary}>
                        <h2 className={styles.summaryTitle}>
                            Order Summary
                        </h2>

                        <div className={styles.summaryItems}>
                            <div className={styles.summaryRow}>
                                <span>Subtotal ({cartItems.reduce((sum: number, item: Item) => sum + item.count, 0)} items)</span>
                                <span>${cartItems.reduce((sum: number, item: Item) => sum + (item.price * item.count), 0).toFixed(2)}</span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span className={styles.freeShipping}>FREE</span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Tax (10%)</span>
                                <span>${(cartItems.reduce((sum: number, item: Item) => sum + (item.price * item.count), 0) * 0.10).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className={styles.summaryTotal}>
                            <div className={styles.grandTotalRow}>
                                <span>Grand Total</span>
                                <span className={styles.grandTotalAmount}>
                                    ${(cartItems.reduce((sum: number, item: Item) => sum + (item.price * item.count), 0) * 1.10).toFixed(2)}
                                </span>
                            </div>

                            <Button variant="success" className={styles.checkoutButton}>
                                Proceed to Checkout
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cart