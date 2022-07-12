
//  Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Product'.
 
 const router = require('express-promise-router')();
 const productController = require('../controllers/project.controller');
 // ==> Definindo as rotas do CRUD:
 // ==> Rota responsável por criar um novo 'Product': (POST): localhost:3000/api/person
 router.post('/person', productController.createPerson);
 router.post('/insert-seats', productController.insertSeat);
 router.get('/get-person', productController.getPerson);
 module.exports = router;