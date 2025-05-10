const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');
const { getArticles } = require('../controler/articles');
const { getArticlesByIdUser } = require('../controler/articles');
const { setArticle } = require('../controler/articles');
const { setUser } = require('../controler/user');
const { getUser } = require('../controler/user');
const { setUserNewsletter } = require('../controler/newsletter');


const corsOptions = {
    origin: 'http://localhost:4200', // Frontend autorisé
    methods: ['GET', 'POST'],        // Méthodes autorisées
    allowedHeaders: ['Content-Type'] // En-têtes autorisés
};


const projectRoot = process.cwd();

// Simuler une base de données (pour un vrai projet, utilisez une base de données comme MongoDB ou MySQL)
//const users = [
//    { username: 'admin', password: '$2b$10$7X.lXXh6l.Bd2cBc.NI9lOEe.OF21W/xHCMZupFfR9z7Ty/C2NcZ2' } // Mot de passe: "password123"
//];


router.get('/', (req, res) => {
    res.sendFile(path.join(projectRoot, 'views', 'home.html'));
});

router.get('/login', cors(corsOptions), async  (req, res) => {
    //res.sendFile(path.join(projectRoot, 'views', 'login.html'));
    const params = req.query; // Récupère tous les paramètres dans un objet
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        var user = await getUser(params); // Assurez-vous que getUser retourne une promesse
        console.log(user);
        if (user.length > 0) {
            return res.status(200).json({ message: "Utilisateur trouvé", id: user[0].id });
        } else {
            console.log("Utilisateur non trouvé !")
            return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }
    
    } catch (error){
        console.error("Erreur dans /api/login :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }

})

router.get('/register', cors(corsOptions), async  (req, res) => {
    const params = req.query; // Récupère tous les paramètres dans un objet
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        var user = await setUser(params); // Assurez-vous que setUser retourne une promesse
        if (user.userexist){
            console.log("Utilisateur déjà existant !")
            return res.status(409).json({ error: "Utilisateur déjà existant" });
        } else if (user.serverStatus == 2){
            return res.status(200).json({ message: "Utilisateur créé avec succès" });
        } else {
            return res.status(500).json({ error: "Erreur interne du serveur" });
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

        if(data.functionCall != "getArticleUser" ){
            // Appelle la fonction asynchrone pour insérer un article
            const article = await setArticle(data); // Assurez-vous que setArticle retourne une promesse
            return res.json(article); // Envoie les données en réponse
        } else {
            // Appelle la fonction asynchrone pour récupérer les articles par ID utilisateur
            const articles = await getArticlesByIdUser(data); // Assurez-vous que getArticlesByIdUser retourne une promesse
            return res.status(200).json(articles); // Envoie les données en réponse
        }
    } catch (error) {
        console.error("Erreur dans /api/article :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

router.post('/api/newsletter', cors(corsOptions), async  (req, res) => {
    console.log("Newsletter : ")
    const data = req.body; // Récupère les données de la requête POST
    console.log(data);
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        // Appelle la fonction asynchrone pour insérer un article
        const newsletter = await setUserNewsletter(data); // Assurez-vous que setUserNewsletter retourne une promesse
        return res.json(newsletter); // Envoie les données en réponse
    } catch (error) {
        console.error("Erreur dans /api/newsletter :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

router.get('/api/newsletter', cors(corsOptions), async  (req, res) => {
    console.log("Newsletter : get")
    const data = req.query; // Utilise req.query pour GET
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        // Appelle la fonction asynchrone pour insérer un article
        const newsletter = await setUserNewsletter(data); // Assurez-vous que setUserNewsletter retourne une promesse
        return res.json(newsletter); // Envoie les données en réponse
    } catch (error) {
        console.error("Erreur dans /api/newsletter :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
module.exports = router;