import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
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
import { CgProfile } from 'react-icons/cg'

const UserAvatar = () => (
  <div className="user-avatar-container">
    <div className="user-avatar">
      {getInitials(userName)}
    </div>
    <span className="dropdown-arrow"></span>
  </div>
);

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name[0]?.toUpperCase() || 'U';
};

const userName = "Dhanisha K M";

// Layout component with Navbar
const Layout = () => {
  const user = "guest";
  const isLoggedIn = false;

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Flip Deal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/products">Buy Product</Nav.Link>
              <Nav.Link as={Link} to="/sell-products">Sell Product</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className='me-1' as={Link} to="/cart">Cart</Nav.Link>
              <Navbar.Collapse className="justify-content-end">
                <NavDropdown title={isLoggedIn ? <UserAvatar /> : <><div className='user-avatar'><CgProfile /> <span className="dropdown-arrow"></span></div></>} id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to={`/login`}>
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/sign-up">Sign up</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    User: {userName}
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes without navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        {/* Routes with navbar - nested under Layout */}
        <Route element={<Layout />}>
          <Route path='/*' element={<Products />} />
          <Route path="/products" element={<Products />}>
            <Route index element={<ProductList />} />
            <Route path="list" element={<ProductList />} />
          </Route>
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/sell-products" element={<SellProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addEditProduct/:id?" element={<AddEditForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
