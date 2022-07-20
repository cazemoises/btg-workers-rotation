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
      'INSERT INTO user_seat (user_sys_email, seat_id, date) VALUES ($1, $2, $3)',
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
    const id = (req.body.id);
    const response = await db.query(
      'DELETE FROM user_seat WHERE id = $1',
      [id],
    );
    res.status(200).send(response.rows);
}

//Update seats  
exports.updateUserSeat = async (req, res) =>{
    const { date, seatId, id  } = req.body
    if (date && seatId) {
      const response = await db.query(
        'UPDATE user_seat set date = $1, seat_id = $2 WHERE id = $3',
        [date, seatId, id],
    );
    res.status(200).send(response.rows);
    }
    else if (date){
      const response = await db.query(
        'UPDATE user_seat set date = $1 WHERE id = $2',
        [date, id],
    );
    res.status(200).send(response.rows);
    }
    else if (seatId) {
        const response = await db.query(
          'UPDATE user_seat set seat_id = $1 WHERE id = $2',
          [seatId, id],
      );
      res.status(200).send(response.rows);
    }
    }


