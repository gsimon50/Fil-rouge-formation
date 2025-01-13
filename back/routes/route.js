const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');


const corsOptions = {
    origin: 'http://localhost:4200', // Frontend autorisé
    methods: ['GET', 'POST'],        // Méthodes autorisées
    allowedHeaders: ['Content-Type'] // En-têtes autorisés
};


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

router.get('/api/recherche', cors(corsOptions), (req, res) => {
    return res.json(
        {
            "results": {
                "result": [
                    {
                        "id": "0",
                        "title": "Smarter Food Choices 101 Tips for busy Women",
                        "tag": "Food",
                        "author": "Sandra Gordon",
                        "publish": "2025-01-01",
                        "img" : "chouette-de-dijon.jpg"
                    },
                    { 
                        "id": "1",
                        "title": "Air pods pro with wirless charging case",
                        "tag": "Design",
                        "author": "Kristin Watson",
                        "publish": "2025-01-01",
                        "img" : "chouette-de-dijon.jpg"
        
                    },
                    { 
                        "id": "2",
                        "title": "Underwater exercise is used strengthen weak muscles",
                        "tag": "Sports",
                        "author": "Jenny Wilson",
                        "publish": "2025-01-01",
                        "img" : "chouette-de-dijon.jpg"
                    }
                ]
            }
        }

    );
});


module.exports = router;