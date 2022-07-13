const express = require('express');
const app = express();

const db = require('../config/database');

const path = require('path');
const router = express.Router();

exports.insertPerson = async (req, res) => {
  const { name,cpf } = req.body;
  const response = await db.query(
    'INSERT INTO person (name, cpf) VALUES ($1, $2)',
    [name,cpf],
  );

  res.status(201).send({
    message: 'Person added successfully!',
    body: {
      product: { name, cpf },
    },
  });
};
exports.getIndex = async (req, res) => {
  res.sendFile(path.join(__dirname +'/../index.html'));
}

exports.insertSeat = async (req, res) => {
  const { id, building_sys, floor_sys, table_sys, section_sys, status_sys} = req.body;
  const response = await db.query(
    'INSERT INTO seat (id, building_sys, floor_sys, table_sys, section_sys, status_sys) VALUES ($1, $2, $3, $4, $5, $6)',
    [id, building_sys, floor_sys, table_sys, section_sys, status_sys],
  );

  res.status(201).send({
    message: 'Seat added successfully!',
    body: {
      Seat: { id, building_sys, floor_sys, table_sys, section_sys, status_sys },
    },
  });
};

exports.insertUserSeat = async (req, res) => {
  const { user_sys_email, seats_id, date} = req.body;
  const response = await db.query(
    'INSERT INTO user_seat (user_sys_email, seats_id, date) VALUES ($1, $2, $3)',
    [user_sys_email, seats_id, date],
  );

  res.status(201).send({
    message: 'Seat added successfully!',
    body: {
      Seat: { user_sys_email, seats_id, date },
    },
  });
};

exports.insertUser = async (req, res) => {
  const { email,person_cpf,pass,status_sys } = req.body;
  const response = await db.query(
    'INSERT INTO user_sys (email,person_cpf,pass,status_sys) VALUES ($1, $2, $3, $4)',
    [email,person_cpf,pass,status_sys],
  );

  res.status(201).send({
    message: 'User added successfully!',
    body: {
      product: { email,person_cpf,pass,status_sys },
    },
  });
};

exports.getPerson = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM person ORDER BY cpf ASC',
  );
  res.status(200).send(response.rows);
};

exports.getUser = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM user_sys',
  );
  res.status(200).send(response.rows);
};

exports.getSeat = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM seat ORDER BY floor_sys ASC',
  );
  res.status(200).send(response.rows);
};

exports.getBusySeats = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM user_seat',
  );
  res.status(200).send(response.rows);
};

exports.getPersonByCpf = async (req, res) => {
  const cpf = (req.params.cpf);
  const response = await db.query(
    'SELECT * FROM person WHERE cpf = $1',
    [cpf],
  );
  res.status(200).send(response.rows);
};

exports.getUserByVar = async (req, res) => {
  console.log(req.body)
  const email = (req.body.email);
  let field = "person_cpf"
  let value
  if (req.body.email) {
    field = "email";
    value = req.body.email
  } 
  else if (req.body.cpf) {
    field = "person_cpf";
    value = req.body.cpf
  }
  else {
    console.error("Os parâmetros não foram enviados.")
    // res.status(400).send("Os parâmetros não foram enviados.");
    return
  }
  const response = await db.query(
    `SELECT * FROM user_sys WHERE ${field} = $1`,
    [value],
  );
  res.status(200).send(response.rows);
};

exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { product_name, quantity, price } = req.body;

  const response = await db.query(
    'UPDATE products SET product_name = $1, quantity = $2, price = $3 WHERE productId = $4',
    [product_name, quantity, price, productId],
  );

  res.status(200).send({ message: 'Product Updated Successfully!' });
};

exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM products WHERE productId = $1', [
    productId,
  ]);

  res.status(200).send({ message: 'Product deleted successfully!', productId });
}

// teste(n) {
//   for (i in n.length) {

// }