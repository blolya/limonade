import express from 'express';
const app = express();

app.listen(5050, () => {});

app.use(express.static('html'));
app.use(express.static('build/js'));