 const router = require('express-promise-router')();
 const projectController = require('../controllers/project.controller');
 const projectAWSController = require('../controllers/project_controller_aws');
 // ==> setting CRUD routes:

//  Inserts
 router.post('/insert-person', projectController.insertPerson);
 router.post('/insert-user', projectController.insertUser);
 router.post('/insert-seat', projectController.insertSeat);
 router.post('/insert-user-seat', projectController.insertUserSeat);

 //Gets
 router.get('/get-person', projectController.getPerson);
 router.get('/get-person-by-cpf', projectController.getPersonByCpf);
 router.get('/get-seat', projectController.getSeat);
 router.get('/get-busy-seats', projectController.getBusySeats);
 router.get('/get-user', projectController.getUser);
 router.post('/get-user-by-var', projectController.getUserByVar);
 router.get('/home', projectController.getIndex);

 //AWS SQS
 router.post('/sqs', projectAWSController.sendMessage);
 router.get('/read-sqs', projectAWSController.readMessage);
 module.exports = router;