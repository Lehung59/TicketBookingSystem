import React, { Component } from "react";
import { Card, Col, Form, Image, Row, Button } from "react-bootstrap";
import listShowTime from "../../utils/listShowTime";
import calendar from "../../assets/images/calendar.svg";
import map from "../../assets/images/map.svg";
import "./styles.css";
import http from "../../helpers/http";
import Moment from "react-moment";
import moment from "moment";
import { showTime, movieTime } from "../../redux/actions/showtime";
import { getMovieDetail } from "../../redux/actions/movie";
import { cart } from "../../redux/actions/cart";
import { createOrder } from "../../redux/actions/order";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class MovieDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
      selectedTime: "",
      listShowTime,
      movie: {},
      location: "",
      date: "",
      showResults: [],
      showLocDate: [],
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.getMovieDetail(id);
    this.props.movieTime(id);
  }
  // eslint-disable-next-line no-dupe-class-members
  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.getMovieDetail(id);
    this.props.movieTime(id);
    const data = new URLSearchParams();
        data.append("movie", this.props.match.params.id);
        const response = await http().get(`showtimes?${data.toString()}`);
        this.setState({
          location: "6",
          date: "20230606",
          showResults: response.data.results,
        });
  }
  searchCinema = (e) => {
    this.setState({ [e.target.name]: e.target.value }, async () => {
      if (this.state.location !== "" && this.state.date !== "") {
        const data = new URLSearchParams();
        data.append("movie", this.props.match.params.id);
        const response = await http().get(`showtimes?${data.toString()}`);
        this.setState({
          showResults: response.data.results,
        });
      }
    });
  };
  render() {
    const { movie } = this.props;
    const { user_id } = this.props;
    console.log("user_id: ", user_id.data.id)
    console.log("movie.details: ", movie.details)
    const { timeData } = this.props.showtime;
    const { showResults } = this.state;
    const backendImageUrl = `${process.env.REACT_APP_API_URL}uploads`; // Thay thế bằng đường dẫn URL của backend từ biến môi trường
    const imageUrl = `${backendImageUrl}/${movie.details.picture}`;
    console.log("imageUrl",imageUrl)
    return (
    <div>
        <Row>
          <Col md={4} xs={12}>
            <Card className="text-center mx-auto card-img">
              <Card.Body>
                <Image src={imageUrl} className="img-fluid" alt={movie.details.title} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={8}>
            <p className="text-display-sm-bold m-0">{movie.details.title}</p>
            <p className="text-md">{movie.details['genreName'] + ""}</p>
            <Row xs={4} className="pt-2">
              <Col xs={6} lg={4}>
                <div className="flex-column justify-content-center d-flex">
                  <p className="text-xs text-muted m-0">Release date</p>
                  <p className="text-sm pt-1">
                    <Moment format="D MMMM YYYY">
                      {movie.details.releaseDate}
                    </Moment>
                  </p>
                </div>
              </Col>
              <Col xs={6} lg={8}>
                <div className="flex-column justify-content-center d-flex">
                  <p className="text-xs text-muted m-0">Directed by</p>
                  <p className="text-sm pt-1">{movie.details.directed}</p>
                </div>
              </Col>
            </Row>
            <Row xs={4} className="pt-2">
              <Col xs={6} lg={4}>
                <div className="flex-column justify-content-center d-flex">
                  <p className="text-xs text-muted m-0">Duration</p>
                  <p className="text-sm pt-1">
                    {moment
                      .duration(movie.details.duration)
                      .format("h[h] m[min]")}
                  </p>
                </div>
              </Col>
              <Col xs={6} lg={8}>
                <div className="flex-column justify-content-center d-flex">
                  <p className="text-xs text-muted m-0">Casts</p>
                  <p className="text-sm pt-1">{movie.details.cast}</p>
                </div>
              </Col>
            </Row>
            <hr />
            <p className="text-link-lg-20">Synopsis</p>
            <p className="text-sm">{movie.details.synopsis}</p>
          </Col>
        </Row>

        <div className="text-center py-5">
          <p className="text-display-xs-bold">Showtimes and Tickets</p>
          <Row className="justify-content-center">
            <Col lg={3} md={5} xs={12} className="d-grid pt-4">
              <Form.Group className="d-flex align-items-center">
                <Image src={calendar} className="position-absolute pl-3" />
                <Form.Control
                  name="date"
                  defaultValue=""
                  as="select"
                  className="border-0 pl-5 pick"
                  onChange={this.searchCinema}
                >
                  <option value="">Select date</option>
                  {timeData.length > 0 &&
                    timeData.map((item) => (
                      <option
                        value={moment(item.showTimeDate).format("YYYY-MM-DD")}
                      >
                        {moment(item.showTimeDate).format("DD MMM YYYY")}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col lg={3} md={5} xs={12} className="d-grid pt-4">
              <Form.Group className="d-flex align-items-center">
                <Image src={map} className="position-absolute pl-3" />
                <Form.Control
                  name="location"
                  defaultValue=""
                  as="select"
                  className="border-0 pl-5 pick"
                  onChange={this.searchCinema}
                >
                  <option value="">Select city</option>
                  {timeData.length > 0 &&
                    timeData.map((item) => (
                      <option value={item.idLocation}>{item.location}</option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          {showResults.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-3">
              {showResults.map((item) => (
                <Col className="pt-4 col">
                  <Card className="card-movie border-0">
                    <Card.Body className="pb-0">
                      <Row>
                        <Col
                          xs={4}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <Image src={item.picture} width={100} alt="" />
                        </Col>
                        <Col xs={8}>
                          <p className="text-link-lg text-left m-0">
                            {item.cinema}
                          </p>
                          <p className="text-300-12 text-left m-0">
                            {item.address}
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                    <hr />
                    <Card.Body className="pt-0">
                      <Row xs={4}>
                        {item.times.map((times) => {
                          return (
                            <Col className="time">
                              <Button
                                type="radio"
                                size="sm"
                                variant="light"
                                className="btn-time"
                                onClick={() =>
                                  {this.setState({ selectedTime: times.id })
                                  localStorage.setItem("selectedTime", times.time);
                                  localStorage.setItem("timeId", times.id);
                                  localStorage.setItem("idCinema", item.id);
                                }
                                }
                              >
                                {times.time}
                              </Button>
                            </Col>
                          );
                        })}
                      </Row>
                    </Card.Body>
                    <Card.Body className="pt-0 pb-2">
                      <h6 className="float-left text-sm">Price</h6>
                      <p className="float-right text-link-sm">
                        ${item.price}/seat
                      </p>
                    </Card.Body>
                    <Card.Body className="pt-0 d-flex justify-content-between">
                      <Link to="/order-page">
                        <Button
                          onClick={() =>
                            this.props.createOrder(
                              this.state.location,
                              this.state.date,
                              item,
                              movie.details
                            )
                          }
                          variant="primary"
                          className="btn-nav shadow"
                        >
                          Book now
                        </Button>
                      </Link>

                      <Button variant="light" className="btn-nav text-primary"
                      onClick={() =>{
                        console.log(11222222)
                        this.props.cart(
                          user_id.data.id,
                          movie.details.id,
                        )
                      }
                      }
                      >
                        Add to cart
                      </Button>

                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>there is no data</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie,
  showtime: state.showtime,
  order: state.order,
  user_id: state.user,
});
const mapDispatchToProps = {
  getMovieDetail,
  showTime,
  createOrder,
  movieTime,
  cart,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieDetailComponent)
);
