
//  Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Product'.
 
 const router = require('express-promise-router')();
 const productController = require('../controllers/project.controller');
 // ==> Definindo as rotas do CRUD - 'Product':
 // ==> Rota responsável por criar um novo 'Product': (POST): localhost:3000/api/products
 router.post('/person', productController.createPerson);
 module.exports = router;