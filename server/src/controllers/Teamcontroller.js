const Team = require('../modals/Team');
const fs = require('fs');
const path = require('path');

// Add a new team member
const addTeamMember = async (req, res) => {
    const { membername, membercategory, memberstatus } = req.body;
    const memberimage = req.file.filename;

    const newTeam = new Team({
        membername,
        membercategory,
        memberimage,
        memberstatus: memberstatus === 'true'
    });

    try {
        const result = await newTeam.save();
        res.status(200).json({ status: true, message: 'Team Member Added successfully', data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// View all team members
const viewAllTeamMembers = async (req, res) => {
    try {
        const teams = await Team.find();
        const finalTeams = teams.map(team => ({
            ...team._doc,
            memberimage: `${req.protocol}://${req.get('host')}/teams/${team.memberimage}`
        }));
        res.status(200).json({ message: 'Team Members Found Successfully', data: finalTeams });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// View active team members
const viewActiveTeamMembers = async (req, res) => {
    try {
        const activeTeams = await Team.find({ memberstatus: true });
        if (!activeTeams.length) {
            return res.status(404).json({ message: 'No Active Team Members Found' });
        }
        const finalTeams = activeTeams.map(team => ({
            ...team._doc,
            memberimage: `${req.protocol}://${req.get('host')}/teams/${team.memberimage}`
        }));
        res.status(200).json({ message: 'Active Team Members Found Successfully', data: finalTeams });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Search team members
const searchTeamMembers = async (req, res) => {
    const searchKey = req.params.searchKey;
    const searchCriteria = [
        { membername: { $regex: new RegExp(searchKey, 'i') } },
        { membercategory: { $regex: new RegExp(searchKey, 'i') } }
    ];

    if (['true', 'false'].includes(searchKey.toLowerCase())) {
        searchCriteria.push({ memberstatus: searchKey.toLowerCase() === 'true' });
    }

    try {
        const teams = await Team.find({ $or: searchCriteria });
        const finalTeams = teams.map(team => ({
            ...team._doc,
            memberimage: `${req.protocol}://${req.get('host')}/teams/${team.memberimage}`
        }));
        res.status(200).json({ message: 'Team Members Found Successfully', data: finalTeams });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get team member by ID
const getTeamMemberById = async (req, res) => {
    const id = req.params.id;
    try {
        let teamMember = await Team.findById(id).lean();
        if (!teamMember) {
            return res.status(404).json({ message: `Team Member not found by this id: ${id}` });
        }
        teamMember = { ...teamMember, memberimage: `${req.protocol}://${req.get('host')}/teams/${teamMember.memberimage}` };
        res.status(200).json({ message: 'Team Member found successfully', data: teamMember });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a team member
const updateTeamMember = async (req, res) => {
    const _id = req.params._id;
    const { membername, membercategory, memberstatus } = req.body;
    let memberimage;

    if (req.file) {
        memberimage = req.file.filename;

        const existingTeam = await Team.findById(_id);
        if (!existingTeam) {
            return res.status(400).json({ message: `Team Member not found by this id: ${_id}` });
        }

        try {
            fs.unlinkSync(path.join('teams', existingTeam.memberimage));
        } catch (err) {
            console.error('Error deleting old image:', err);
        }
    } else {
        const existingTeam = await Team.findById(_id);
        if (!existingTeam) {
            return res.status(400).json({ message: `Team Member not found by this id: ${_id}` });
        }
        memberimage = existingTeam.memberimage;
    }

    try {
        const updatedTeam = await Team.updateOne({ _id }, {
            $set: {
                membername,
                membercategory,
                memberimage,
                memberstatus
            }
        });
        res.status(200).json({ message: 'Team Member updated successfully', data: updatedTeam });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a team member
const deleteTeamMember = async (req, res) => {
    const id = req.params.id;
    try {
        const teamMember = await Team.findById(id);
        if (!teamMember) {
            return res.status(404).json({ message: `Team Member not found by this id: ${id}` });
        }
        const tmpPath = path.join(__dirname, 'teams', teamMember.memberimage);
        if (fs.existsSync(tmpPath)) {
            fs.unlinkSync(tmpPath);
        }
        await Team.deleteOne({ _id: id });
        res.status(200).json({ message: 'Team Member Deleted Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update team member status
const updateTeamMemberStatus = async (req, res) => {
    const id = req.params.id;
    const newStatus = req.body.status;
    try {
        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ message: `Team Member not found by this id: ${id}` });
        }
        await Team.updateOne({ _id: id }, { $set: { memberstatus: newStatus } });
        res.status(200).json({ message: 'Team Member Status updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete multiple team members
const deleteMultipleTeamMembers = async (req, res) => {
    const ids = req.body.ids;
    try {
        const members = await Team.find({ _id: { $in: ids } });
        members.forEach(item => {
            const tmpPath = path.join(__dirname, 'teams', item.memberimage);
            if (fs.existsSync(tmpPath)) {
                fs.unlinkSync(tmpPath);
            }
        });
        await Team.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Team Members deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {

    addTeamMember,
    viewAllTeamMembers,
    viewActiveTeamMembers,
    searchTeamMembers,
    getTeamMemberById,
    updateTeamMember,
    deleteTeamMember,
    updateTeamMemberStatus,
    deleteMultipleTeamMembers

}
