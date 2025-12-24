import { Button } from "react-bootstrap";
import Card from "react-bootstrap/esm/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
const cardStyle: React.CSSProperties = {
  width: "95vw",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  padding: "20px",
};
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <Paper elevation={3}>
        <section className="products">
          {products.map((product: any) => (
            <Card
              style={{ width: "18rem" }}
              className="product"
              key={product.id}
            >
              <center>
                <Card.Img
                  style={{ width: "9rem", height: "12rem" }}
                  variant="top"
                  src={product.image}
                />
              </center>
              <Card.Body>
                <Card.Title style={{height: "5rem", overflow: "auto"}}>{product.title}</Card.Title>
                {/* <Card.Text>{product.description}</Card.Text> */}
              </Card.Body>
              <Card.Footer
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Button variant="primary">Add to Cart</Button>
              </Card.Footer>
            </Card>
          ))}
        </section>
      </Paper>
    );
  }
};

export default ProductList;
