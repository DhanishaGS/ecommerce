import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import ProductList from './ProductList'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import Products from './Products'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Cart from './cart'
import SellProduct from './SellProduct'

function App() {
  const user = "guest";
  return (
     <BrowserRouter>
     <Navbar  bg="dark" data-bs-theme="dark" expand="lg" sticky="top" >
      <Container>
        <Navbar.Brand href="#home">Flip Deal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" > Home</Nav.Link>
            <Nav.Link as={Link} to="/products" > Buy Product</Nav.Link>
            <Nav.Link as={Link} to="/sell-products" > Sell Product</Nav.Link>
            <Nav.Link as={Link} to={`/login/${user}`} > Login</Nav.Link>
            <Nav.Link as={Link} to="/sign-up" > SignUp</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className='me-1' as={Link} to="/cart">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} >
            <Route index element={ <ProductList/> } />
            <Route  path="list" element={<ProductList/>}/>
          </Route>
          <Route path="/productdetails/:id" element={<ProductDetails/>}/>
          <Route path="/sell-products" element={<SellProduct />} />
          <Route path="/login/:newUser" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
