const express = require('express');
const router = express.Router();
const ownerController = require('../Controllers/ownerController');
const branchController = require('../Controllers/branchController');
const inchargeController = require('../Controllers/inchargeController');
const hostlerController = require('../Controllers/hostlerController');

// CRUD Operations
router.post('/owners/createOwner', ownerController.createOwner); // Create
router.get('/owners/getAllOwners', ownerController.getAllOwners); // Read all
router.get('/owners/getOwnerById/:id', ownerController.getOwnerById); // Read by ID
router.put('/owners/updateOwner/:id', ownerController.updateOwner); // Update
router.delete('/owners/deleteOwner/:id', ownerController.deleteOwner); // Delete

// branchRoutes
router.post('/branch/createBranch', branchController.createBranch);
router.get('/branches/getAllBranches', branchController.getAllBranches);
router.get('/branch/getBranchById/:id', branchController.getBranchById);
router.put('/branch/updateBranch/:id', branchController.updateBranch);
router.delete('/branch/deleteBranch/:id', branchController.deleteBranch);

//inchargeRoutes
router.post('/incharge/AddIncharge', inchargeController.createIncharge);
router.get('/incharges/getAllIncharges', inchargeController.getAllIncharges);
router.get('/incharge/getInchargeById/:id', inchargeController.getInchargeById);
router.put('/incharge/updateIncharge/:id', inchargeController.updateIncharge);
router.delete('/incharge/deleteIncharge/:id', inchargeController.deleteIncharge);

//hostlerRoutes
router.post('/hostlers/AddHostler', hostlerController.createHostler);
router.get('/hostlers/getAllHostlers', hostlerController.getAllHostlers);
router.get('/hostlers/getHostlerById/:id', hostlerController.getHostlerById);
router.put('/hostlers/updateHostler/:id', hostlerController.updateHostler);
router.delete('/hostlers/deleteHostler/:id', hostlerController.deleteHostler);





module.exports = router;