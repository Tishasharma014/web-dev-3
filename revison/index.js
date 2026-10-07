const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/:id',(req,res) =>{
    console.log(req.params.id);
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});