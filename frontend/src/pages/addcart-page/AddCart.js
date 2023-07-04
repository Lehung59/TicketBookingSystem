import React, { useState } from 'react';
import { Button, Container, Navbar, Row,Card, Image, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import NavbarComponent from "../../components/navbar/NavbarComponent";
import OrderInfo from "../../components/order/OrderInfo";
import OrderSeat from "../../components/order/OrderSeat";
import FooterComponent from "../../components/footer/FooterComponent";
import "./styles.css";
import { connect } from "react-redux";
import { createOrder } from "../../redux/actions/order";
import { getCart } from "../../redux/actions/cart";
import CartDetailComponent from "../../components/cartdetail/CartDetailComponent";

function AddCart({ order }) {
    const { dataMovie } = order.listOrder;
    const movieTitle = dataMovie?.title ?? '';
    // let order2 = null;

    const orders = [
        { date: '10:00 AM-2:00 PM', movie: 'Spiderman', price: 10 , imageUrl: "http://localhost:5000/uploads/movie/picture-1612181705042-594577070.jpg", seat: 3},
        { date: '10:00 AM-2:00 PM', movie: 'Master', price: 12 , imageUrl: "http://localhost:5000/uploads/movie/picture-1612181705042-594577070.jpg", seat: 3},
        { date: '10:00 AM-2:00 PM', movie: 'Movie 3', price: 8 , imageUrl: "http://localhost:5000/uploads/movie/picture-1612181705042-594577070.jpg", seat: 3},
        { date: '10:00 AM-2:00 PM', movie: 'Movie 3', price: 8 , imageUrl: "http://localhost:5000/uploads/movie/picture-1612181705042-594577070.jpg", seat: 3},
      ];
    const totalPrice = 0
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
    return (
        <div>
            <NavbarComponent />
            
            <CartDetailComponent />
            <FooterComponent />
        </div>
    );
}

const mapStateToProps = (state) => ({
    order: state.order,
});
const mapDispatchToProps = { createOrder };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddCart),
);

