const  express = require('express');
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false}));

//Routes
app.route('/api/users')
    .get((req,res) => {
        return  res.json(users);
    })
    .post((req,res) => {
        console.log("req posted")
        const body = req.body;
        users.push({...body, id: users.length + 1});
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
            console.log(body)
            return res.json({status: "Success", id: users.length});
        })
    })

app.get('/users', (req,res) => {
    const html = `
        <ul>
            ${users.map( user => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
})

app
    .route('/api/users/:id')
    .get((req,res) => {
        const id = Number(req.params.id);
        const user = users.find( (user) => user.id === id );
        return res.json(user);
    })
    .patch((req, res) => {
        // Edit user
        const id = Number(req.params.id);
        const body = req.body;
        let status = "NOT FOUND";
        users.some( (user) => {
            if (user.id === id) {
                console.log(user)
                //assigning values
                user.first_name = body.first_name
                user.last_name = body.last_name
                user.email = body.email
                user.gender = body.gender
                user.job_title = body.job_title

                //writing data
                fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
                    
                })
                return status = "FOUND"
            }
        });
        return res.json({status: status});
    })
    .delete((req, res) => {
        // Delete user with id
        return res.json({status: "Pending"});
    })

app.listen(PORT, () => console.log("Server started"));
