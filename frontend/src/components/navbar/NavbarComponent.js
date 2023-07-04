import React, { Component } from "react";
import {
  Button,
  Navbar,
  Nav,
  Form,
  Image,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import cinemaGr07_purple from "../../assets/images/cinemaGr07-purple.svg";
import cart from "../../assets/images/cart.png";
import { connect } from "react-redux";
import "./styles.css";
import { userDetail } from "../../redux/actions/user";
import { logout } from "../../redux/actions/auth";
import { getCart } from "../../redux/actions/cart";
import { getMovieDetailByTitle } from "../../redux/actions/movie";

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  async componentDidMount() {
    this.props.userDetail(this.props.auth.token);
  }
  handleLogout = () => {
    // Gọi action "logout" từ props
    this.props.logout();
  };
  handle = async()=>{
    
    const inputValue = this.inputRef.current.value;
    await this.props.getMovieDetailByTitle(inputValue);
    window.location.href = `/movie-detail/${this.props.details.id}`;

  }
  render() {
    const { data } = this.props.user;

    return (
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="m-0">
            <Link to="/">
              <Image src={cinemaGr07_purple} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-link mr-auto">
              <Nav.Link href="/">Movies</Nav.Link>
            </Nav>
            <Nav className="nav-link justify-content-end" activeKey="/home">
              <Nav.Item>
                <Link to={`/addcart-page/${data.id}`}>  
                  <Image src={cart} className="cartt" />
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Form.Control
                  as="select"
                  defaultValue="Location"
                  className="border-0"
                >
                  <option>Location</option>
                  <option>Hà Nội</option>
                  <option>Bắc Giang</option>
                  <option>Đông Lào</option>
                </Form.Control>
              </Nav.Item>
              <Nav.Item>
                {/* <Form action="" className="search-form"> */}
                <input type="search" className="" ref={this.inputRef}/>
                  <button class="fa fa-search" onClick={this.handle}>
                    <Link to={`/movie-detail/${this.props.details.id}`}></Link>
                  </button>
                {/* </Form> */}
              </Nav.Item>

              {this.props.auth.token !== null ? (
                <NavDropdown
                  title={
                    <Image
                      src={
                        data.picture === null
                          ? "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg"
                          : data.picture
                      }
                      className="img-avatar"
                    />
                  }
                  id="basic-nav-dropdown"
                  className="m-0"
                >
                  <NavDropdown.Item href="admin-page">
                    Signed in as <br />
                    <strong>
                      {data.fullName === null ? data.email : data.fullName}
                    </strong>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/">Home</NavDropdown.Item>
                  <NavDropdown.Item href="/profile-page">
                    Your Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.handleLogout}>
                    <Link to="/">
                      Sign Out
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item>
                  <Link to="/sign-up" className="btn btn-primary btn-nav">
                    Sign up
                  </Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  details: state.movie.details
});

const mapDispatchToProps = { userDetail ,logout, getMovieDetailByTitle};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
