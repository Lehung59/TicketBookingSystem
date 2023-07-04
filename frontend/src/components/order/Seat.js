import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createSeat } from "../../redux/actions/order";
import "./styles.css";
import http from "../../helpers/http";
import classNames from "classnames";

class Seat extends Component {
  state = {
    listSeat: {},
    seatOrdered: [],
  };

  componentDidMount() {
    this.getSeatOrdered();
  }

  async getSeatOrdered() {
    const { auth, order } = this.props;
    const { token } = auth;
    const { listOrder } = order;
    const { dataMovie } = listOrder;
    try {
      const params = {
        idMovie: dataMovie.id,
        idCinema: localStorage.getItem("idCinema"),
        idTime: localStorage.getItem("timeId"),
      };

      const searchParams = new URLSearchParams(params);
      const url = `orders?${searchParams.toString()}`;
      const response = await http(token).get(url);
      const responseData = response.data.results;
      let seated = "";
      for (const res of responseData) {
        seated += res.seat + ", ";
      }
      console.log(seated.split(", "));
      this.setState({
        seatOrdered: seated.split(", "),
      });
    } catch (err) {
      console.log(err);
    }
  }

  seatClick = (e) => {
    const { name, checked } = e.target;
    this.setState(
      (prevState) => ({
        listSeat: {
          ...prevState.listSeat,
          [name]: checked,
        },
      }),
      () => {
        const selectedSeats = Object.keys(this.state.listSeat)
          .filter((seat) => this.state.listSeat[seat])
          .join(", ");
        this.props.createSeat(selectedSeats);
      }
    );
  };

  render() {
    const seatNum = [];
    const seatRows = ["A", "B", "C", "D", "E", "F", "G"];

    for (let i = 1; i < 15; i++) {
      if (i === 8) {
        seatNum.push(<div className="px-3" key={i}></div>);
      }
      seatNum.push(<td className="pl-3" key={i}>{i}</td>);
    }

    const seats = seatRows.map((row) => {
      const rowSeats = [];
      for (let i = 1; i < 15; i++) {
        if (i === 8) {
          rowSeats.push(<div className="px-3" key={i}></div>);
        }
        const seatName = `${row}${i}`;
        const seatClasses = classNames({
          seat: true,
          blocked: this.state.seatOrdered.includes(seatName),
        });
        rowSeats.push(
          <td key={seatName}>
            <input
              type="checkbox"
              value={seatName}
              name={seatName}
              onChange={this.seatClick}
              disabled={this.state.seatOrdered.includes(seatName)} 
              className={classNames(seatClasses, { disabled: this.state.seatOrdered.includes(seatName) })}
            />
          </td>
        );
      }
      return (
        <tr key={row}>
          <td>{row}</td>
          {rowSeats}
        </tr>
      );
    });

    return (
      <div>
        <table>
          <tbody>
            {seats}
            <tr>
              <td></td>
              {seatNum}
            </tr>
          </tbody>
        </table>
        <p className="text-link-lg pt-4">Seating key</p>
        <Row>
          <Col>
            <div className="availableBox float-left mr-3"></div>
            <p>Available</p>
          </Col>
          <Col>
            <div className="selectBox float-left mr-3"></div>
            <p>Selected</p>
          </Col>
          <Col>
            <div className="soldBox float-left mr-3"></div>
            <p>Sold</p>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
  auth: state.auth,
});

const mapDispatchToProps = { createSeat };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Seat));
