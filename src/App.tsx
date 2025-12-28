import { Container, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AddEditForm from './AddEditForm'
import './App.css'
import Cart from './cart'
import Home from './Home'
import Login from './Login'
import ProductDetails from './ProductDetails'
import ProductList from './ProductList'
import Products from './Products'
import SellProduct from './SellProduct'
import SignUp from './SignUp'

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
          <Route path="/addEditProduct/:id?" element={<AddEditForm />} />
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
