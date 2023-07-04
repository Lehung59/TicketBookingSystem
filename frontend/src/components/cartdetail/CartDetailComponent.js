import React, { Component, useState } from "react";
import { Card, Col, Form, Image, Row, Button, Container } from "react-bootstrap";
import listShowTime from "../../utils/listShowTime";
import calendar from "../../assets/images/calendar.svg";
import map from "../../assets/images/map.svg";
import "./styles.css";
import http from "../../helpers/http";
import Moment from "react-moment";
import moment from "moment";
import { showTime, movieTime } from "../../redux/actions/showtime";
import { getCart, delete_cart } from "../../redux/actions/cart";
import { createOrder } from "../../redux/actions/order";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class CartDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: {},
      totalPrice : 0
    };
  }

  async componentDidMount() {

      const { id } = this.props.match.params;
      
      await this.props.getCart(id);
      console.log("moviemovie2222", this.props)
      // const a = await getCart(id);
      // this.props.movie.details = await a   
  }

  render() {
    const { cart } = this.props;
    // const { user_id } = this.props.match.params;
    console.log("cartcart", cart)
    // console.log("user_id", cart.details[0].user_id)
    const backendImageUrl = `${process.env.REACT_APP_API_URL}uploads`; 
    const { checkedItems } = this.state;
    const { totalPrice } = this.state;

    let orders = [];
    if (cart.details.length > 0) {
      orders = cart.details.map((order, index) => (
        <Row key={index} className={index}>
          <Image src={`${backendImageUrl}/${order.imageURL}`} className="img-cart"  />
          <div className="movie_info">
              <strong className="movie_name">{order.movie_name}</strong>
              {/* <p className="movie_date">Date: {order.showtime}</p> */}
              <p className="movie_price">Price: ${order.price}</p>
          </div>
          
          <div className="choosing_seat">
              {/* <p className="seat">Seat: {order.seat}</p> */}
              <Button onClick = {()=>{
                window.location.href = `/movie-detail/${order.movie_id}`
              }}>Choosing seat</Button>
              {/* <p className="total_price">Total: ${order.seat?order.seat.split(" ").length*order.price:0}</p> */}
          </div>

          <div className="check_movie">
              {/* <div className="checkbox-row">
                  <input className="checkk" type="checkbox" 
                   name={order.id}
                   checked={checkedItems[order.id] || false}
                   onChange={(event) => {
                    if (order.seat !== null) {
                      const { name, checked } = event.target;
                      console.log(checked)
                      this.setState((prevState) => ({
                          checkedItems: {
                            ...prevState.checkedItems,
                            [name]: checked,
                          },
                        }));
                        if(checked===true){
                          this.setState((prevState) => ({
                            totalPrice: prevState.totalPrice+order.seat.split(" ").length*order.price,
                          }));
                        }
                        else{
                          this.setState((prevState) => ({
                            totalPrice: prevState.totalPrice-order.seat.split(" ").length*order.price,
                          }));
                        }
                        
                    }
                    else{
                      console.log("Ban phai chon seat truoc")
                    }
                   }}
                   />
              </div> */}
              <div className="button-row">
              
                  <Button 
                    onClick={() =>{
                      console.log("vua click xong")
                      this.props.delete_cart(
                        cart.details[0].user_id,
                        order.id,
                      )
                    }}
                  >Delete</Button>
              </div>
          </div>
        </Row>

      ));
    }
    return (
        <div className="cart-purchases">
        <Container>
            {/* <Row> */}
            <Card className="cart-purchases">
              {orders}
            </Card>
  
            {/* <Card className="border-0 shadow order-seat">
                <Card.Body className="pt-0">
                    <p className="float-left text-link-md">Total Payment</p>
                    <p className="float-end text-display-xs-bold text-primary text-right">
                    ${totalPrice}
                    </p>
                </Card.Body>
            </Card> */}
            {/* </Row> */}
        </Container>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});
const mapDispatchToProps = {
  getCart,
  delete_cart,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDetailComponent)
);
