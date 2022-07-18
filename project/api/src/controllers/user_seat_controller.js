exports.insertUserSeat = async (req, res) => {
    const { user_sys_email, seat_id, date} = req.body;
    const response = await db.query(
      'INSERT INTO user_seat (user_sys_email, seat_id, date) VALUES ($1, $2, $3)',
      [user_sys_email, seat_id, date],
    );
  
    res.status(201).send({
      message: 'Seat added successfully!',
      body: {
        Seat: { user_sys_email, seat_id, date },
      },
    });
  };


exports.deleteUserSeat = async (req, res) =>{
    const seat_id = (req.body.seat_id);
    const response = await db.query(
        'DELETE FROM user_seat WHERE seat_id = $1',
        [seat_id],
    );
    res.satatus(200).send(response.row);
}