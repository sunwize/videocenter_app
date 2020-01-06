#!/usr/bin/env node

const express = require(`express`);
const path = require(`path`);

const app = express();

app.use(express.static(`dist`));

app.get(`*`, function(req, res) {
    res.sendFile(path.join(__dirname, `dist`, `index.html`));
});

const port = process.env.HTTP_PORT || 5989;
app.listen(port);

// eslint-disable-next-line no-console
console.log(`Server started: http://localhost:` + port);
