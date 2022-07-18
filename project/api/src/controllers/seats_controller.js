const express = require('express');
const app = express();

const db = require('../config/database');

const path = require('path');
const router = express.Router();

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