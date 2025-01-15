const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { getArticles } = require('../controler/articles');


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

router.get('/api/recherche', cors(corsOptions), async  (req, res) => {
    try {
        // Utilise un délai artificiel avec `setTimeout` si nécessaire
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        
        // Appelle la fonction asynchrone pour récupérer les articles
        articles = await getArticles(null, 5); // Assurez-vous que getArticles retourne une promesse
        return res.json(articles); // Envoie les données en réponse
    } catch (error) {
        console.error("Erreur dans /api/recherche :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

router.get('/api/stories', cors(corsOptions), async  (req, res) => {
    try {
        // Utilise un délai artificiel avec `setTimeout` si nécessaire
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        
        // Appelle la fonction asynchrone pour récupérer les articles
        articles = await getArticles("Stories", 5); // Assurez-vous que getArticles retourne une promesse
        return res.json(articles); // Envoie les données en réponse
    } catch (error) {
        console.error("Erreur dans /api/recherche :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});


module.exports = router;