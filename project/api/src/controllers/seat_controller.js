const express = require('express');
const db = require('../config/database');
// const app = express();
// const path = require('path');
// const router = express.Router();

//Insert seats
exports.insertSeat = async (req, res) => {
    const { id, building, floorNumber, tableNumber, sectionName, status} = req.body;
    const response = await db.query(
      'INSERT INTO seat (id, building, floor_number, table_number, section_name, status) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, building, floorNumber, tableNumber, sectionName, status],
    );

    res.status(201).send({
      message: 'Seat added successfully!',
      body: {
        Seat: { id, building, floorNumber, tableNumber, sectionName, status },
      },
    });
  };


//Get seats
exports.getSeat = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM seat ORDER BY floor_number_sys ASC',
  );
  res.status(200).send(response.rows);
};

exports.getBusySeats = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM user_seat',
  );
  res.status(200).send(response.rows);
};