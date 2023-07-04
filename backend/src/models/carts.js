const dbConn = require("../helpers/db");
const table = "carts";

exports.createCart = (data = {}) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO ${table} (${Object.keys(
				data,
			).join()}) VALUES (${Object.values(data)
				.map((item) => `"${item}"`)
				.join(",")})`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.getAllCarts = () => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
			SELECT c.id, c.user_id, m.title as movie_name, c.showtime, c.price, c.seat, m.picture as imageURL
			FROM ${table} c 
			LEFT JOIN users u ON c.user_id = u.id 
            LEFT JOIN movies m ON c.movie_id = m.id 
  		`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};


exports.getCartByUser = (id) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
			SELECT c.id, c.user_id, c.movie_id, m.title as movie_name, c.showtime, c.price, c.seat, m.picture as imageURL
			FROM ${table} c 
			LEFT JOIN users u ON c.user_id = u.id 
            LEFT JOIN movies m ON c.movie_id = m.id 
			WHERE c.user_id = ${id}
  		`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};


exports.deleteCartById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`DELETE FROM ${table} WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};


exports.updateSeat = (id, data) => {
    return new Promise((resolve, reject) => {
      const seat = data.seat; // Lấy giá trị của trường "seat" từ đối tượng data
    
      dbConn.query(
        `UPDATE ${table}
        SET seat="${seat}"
        WHERE id=${id}`,
        (err, res, field) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
};

exports.updateState = (id, data) => {
    return new Promise((resolve, reject) => {
      const state = data.state; // Lấy giá trị của trường "seat" từ đối tượng data
    
      dbConn.query(
        `UPDATE ${table}
        SET state="${state}"
        WHERE id=${id}`,
        (err, res, field) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
};


