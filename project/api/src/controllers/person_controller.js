const express = require('express');
const app = express();
const db = require('../config/database');
const path = require('path');
const router = express.Router();

//Insert person
exports.insertPerson = async (req, res) => {
  const { name, identificationValue } = req.body;
  const response = await db.query(
    'INSERT INTO person (name, identification_value) VALUES ($1, $2)',
    [name, identificationValue],
  );

  res.status(201).send({
    message: 'Person added successfully!',
    body: {
      product: { name, identificationValue },
    },
  });
};


//Get person
exports.getPerson = async (req, res) => {
    const response = await db.query(
      'SELECT * FROM person',
    );
    res.status(200).send(response.rows);
  };

  
exports.getPersonByIdentificationValue = async (req, res) => {
    const identificationValue = (req.params.identificationValue);
    const response = await db.query(
      'SELECT * FROM person WHERE identification_value = $1',
      [identificationValue],
    );
    res.status(200).send(response.rows);
  };

  