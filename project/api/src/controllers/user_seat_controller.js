const express = require('express');
const app = express();
const db = require('../config/database');
const path = require('path');
const router = express.Router();

//Get busy seats
exports.getBusySeats = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM user_seat',
  );
  res.status(200).send(response.rows);
};

//Insert seats
exports.insertUserSeat = async (req, res) => {
    const { seatSysEmail, seatId, date} = req.body;
    const response = await db.query(
      'INSERT INTO user_seat (set_sys_email, seat_id, date) VALUES ($1, $2, $3)',
      [seatSysEmail, seatId, date],
    );
  
    res.status(201).send({
      message: 'Seat added successfully!',
      body: {
        Seat: { seatSysEmail, seatId, date },
      },
    });
  };


//Delete busy seats
exports.deleteUserSeat = async (req, res) =>{
    const seatId = (req.body.seatId);
    const response = await db.query(
      'DELETE FROM user_seat WHERE seat_id = $1',
      [seatId],
    );
    res.satatus(200).send(response.rows);
}


//Uodate seats  
exports.updateUserSeat = async (req, res) =>{
    const { seatId, date } = req.body
    const response = await db.query(
        'UPDATE user_seat set date = $1 WHERE seat_id = $2',
        [seatId, date],
    );
    res.satatus(200).send(response.rows);
}