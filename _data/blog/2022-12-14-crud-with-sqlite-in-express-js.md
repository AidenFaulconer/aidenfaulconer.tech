---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-14T01:07:34.436Z
title: CRUD with sqlite in express.js
metaDescription: CRUD with sqlite in express.js
thumbnail: public/assets/me.png
---
<!--StartFragment-->

# CRUD with sqlite in express.js

app/routes

```tsx
import express from 'express';
const session = require('express-session');
const cookieParser = require('cookie-parser');
import * as sqlite3 from 'sqlite3';
import sqliteStoreFactory from 'express-session-sqlite';
import indexRoutes from './indexRoutes';
import database from './database';
import cors from 'cors';

export const app = express();

// Server port
let HTTP_PORT = 8000;
// Start server

if (process.env.NODE_ENV == "test") {
    HTTP_PORT = 3000;
}

app.listen(HTTP_PORT, () => {
    console.log("server started");
});

app.use(express.json());
app.use(cors());

app.use(cookieParser());

app.use(session({ secret: "super secret string" }));
const SqliteStore = sqliteStoreFactory(session);
app.use(session({
    store: new SqliteStore({
        driver: sqlite3.Database,
        path: ':memory:',
        ttl: 604800000, // 1 week in miliseconds
    }),
}));

if(process.env.NODE_ENV != "test")
database.setupDbForDev();

app.use('/api', indexRoutes);
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" });
});

app.get('/', (req,res)=>{
    database.getAllitems().then((err,items)=>{
        if(err){
            res.status(500).send(err);
        }
        else {
            res.status(200).send(items);
        }
    })
})

app.get('/:id',(req,res)=>{
    database.getItemsById(req.params.id).then((err,item)=>{
        if(err){
            res.status(500).send(err);
        }
        else {
            res.status(200).send(item);
        }
    })
})

app.put('/:id',(req,res)=>{
    database.putItem(req.params.id, req.body).then((err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else {
            res.status(200).send(result);
        }
    })
})

app.delete("/:id",(req,res)=>{
    database.deleteItem(req.params.id).then((err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else {
            res.status(200).send(result);
        }
    })
})

app.post("/",(req,res)=>{
    database.addItem(req.body).then((err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        else {
            res.status(200).send(result);
        }
    })
})


app.use((req, res) => {
    res.status(404);
});

module.exports = { app };
```

# Database

```tsx
let sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const DBSOURCE = "db.sqlite";
const saltRounds = 10;


let db = new sqlite3.Database(DBSOURCE);

export default class {

    static setupDbForDev() {
        db.serialize(() => {
            console.log('Connected to the SQLite database.');
            db.run(`CREATE TABLE items(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title text, 
                description text
            )`, (err) => {
                const insertItems = `insert into items values(1,'Item 1','Description 1'),(2,'Item 2','Description 2'),(3,'Item 3','Description 3')`;
                if (err) {
                    // console.log(err);
                    db.serialize(() => {
                        db.run("delete from items");
                        db.run(insertItems);

                    });
                    console.log("Items table present");
                }
                else {
                   db.run(insertItems);
                }
            });


        });
    
    }

    static async getItem(id){
        return this.get(`SELECT * FROM items WHERE id = ?`, id);
    }

    static async putItem(id,title,description){
        return await this.run(`UPDATE items SET title = ?, description = ? WHERE id = ?`, [title, description,id]);
    }

    static asyncc addItem(title,description){
        return await this.run(`INSERT INTO items (title, description) VALUES (?,?)`,[title, description]);
    }

    static async getItemsById(id){
        return await this.get(`SELECT * FROM items WHERE id = ?`, id);
    }

    static async getAllitems(){
        return await this.all(`SELECT * FROM items`);
    }

    static setupDbForTest() {
        db.serialize(() => {
            console.log('Connected to the SQLite database.');
            db.run(`CREATE TABLE items(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title text, 
                description text,
            )`, (err) => {
                const insertItems = `insert into items values(1,'Item 1','Description 1'),(2,'Item 2','Description 2'),(3,'Item 3','Description 3')`;
                if (err) {
                    // console.log(err);
                    db.serialize(() => {
                        db.run("delete from items");
                        db.run(insertItems);

                    });
                    console.log("User table present");
                }
                else {
                   db.run(insertItems);
                }
            });


        });
    
    }

    static all(stmt, params) {
        return new Promise((res, rej) => {
            db.all(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        });
    }
    static get(stmt, params) {
        return new Promise((res, rej) => {
            db.get(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        });
    }

    static run(stmt, params) {
        return new Promise((res, rej) => {
            db.run(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        });
    }

    
}
```

<!--EndFragment-->