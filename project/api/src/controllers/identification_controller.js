const express = require('express');
const app = express();

const db = require('../config/database');

const path = require('path');
const router = express.Router();

//Insert
exports.insertIdentification = async (req, res) => {
    const { identificationType, identificationTypeCode } = req.body;
    const response = await db.query(
      'INSERT INTO identification (identification_type, identification_type_code) VALUES ($1, $2)',
      [identificationType, identificationTypeCode],
    );

    res.status(201).send({
      message: 'Identification added successfully!',
      body: {
        Identification: { identificationTypeCode,identificationType },
      },
    });
  };    

//Update
exports.updateIdentification = async (req, res) =>{
  const { identificationType,identificationTypeCode } = req.body
  const response = await db.query(
      'UPDATE identification set identification_type = $1 WHERE identification_type_code = $2',
      [identificationType, identificationTypeCode],
  );
  res.status(200).send(response.rows);
}

//Get
exports.getIdentification = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM identification',
  );
  res.status(200).send(response.rows);
};

//Delete
exports.deleteIdentification = async (req, res) =>{
  const identificationTypeCode = (req.body.identificationTypeCode);
  const response = await db.query(
    'DELETE FROM identification WHERE identification_type_code = $1',
    [identificationTypeCode],
  );
  res.status(200).send(response.rows);
}
