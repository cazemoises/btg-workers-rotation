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
    'SELECT * FROM seat ORDER BY floor_number ASC',
  );
  res.status(200).send(response.rows);
};

exports.getBusySeats = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM user_seat',
  );
  res.status(200).send(response.rows);
};

//Get seats by var
// id, building, floor_number, table_number, section_name, status
exports.getSeatByVar = async (req, res) => {
  console.log(req.body)
  let field = "table_number"
  let value
  if (req.body.building) {
    field = "building";
    value = req.body.building
  } 
  else if (req.body.floorNumber) {
    field = "floor_number";
    value = req.body.floorNumber
  }
  else if (req.body.tableNumber) {
    field = "table_number";
    value = req.body.tableNumber
  }
  else if (req.body.sectionName) {
    field = "section_name";
    value = req.body.sectionName
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



//Delete person
exports.deleteSeat = async (req, res) =>{
  const id = (req.body.id);
  const response = await db.query(
    'DELETE FROM seat WHERE id = $1',
    [id],
  );
  res.status(200).send(response.rows);
}

//Update
exports.updateSeat = async (req, res) =>{
  const { id, building, floorNumber, tableNumber, sectionName, status } = req.body
  const response = await db.query(
      'UPDATE seat set building = $1, floor_number = $2, table_number = $3, section_name = $4, status = $5  WHERE id = $6',
      [building, floorNumber, tableNumber, sectionName, status,id],
  );
  res.status(200).send(response.rows);
}