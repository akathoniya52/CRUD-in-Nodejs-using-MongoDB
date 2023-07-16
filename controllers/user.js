const User = require('../models/User')

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
};

async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).json({ message: "Not found" })
        return res.status(201).json(user);
    } catch(err) {
        return res.send(`couldnt find user with id ${req.params.id}`)
    }
};
 
async function updateUserById(req, res) {
    try{
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, { lastName: "Changed" });
        if (!user) return res.status(400).json({ message: "Not found" })
            return res.status(201).json({ message: "success" });
    } catch(err) {
        return res.send(`couldnt find user with id ${req.params.id}`)
    }

}

async function deleteUserById(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.json({ status: "deleted success" });
    } catch (error) {
        console.log(error)
        return res.status(404).json({message : "User Not found"})
    }
};

async function createUser(req, res) {
    const body = req.body;
    if (body.firstName || body.lastName || body.email || body.gender || body.jobTitle) {
        return res.status(400).json({message : "All fields are req....!"})
    }

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle
    });
    // console.log(result)
    return res.status(201).json({ message: "success" , id: result._id});
};


module.exports = {
    handleGetAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createUser,
}