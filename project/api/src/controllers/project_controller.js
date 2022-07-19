const express = require('express');
const app = express();

const db = require('../config/database');

const path = require('path');
const router = express.Router();

exports.getIndex = async (req, res) => {
  res.sendFile(path.join(__dirname +'/../index.html'));
}