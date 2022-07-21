const express = require('express');
const app = express();
const db = require('../config/database');
const path = require('path');
const router = express.Router();

//Get users
exports.getUser = async (req, res) => {
    const response = await db.query(
      'SELECT * FROM user_sys',
    );
    res.status(200).send(response.rows);
  };

//Get to select the query parameter
exports.getUserByVar = async (req, res) => {
  console.log(req.body)
  let field = "person_identification_value"
  let value
  if (req.body.email) {
    field = "email";
    value = req.body.email
  } 
  else if (req.body.personIdentificationValue) {
    field = "person_identification_value";
    value = req.body.personIdentificationValue
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

//Insert users
exports.insertUser = async (req, res) => {
    const { email,personIdentificationValue,pass,status } = req.body;
    const response = await db.query(
      'INSERT INTO user_sys (email,person_identification_value, pass, status) VALUES ($1, $2, $3, $4)',
      [email,personIdentificationValue,pass,status],
    );
  
    res.status(201).send({
      message: 'User added successfully!',
      body: {
        product: { email,personIdentificationValue,pass, status},
      },
    });
  };

//Delete user
exports.deleteUser = async (req, res) =>{
  const email = (req.body.email);
  const response = await db.query(
    'DELETE FROM user_sys WHERE email = $1',
    [email],
  );
  res.status(200).send(response.rows);
}

//Update user
exports.updateUser = async (req, res) =>{
  const { pass, status, email} = req.body
  const response = await db.query(
      `UPDATE user_sys set pass = $1, status = $2  WHERE email = $3`,
      [pass, status, email],
  );
  res.status(200).send(response.rows);
}