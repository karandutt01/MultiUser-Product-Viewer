require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require("body-parser");
const errorHandler = require('./middleware/errorHandler')
const port  =  process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())


app.use('/api', userRoutes)
app.use('/api/products', productRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log('Server runnning on port ' + port)
})