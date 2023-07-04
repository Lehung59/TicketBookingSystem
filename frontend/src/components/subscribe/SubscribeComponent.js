import React from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom"; // Thêm import

import "./styles.css";

function SubscribeComponent() {
	const history = useHistory(); // Khởi tạo đối tượng history

	const handleJoinNow = () => {
		history.push("/sign-up"); // Chuyển hướng đến trang sign up
	};

	if (localStorage.getItem("token") != null) {
		return null; // Trả về null nếu đã đăng nhập
	}

	return (
		<Card className="card-mail align-items-center text-center border-0 shadow">
			<Card.Body>
				<p className="text-display-xs text-color-body m-0">
					Be the vanguard of the
				</p>
				<p className="text-primary text-link-lg-48">Moviegoers</p>
				<Button variant="link" onClick={handleJoinNow} style={{ fontWeight: "bold", border: "1px solid black", padding: "5px 10px" }}>
					Sign up
				</Button>
				<p className="text-muted pt-3">
					By joining you as a cinemaGr07 member, <br />
					Yiu will receive a 10% discount
				</p>
			</Card.Body>
		</Card>
	);
}

export default SubscribeComponent;
