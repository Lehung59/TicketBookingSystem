import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./styles.css";
import vnPayLogo from '../../vnpay-logo-inkythuatso-01.jpg'; // Thay đường dẫn tới hình ảnh của bạn


function PayMethod() {
	return (
		<div>
			<Row>
				<Col xs={4} md={3} className="pt-4">
					<Card className="card-pay">
						<Card.Body className="align-items-center d-flex justify-content-center">
						<img src={vnPayLogo} alt="VNPay" className="payment-icon" style={{ width: "200px", height: "50px" }} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<div className="d-flex py-4">
				<hr className="my-auto flex-grow-1" />
				<div className="px-5 opacity-70">or</div>
				<hr className="my-auto flex-grow-1" />
			</div>
			<p className="text-center">
				Pay by Cash.
				Do not support now
			</p>
		</div>
	);
}

export default PayMethod;
