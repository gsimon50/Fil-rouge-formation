const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { getArticles } = require('../controler/articles');
const { setArticle } = require('../controler/articles');
const { setUser } = require('../controler/user');
const { getUser } = require('../controler/user');


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

router.get('/login', cors(corsOptions), async  (req, res) => {
    //res.sendFile(path.join(projectRoot, 'views', 'login.html'));
    const params = req.query; // Récupère tous les paramètres dans un objet
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        var user = await getUser(params); // Assurez-vous que getUser retourne une promesse
        if (user){
            res.cookie('user', params.username, { httpOnly: true });
            res.send(`Bienvenue ${params.username} !`);
            return true;
        } else {
            return false;
        }
    } catch (error){
        console.error("Erreur dans /api/login :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }

})

/*router.post('/login',(req,res) => {
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
});*/

router.get('/register', cors(corsOptions), async  (req, res) => {
    const params = req.query; // Récupère tous les paramètres dans un objet
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        var user = await setUser(params); // Assurez-vous que setUser retourne une promesse
        if (user){
            return true;
        } else {
            return false;
        }
    } catch (error){
        console.error("Erreur dans /api/register :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});


router.get('/api/article&:type', cors(corsOptions), async  (req, res) => {
    const type = req.params.type; // Récupère la valeur du paramètre "id"
    try {
        // Utilise un délai artificiel avec `setTimeout` si nécessaire
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        
        // Appelle la fonction asynchrone pour récupérer les articles
        if(type == "recherche" || type == "recent"){
            articles = await getArticles( null, 5, "desc"); // Assurez-vous que getArticles retourne une promesse
        } else if( type == "popular") { 
            articles = await getArticles( null, 4, "desc"); // Assurez-vous que getArticles retourne une promesse    
        } else {
            articles = await getArticles( null, 3, "desc"); // Assurez-vous que getArticles retourne une promesse    
        }
        return res.json(articles); // Envoie les données en réponse
    } catch (error) {
        console.error("Erreur dans /api/artucle :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

router.post('/api/article', cors(corsOptions), async  (req, res) => {
    const data = req.body; // Récupère les données de la requête POST
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        // Appelle la fonction asynchrone pour insérer un article
        article = await setArticle(data); // Assurez-vous que setArticle retourne une promesse
        return res.json(article); // Envoie les données en réponse
    } catch (error) {
        console.error("Erreur dans /api/article :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

module.exports = router;