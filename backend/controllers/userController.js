const customersData = require ('../data/customers.js');

const userController = {
    getAllUsers: (req, res) => {
        res.json(customersData);
    },

    getUserById: (req, res) => {
        const userId = parseInt(req.params.id);
        if (Number.isNaN(userId)) {
            res.status(400).send('Invalidad user ID');
            return;
        }

        const user = customersData.find((user) => user.id === userId);

        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send(`User with id ${userId} not found`);
        }
    },

    createUser: (req, res) => {
        const { first_name, last_name, email, gender, image } = req.body;

        if (!first_name || !last_name || !email || !gender || !image) {
          res.status(400).send('Missing required fields');
          return;
        }

        for (const user of customersData) {
            if (user.email === email) {
                res.status(400).json({ error: 'User with that email already exists', code: 'email_exists' });
                return;
            }
        }

        const lastIndex = customersData.length > 0 ? customersData[customersData.length - 1].id : 0;
        const newId = lastIndex + 1;

        const newUser = {
          id: newId,
          first_name,
          last_name,
          email,
          gender,
          image,
        };

        customersData.push(newUser);

        res.status(201).json(newUser);
      },

    deleteUser: (req, res) => {
        const userId = parseInt(req.params.id);
        if (Number.isNaN(userId)) {
            res.status(400).send('Invalidad user ID');
            return;
        }

        const userIndex = customersData.findIndex((user) => user.id === userId);

        if (userIndex > -1) {
            customersData.splice(userIndex, 1);
            res.status(204).send();
        }
        else {
            res.status(404).send(`User with id ${userId} not found`);
        }
    }
};

module.exports = userController;