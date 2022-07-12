const db = require('../config/database');

// ==> Insert:
exports.createPerson = async (req, res) => {
  const { name,cpf } = req.body;
  const response = await db.query(
    'INSERT INTO person (nome, cpf) VALUES ($1, $2)',
    [name,cpf],
  );

  res.status(201).send({
    message: 'Person added successfully!',
    body: {
      product: { name, cpf },
    },
  });
};

exports.insertSeat = async (req, res) => {
  const { name,cpf } = req.body;
  const response = await db.query(
    'INSERT INTO person (nome, cpf) VALUES ($1, $2)',
    [name,cpf],
  );

  res.status(201).send({
    message: 'Person added successfully!',
    body: {
      product: { name, cpf },
    },
  });
};

// ==> GET:
exports.getPerson = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM person ORDER BY cpf ASC',
  );
  res.status(200).send(response.rows);
};

// ==> GET PELO ID:
exports.findProductById = async (req, res) => {
  const cpf = parseInt(req.params.id);
  const response = await db.query(
    'SELECT * FROM person WHERE cpf = $1',
    [cpf],
  );
  res.status(200).send(response.rows);
};

// ==> Update pelo 'Id':
exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { product_name, quantity, price } = req.body;

  const response = await db.query(
    'UPDATE products SET product_name = $1, quantity = $2, price = $3 WHERE productId = $4',
    [product_name, quantity, price, productId],
  );

  res.status(200).send({ message: 'Product Updated Successfully!' });
};

// ==> Delete pelo 'Id':
exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM products WHERE productId = $1', [
    productId,
  ]);

  res.status(200).send({ message: 'Product deleted successfully!', productId });
};