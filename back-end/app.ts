const indexRouter = require('./routes/index');
const cors = require('cors');

const express = require('express');

const app = express();
app.use(cors())
app.use(express.json());
app.use('/', indexRouter);

app.listen(4000, () => {
    console.log('listening on port 4000');
})