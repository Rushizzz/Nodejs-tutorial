const Users = require("../models/user");

async function handleGetAllUsers(req, res) {
    console.log("inside alluser")
    const allDBUsers = await Users.find({});
    const html = `
        <ul>
            ${allDBUsers.map( user => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
}

async function handleGetUserById(req, res) {
    const id = Number(req.params.id);
    const user = Users.find( (user) => user.id === id );
    return res.json(user)
}

async function handleUserUpdate(req, res) {
    // Edit user
    const id = Number(req.params.id);
    const body = req.body;
    let status = "NOT FOUND";
    users.some( (user) => {
        if (user.id === id) {
            keys = [
                'first_name',
                'last_name',
                'email',
                'gender',
                'job_title'
            ]
            keys.forEach(key => {
                if ( body[key] ) {
                    user[key] = body[key]
                }
            });
            
            //writing data
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
                
            })
            return status = "FOUND"
        }
    });
    return res.json({status: status});
}

async function handleUserDelete(req, res) {
    // Delete user with id
    return res.json({status: "Pending"});
}

async function handleCreateUser(req, res) {
    
    console.log("req posted")
    const body = req.body;

    //validation
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_titile 
    ) {
        return res.status(400).json({msg: "all fields are required"});
    }

    const result = await Users.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_titile: body.job_titile
    })
    console.log(result);        
    return res.status(201).json({msg: 'success '});
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUserUpdate,
    handleUserDelete,   
    handleCreateUser
};

