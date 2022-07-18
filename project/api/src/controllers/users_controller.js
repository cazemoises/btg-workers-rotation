exports.getUser = async (req, res) => {
    const response = await db.query(
      'SELECT * FROM user_sys',
    );
    res.status(200).send(response.rows);
  };
  
exports.getUserByVar = async (req, res) => {
  console.log(req.body)
  const email = (req.body.email);
  let field = "person_cpf"
  let value
  if (req.body.email) {
    field = "email";
    value = req.body.email
  } 
  else if (req.body.cpf) {
    field = "person_cpf";
    value = req.body.cpf
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


exports.insertUser = async (req, res) => {
    const { email,person_cpf,pass,status_sys } = req.body;
    const response = await db.query(
      'INSERT INTO user_sys (email,person_cpf,pass,status_sys) VALUES ($1, $2, $3, $4)',
      [email,person_cpf,pass,status_sys],
    );
  
    res.status(201).send({
      message: 'User added successfully!',
      body: {
        product: { email,person_cpf,pass,status_sys },
      },
    });
  };