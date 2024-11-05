const express = require('express');
const router = express.Router();

//const { upload } = require('../Middlewares/fileupload')


const floorManagementController = require('../Controllers/floorManagementController')
const foodManagementController = require('../Controllers/foodManagementController');
const savedMenuController = require('../Controllers/savedMenuController')




// Routes for course
router.post('/floor/create', floorManagementController.createFloorManagement);
router.get('/floor/getall', floorManagementController.getAllFloorManagement);
router.get('/floor/get/:id', floorManagementController.getFloorManagement);
router.patch('/floor/restore/:id', floorManagementController.restoreFloorManagement);
router.put('/floor/update/:floorNumber', floorManagementController.updateFloorDetails);
router.delete('/floor/delete/:id', floorManagementController.softDeleteFloorManagement);


// Routes for food management
router.post('/foodmanagement/create', foodManagementController.createFoodMenu);
router.get('/foodmanagement/getall', foodManagementController.getAllFoodMenus);
router.get('/foodmanagement/get/:id', foodManagementController.getFoodMenuById);
router.put('/foodmanagement/update/:id', foodManagementController.updateFoodMenu);
router.delete('/foodmanagement/delete/:id', foodManagementController.deleteFoodMenu);
router.put('/foodmanagement/:id/day/:day/meal/:meal', foodManagementController.addItemToMeal);
router.delete('/foodmanagement/:id/day/:day/meal/:meal', foodManagementController.deleteAnItem);

// Routes for saved menu
router.post('/savedmenu/create', savedMenuController.addMenu);
router.get('/savedmenu/getall', savedMenuController.getMenus);
router.get('/savedmenu/get/:id', savedMenuController.getMenuById);
router.put('/savedmenu/update/:id', savedMenuController.updateMenu);
router.delete('/savedmenu/delete/:id', savedMenuController.deleteMenu);
router.put('/savedmenu/:id/:day/:mealType/add-item', savedMenuController.addItem);
router.delete('/savedmenu/:id/:day/:mealType/remove-item', savedMenuController.removeItem);

module.exports = router