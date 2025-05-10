const mysql = require('mysql2'); // Importer mysql2 pour la connexion à la base de données
const { get } = require('../routes/route');

const db = mysql.createConnection({
    host: 'localhost', port:3306,    // L'hôte de la base de données (souvent 'localhost' si en local)
    user: 'root',          // L'utilisateur MySQL (par défaut 'root' pour la majorité des installations locales)
    password: 'root',          // Le mot de passe MySQL (laissez vide si vous n'avez pas configuré de mot de passe)
    database: 'filrouge'  // Le nom de votre base de données
});


async function getArticles(type,limit,orderby) {

    let categorie = null;

    if (type !== null) {
        categorie = await getCategorie(type);
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            query = 'SELECT * FROM articles';
            if (type !== null) {
                query += ` WHERE Catégorie = '${categorie}'`;
            }
            if (orderby !== null) {
                query += ` ORDER BY id ${orderby}`;
            }
            if (limit !== null) {
                query += ` LIMIT ${limit}`;
            }
            db.query(query, (error, results) => {
                if (error) {
                    resolve(reject(error));
                } else {
                    resolve(results);
                }
            });

        }, 1000);
    });
}

async function getArticlesByIdUser(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            query = 'SELECT * FROM articles WHERE id_user = ?';
            db.query(query, [data.id], (error, results) => {
                if (error) {
                    resolve(reject(error));
                } else {
                    resolve(results);
                }
            });
        }, 1000);
    });
}


async function getCategorie(type){
    console.log('getCategorie')
    console.log(type)
    const query = 'SELECT id FROM categorie WHERE nom = ?';
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.query(query, [type], (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results && results.length > 0) {
                    console.log('id:', results[0].id);
                    console.log( 'fin getCategorie' )
                    resolve(results[0].id);
                } else {
                    console.log('Aucun résultat trouvé');
                    resolve(null);
                }
            });
        }, 1000);
    });
}

async function setArticle(data){
    console.log('data')
    console.log(data)
    const query = "INSERT INTO articles (id_user,Title, Picture,Homepage, Tag, Catégorie) VALUES ( ?,?,?,?,?,?)";
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            let catExist = await getCategorie(data.Category);
            if (catExist === null){
                // genere moi une erreur
                console.log('Categorie non existante')
                return reject('Categorie non existante');
            }
            db.query(query, [data.idUser,data.Title,data.Picture,1,data.Tag,catExist], (error, results) => {
                if (error) {
                    console.log('coucou')
                    console.log(error);
                    resolve(reject(error));
                }
                console.log("results")
                console.log(results)
                resolve (results);
            });
        }, 1000);
    });
}

function setCategorie(data){
    query = "INSERT INTO categorie (nom) VALUES ( ?)";
    setTimeout(() => {
        db.query(query, [data], (error, results) => {
            if (error) {
                resolve(reject(error));
            }
            console.log(results)
            resolve (results);
        });
    }, 1000);
}

async function getArticlesContent (id) {
    console.log(id);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            query = 'SELECT a.*, b.title FROM article_content a INNER JOIN articles b on a.ID_ARTICLE = b.ID  WHERE ID_ARTICLE = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    resolve(reject(error));
                } else {
                    console.log(results);
                    resolve(results);
                }
            });
        }, 1000);
    });
}

async function setArticleContent(data){
    const query = "INSERT INTO article_content (ID_ARTICLE,Type, Content) VALUES (?,?, ?)";
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            db.query(query, [data.idArticle,'Texte',data.data], (error, results) => {
                if (error) {
                    resolve(reject(error));
                }
                resolve (results);
            });
        }, 1000);
    });
}

module.exports =  { getArticles,getArticlesByIdUser, setArticle, getArticlesContent, setArticleContent } ;
