const express = require('express');
const mysql = require('mysql2'); // Importer mysql2 pour la connexion à la base de données
const path = require('path')


const db = mysql.createConnection({
    host: 'localhost', port:3306,    // L'hôte de la base de données (souvent 'localhost' si en local)
    user: 'root',          // L'utilisateur MySQL (par défaut 'root' pour la majorité des installations locales)
    password: 'root',          // Le mot de passe MySQL (laissez vide si vous n'avez pas configuré de mot de passe)
    database: 'filrouge'  // Le nom de votre base de données
});

db.connect((err) => {
if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack);
    return;
}
console.log('Connecté à la base de données MySQL');
});

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/src', express.static(path.join(__dirname, 'src'))); // Rendre les fichiers dans le dossier src disponible


// Route pour afficher le home de contact
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré à l'adresse http://localhost:${port}`);
});
