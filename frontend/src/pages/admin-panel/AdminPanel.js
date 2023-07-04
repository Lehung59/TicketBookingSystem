
import React, { Component } from "react";

import {
	Button,
	Col,
	Jumbotron,
	Container,
	Navbar,
	Row,
	Nav,
} from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";
import CreateMovie from "../../containers/createMovie.container";
import MovieTable from "../../containers/movieTable.container";
import EditMovie from "../../containers/editMovie.container";
import "./styles.css";

export default class AdminPanel extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar bg="dark" variant="dark">
					<Container>
						<Navbar.Brand>
							<Link className="nav-link" to="/admin-panel">
								Admin Panel
							</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							<Navbar.Text>
								<Button variant="light"></Button>
							</Navbar.Text>
						</Navbar.Collapse>
					</Container>
				</Navbar>
				<Container>
					<Row>
						<Col md={3}>
							<Nav className="flex-column">
								<Link className="nav-link" to="/admin-panel/manage_movie">
									Manage Movie
								</Link>
							</Nav>
						</Col>
						<Col md={9}>
							<Switch>
								<Route path="/admin-panel" exact>
									<Jumbotron style={{backgroundColor: "#f8f9fa"}}>
										<h1 style={{color: "#343a40"}}>Welcome to admin panel</h1>
										<p style={{color: "#343a40"}}>Here you can manage data for your system!</p>
									</Jumbotron>
								</Route>
								<Route path="/admin-panel/manage_movie" exact>
									<MovieTable />
								</Route>
								<Route
									path="/admin-panel/manage_movie/edit/:id"
									component={EditMovie}
								/>
								<Route
									path="/admin-panel/manage_movie/add"
									component={CreateMovie}
								/>
							</Switch>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}


