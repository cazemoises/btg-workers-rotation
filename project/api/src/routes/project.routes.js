 const router = require('express-promise-router')();
 const seatController = require('../controllers/seat_controller');
 const personController = require('../controllers/person_controller');
 const projectController = require('../controllers/project_controller');
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
 router.post('/insert-identification', identificationController.insertIdentification);

 //Gets
 router.get('/home', projectController.getIndex);
 router.get('/get-person', personController.getPerson);
 router.get('/get-person-by-identification-value', personController.getPersonByIdentificationValue);
 router.get('/get-seat', seatController.getSeat);
 router.get('/get-seat-by-var', seatController.getSeatByVar);
 router.get('/get-busy-seats', userSeatController.getBusySeats);
 router.get('/get-identification', identificationController.getIdentification);
 router.get('/get-user', userController.getUser);
 router.post('/get-user-by-var', userController.getUserByVar);

 //Update
router.post('/update-user-seat', userSeatController.updateUserSeat);
router.post('/update-person', personController.updatePerson);
router.post('/update-seat', seatController.updateSeat);
router.post('/update-user', userController.updateUser);
router.post('/update-identification', identificationController.updateIdentification);

 //Delete
 router.post('/delete-user-seat', userSeatController.deleteUserSeat);
 router.post('/delete-seat', seatController.deleteSeat);
 router.post('/delete-person', personController.deletePerson);
 router.post('/delete-user', userController.deleteUser);
 router.post('/delete-identification', identificationController.deleteIdentification);

 //AWS SQS
 router.post('/sqs', projectAWSController.sendMessage);
 module.exports = router;