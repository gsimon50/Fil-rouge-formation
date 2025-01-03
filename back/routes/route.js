const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');


const projectRoot = process.cwd();

// Simuler une base de données (pour un vrai projet, utilisez une base de données comme MongoDB ou MySQL)
const users = [
    { username: 'admin', password: '$2b$10$7X.lXXh6l.Bd2cBc.NI9lOEe.OF21W/xHCMZupFfR9z7Ty/C2NcZ2' } // Mot de passe: "password123"
];

router.get('/', (req, res) => {
    res.sendFile(path.join(projectRoot, 'views', 'home.html'));
});

router.get('/login',(req,res) => {
    res.sendFile(path.join(projectRoot, 'views', 'login.html'));
})

router.post('/login',(req,res) => {
    const { username, password } = req.body;
    // Vérifier si l'utilisateur existe
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }


    // Vérifier le mot de passe
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }

    // Connexion réussie
    res.cookie('user', username, { httpOnly: true });
    res.send(`Bienvenue ${username} !`);
});

router.post('/register',(req,res) => {
    return res.status(200).send('Putin tu es une machine');
});

module.exports = router;