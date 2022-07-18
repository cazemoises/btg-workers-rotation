 const router = require('express-promise-router')();
 const seatController = require('../controllers/seat_controller');
 const personController = require('../controllers/person_controller');
 const userSeatController = require('../controllers/user_seat_controller');
 const identificationController = require('../controllers/identification_controller');
 const userController = require('../controllers/users_controller');
 const projectAWSController = require('../controllers/project_controller_aws');
 // ==> setting CRUD routes:

//  Inserts
 router.post('/insert-person', personController.insertPerson);
 router.post('/insert-user', userController.insertUser);
 router.post('/insert-seat', seatController.insertSeat);
 router.post('/insert-user-seat', userSeatController.insertUserSeat);

 //Gets
 router.get('/home', projectController.getIndex);
 router.get('/get-person', personController.getPerson);
 router.get('/get-person-by-identification-value', personController.getPersonByIdentificationValue);
 router.get('/get-seat', seatController.getSeat);
 router.get('/get-busy-seats', userSeatController.getBusySeats);
 router.get('/get-user', userController.getUser);
 router.post('/get-user-by-var', userController.getUserByVar);

 //Update
router.get('/update-user-seat', userSeatController.updateUserSeat);

 //Delete
 router.post('/delete-user-seat', userSeatController.deleteUserSeat);

 //AWS SQS
 router.post('/sqs', projectAWSController.sendMessage);
 router.get('/read-sqs', projectAWSController.readMessage);
 module.exports = router;