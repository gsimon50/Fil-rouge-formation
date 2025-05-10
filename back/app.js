const express = require('express');
const mysql = require('mysql2'); // Importer mysql2 pour la connexion à la base de données
const path = require('path')
const userRoutes = require('./routes/route'); // Importer le routeur
const bodyParser = require('body-parser');
const cors = require('cors');


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

const users = [
    { username: 'admin', password: '$2b$10$7X.lXXh6l.Bd2cBc.NI9lOEe.OF21W/xHCMZupFfR9z7Ty/C2NcZ2' } // Mot de passe: "password123"
];

// Middleware pour parser les données JSON
app.use(express.json());

// Middleware pour parser les données URL-encodées
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use('/src', express.static(path.join(__dirname, 'src'))); // Rendre les fichiers dans le dossier src disponible

// Route pour afficher le home de contact
// a supprimer
    //app.get('/', userRoutes)
//
app.get('/login', userRoutes)
app.get('/register', userRoutes)
app.get('/api/article:type', userRoutes)
app.post('/api/article', userRoutes)
app.post('/api/newsletter', userRoutes)
app.get('/api/newsletter', userRoutes)

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/login', userRoutes)
app.post('/register', userRoutes)


app.get('/', (req, res) => {
    const routes = [];
  
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        // Route classique
        const method = Object.keys(middleware.route.methods)[0].toUpperCase();
        routes.push({ method, path: middleware.route.path });
      } else if (middleware.name === 'router') {
        // Router imbriqué (ex: avec express.Router())
        middleware.handle.stack.forEach((handler) => {
          const route = handler.route;
          if (route) {
            const method = Object.keys(route.methods)[0].toUpperCase();
            routes.push({ method, path: route.path });
          }
        });
      }
    });
  
    res.json(routes);
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré à l'adresse http://localhost:${port}`);
});
