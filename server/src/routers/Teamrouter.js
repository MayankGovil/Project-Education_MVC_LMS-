const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const teamController = require('../controllers/Teamcontroller');

const store_teamimage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'teams/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const uploadTeam = multer({ storage: store_teamimage }).single('image');

// router.use('/teams', express.static(path.join(__dirname, 'teams')));

// Routes
router.post('/addTeamMember', uploadTeam, teamController.addTeamMember);
router.get('/viewTeamMembers', teamController.viewAllTeamMembers);
router.get('/viewTeamMembersByStatus', teamController.viewActiveTeamMembers);
router.get('/searchTeamMembers/:searchKey', teamController.searchTeamMembers);
router.get('/teamMemberById/:id', teamController.getTeamMemberById);
router.put('/updateTeamMember/:_id', uploadTeam, teamController.updateTeamMember);
router.delete('/deleteTeamMember/:id', teamController.deleteTeamMember);
router.put('/updateTeamMemberStatus/:id', teamController.updateTeamMemberStatus);
router.delete('/deleteMultipleTeamMembers', teamController.deleteMultipleTeamMembers);

module.exports = router;
