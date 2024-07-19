const express = require('express')
const {response, request} = require("express");
const app = express();

app.listen(8080, function () {
    console.log('123123')
})


const box =
    `
    <div>
        <button>button</button>
    </div>
`;
const responseSomething = (req, res) =>{
    console.log(req)
    res.send(box)
}
app.get('/',responseSomething)

