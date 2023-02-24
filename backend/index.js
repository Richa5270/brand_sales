const express = require('express');
const {mongoose} = require('mongoose');
const router = require('./routes/route')
const app = express();
const cors = require('cors');
const url = "mongodb+srv://admin:Pa55word@clusterfunctionup.b2nxkzl.mongodb.net/brand_sales_daily"

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('url', {
 useNewUrlParser: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.use(cors());

app.use('/api/v1', router);


// app.get('/', (req, res)=>{
//     return res.send('Hello World');
// })

app.listen(8082, () => {
console.log('listening on port 8082')
});
