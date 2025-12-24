import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import ProductList from './ProductList'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import Products from './Products'
import { Container, Nav, Navbar } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const user = "guest";
  return (
     <BrowserRouter>
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" > Home</Nav.Link>
            <Nav.Link as={Link} to="/products" > Products</Nav.Link>
            <Nav.Link as={Link} to={`/login/${user}`} > Login</Nav.Link>
            <Nav.Link as={Link} to="/sign-up" > SignUp</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} >
            <Route index element={ <ProductList/> } />
            <Route  path="list" element={<ProductList/>}/>
            <Route path="details" element={<ProductDetails/>}/>
          </Route>
          <Route path="/login/:newUser" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
