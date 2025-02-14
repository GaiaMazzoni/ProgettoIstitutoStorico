/*import express from 'express';
import cors from 'cors';
import { getAllMenuItems } from './models/menuItemModel.js';
import { getPageBySlug } from './models/pageModel.js';
import { dbConfig } from './config/dbConfig.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.get("/getMenu", (req, res) => {

   getAllMenuItems([1], (err, menuItems) => {
        if (err) {
            res.status(500).json({ err: "Errore nel recupero dei menu" });
        } else {
            res.json(menuItems);
        }
    });

});

app.get("/:slug", (req, res) => {

    const slug = req.params.slug;

    getPageBySlug([slug], (err, pageData) => {
        if (err) {
            res.status(500).json({ err: "Errore nel recupero della pagina" });
        } else {
            res.json(pageData[0]);
        }
    });
});



app.listen(5000, () => {
    console.log('Server running on port 5000');
});*/