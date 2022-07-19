const express = require('express');
const app = express();
const db = require('../config/database');
const path = require('path');
const { json } = require('express');
const router = express.Router();

//Insert person
exports.insertPerson = async (req, res) => {
  const { name, identificationValue, identificationTypeCode } = req.body;
  const response = await db.query(
    'INSERT INTO person (name_sys, identification_value, identification_identification_type_code) VALUES ($1, $2, $3)',
    [name, identificationValue, identificationTypeCode],
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

//Delete person
exports.deletePerson = async (req, res) =>{
  const identificationValue = (req.body.identificationValue);
  const response = await db.query(
    'DELETE FROM person WHERE identification_value = $1',
    [identificationValue],
  );
  res.status(200).send(response.rows);
}