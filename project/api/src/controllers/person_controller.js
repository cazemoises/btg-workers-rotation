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


exports.getPerson = async (req, res) => {
    const response = await db.query(
      'SELECT * FROM person ORDER BY cpf ASC',
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

  