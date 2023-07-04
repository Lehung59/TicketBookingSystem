import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import http from "../helpers/http";
import { movie } from "../redux/actions/movie";
import { Card, Col, Image, Row } from "react-bootstrap";
class CreateMovie extends Component {
	state = {
		title: "",
	};
	// submitData = (e) => {
	// 	e.preventDefault();
	// 	const { name } = this.state;
	// 	this.props.movie(name);
	// };
	changeText = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	saveData = async (e) => {
		e.preventDefault();
		const data = new URLSearchParams();
		const { title } = this.state;
		data.append("title", title);
		const response = await http(this.props.auth.token).post("movies", data);
		window.alert(response.data.message);
	};
	render() {
		return (
			<div>
			  <Form onSubmit={this.saveData}>
				<Form.Group>
				  <Form.Label>Movie Name</Form.Label>
				  <Form.Control
					onChange={(event) => this.changeText(event)}
					name="title"
					type="text"
					//placeholder="Spider-Man: Homecoming"
				  />
				</Form.Group>
				<Form.Group>
				  <Form.Label>Category</Form.Label>
				  <Form.Control
					onChange={(event) => this.changeText(event)}
					name="category"
					type="text"
					//placeholder="Action, Adventure, Sci-Fi"
				  />
				</Form.Group>
				<Row>
				  <Col>
					<Form.Label>Release date</Form.Label>
					<Form.Control
					  onChange={(event) => this.changeText(event)}
					  name="releaseDate"
					  type="date"
					/>
				  </Col>
				  <Col>
					<Form.Label>Duration (hour / minute)</Form.Label>
					<Row>
					  <Col>
						<Form.Control
						  onChange={(event) => this.changeText(event)}
						  name="durationHours"
						  type="number"
						  //placeholder="2"
						/>
					  </Col>
					  <Col>
						<Form.Control
						  onChange={(event) => this.changeText(event)}
						  name="durationMinutes"
						  type="number"
						 // placeholder="13"
						/>
					  </Col>
					</Row>
				  </Col>
				</Row>
				<Row>
				  <Col>
					<Form.Group>
					  <Form.Label>Director</Form.Label>
					  <Form.Control
						onChange={(event) => this.changeText(event)}
						name="director"
						type="text"
						//placeholder="Jon Watts"
					  />
					</Form.Group>
				  </Col>
				  <Col>
					<Form.Group>
					  <Form.Label>Casts</Form.Label>
					  <Form.Control
						onChange={(event) => this.changeText(event)}
						name="casts"
						type="text"
					//	placeholder="Tom Holland, Michael Keaton, Robert Downey Jr."
					  />
					</Form.Group>
				  </Col>
				</Row>
				<Form.Group>
				  <Form.Label>Synopsis</Form.Label>
				  <Form.Control
					onChange={(event) => this.changeText(event)}
					name="synopsis"
					type="text"
					as="textarea"
				//	placeholder="Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May..."
				  />
				</Form.Group>
				<Button variant="primary" type="submit" block>
				  Submit
				</Button>
			  </Form>
			</div>
		  );		  
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});
const mapDispatchToProps = { movie };

export default connect(mapStateToProps)(CreateMovie);

