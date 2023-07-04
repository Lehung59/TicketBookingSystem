import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import http from "../helpers/http";
import { Card, Col, Image, Row } from "react-bootstrap";
class EditMovie extends Component {
	state = {
		movie: {},
	};
	async componentDidMount() {
		const { id } = this.props.match.params;
		const response = await http().get(`movies/${id}`);
		this.setState({
			movie: response.data.results,
		});
	}
	saveData = async (e) => {
		e.preventDefault();
		const { id } = this.props.match.params;
		const { title } = this.state.movie;
		const data = new URLSearchParams();
		data.append("title", title);
		const response = await http(this.props.auth.token).patch(
			`movies/${id}`,
			data,
		);
		window.alert(response.data.message);
	};
	changeText = (event) => {
		const { movie } = this.state;
		this.setState({
			movie: {
				...movie,
				[event.target.name]: event.target.value,
			},
		});
	};
	render() {
		const { movie } = this.state;
		return (
			<React.Fragment>
			  {Object.keys(movie).length > 0 && (
				<Form onSubmit={this.saveData}>
				  <Form.Group>
					<Form.Label>Movie Name</Form.Label>
					<Form.Control
					  type="text"
					  name="title"
					  onChange={this.changeText}
					  defaultValue={movie.title}
					/>
				  </Form.Group>
				  <Form.Group>
					<Form.Label>Category</Form.Label>
					<Form.Control
					  type="text"
					  name="category"
					  onChange={this.changeText}
					  defaultValue={movie.category}
					/>
				  </Form.Group>
				  <Row>
					<Col>
					  <Form.Label>Release date</Form.Label>
					  <Form.Control
						type="date"
						name="releaseDate"
						onChange={this.changeText}
						defaultValue={movie.releaseDate}
					  />
					</Col>
					<Col>
					  <Form.Label>Duration (hour / minute)</Form.Label>
					  <Row>
						<Col>
						  <Form.Control
							type="number"
							name="durationHours"
							onChange={this.changeText}
							placeholder="2"
							defaultValue={movie.durationHours}
						  />
						</Col>
						<Col>
						  <Form.Control
							type="number"
							name="durationMinutes"
							onChange={this.changeText}
							placeholder="13"
							defaultValue={movie.durationMinutes}
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
						  type="text"
						  name="director"
						  onChange={this.changeText}
						  defaultValue={movie.director}
						/>
					  </Form.Group>
					</Col>
					<Col>
					  <Form.Group>
						<Form.Label>Casts</Form.Label>
						<Form.Control
						  type="text"
						  name="casts"
						  onChange={this.changeText}
						  defaultValue={movie.casts}
						/>
					  </Form.Group>
					</Col>
				  </Row>
				  <Form.Group>
					<Form.Label>Synopsis</Form.Label>
					<Form.Control
					  type="text"
					  name="synopsis"
					  as="textarea"
					  onChange={this.changeText}
					  defaultValue={movie.synopsis}
					/>
				  </Form.Group>
				  <Button type="submit" variant="warning">
					Save
				  </Button>
				</Form>
			  )}
			</React.Fragment>
		  );		  
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(EditMovie);
