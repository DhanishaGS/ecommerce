import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { Item } from './types/ItemInterface';
import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteProduct, getProducts } from './api/services';

const SellProduct = () => {
  const navigate = useNavigate();
  const [addedProducts, setAddedProducts] = useState<Item[]>([]);
  const onDeleteProduct = async (id: string) => {
   const response = await deleteProduct(id);
    if (response) {
      alert("Product deleted successfully");
    }
    // Implement delete functionality here
  };
  const editProduct = async (id: string) => {
    navigate(`/addEditProduct/${id}`);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
         if (data) {
              const productsAdded : Item[]= [];

          // Assuming data is an array of products}
          data.forEach((product: Item) => {
            if((Number(product.id) < 1 || Number(product.id) > 20) || isNaN(Number(product.id))) {
              productsAdded.push(product) // Example condition to filter added products
          setAddedProducts(productsAdded);
            }
          });
        }
      } catch (err) {
        // setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        // setIsLoading(false);
      }
    };
    fetchProducts()
    }, []);  

  if (addedProducts.length > 0) {
    return (
      <>
        <Paper 
          elevation={3} 
          sx={{ 
            minHeight: '80vh', 
            width: '90vw', 
            margin: '2rem auto',
            padding: '2rem'
          }} 
          className="productDetailsContainer"
        >
          <section className="products" style={{ marginBottom: '2rem' }}>
            {addedProducts.map((product: Item) => (
              <Card
                style={{ 
                  width: "18rem",
                  margin: '1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                className="product"
                key={product.id}
              >
                <center>
                  <Card.Img
                  alt="Product Image"
                    style={{ 
                      width: "9rem", 
                      height: "12rem", 
                      padding: "1.5rem",
                      marginTop: '1rem'
                    }}
                    variant="top"
                    src={product.image || undefined}
                  />
                </center>
                <Card.Body style={{ padding: '1.5rem' }}>
                  <Card.Title style={{ 
                    height: "5rem", 
                    overflow: "auto",
                    marginBottom: '1rem'
                  }}>
                    {product.title}
                  </Card.Title>
                  {/* <Card.Text>{product.description}</Card.Text> */}
                </Card.Body>
                <Card.Footer style={{ 
                  padding: '1rem 1.5rem',
                  display: 'flex',
                  gap: '0.75rem'
                }}>
                  <Button 
                    variant="outline-danger" 
                    onClick={() => onDeleteProduct(product.id)}
                    style={{ flex: 1 }}
                  >
                    Delete Product
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => editProduct(product.id)}
                    style={{ flex: 1 }}
                  >
                    Edit Product
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </section>
        </Paper>
        <div style={{ 
          textAlign: 'center', 
          margin: '2rem auto',
          paddingBottom: '2rem'
        }}>
          <Button 
            variant='primary' 
            size='lg'
            onClick={() => navigate('/addEditProduct')}
            style={{ padding: '0.75rem 2rem' }}
          >
            Add Products
          </Button>
        </div>
      </>
    )
  }
  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '3rem',
      padding: '2rem'
    }}>
      <Button 
        variant='primary' 
        size='lg'
        onClick={() => navigate('/addEditProduct')}
        style={{ padding: '0.75rem 2rem' }}
      >
        Add Products
      </Button>
    </div>
  )
}

export default SellProduct