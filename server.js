const express = require('express')
const {response, request} = require("express");
const app = express();

/**
 * npm install -g nodemon / yarn add global nodemon
 * nodemon server.js -> 저장 시 바로 반영
 */


/**
 * yarn add pg -> 포스트그리 라이브러리 설치
 * yarn add dotenv -> 환경변수 파일 생성
 */

app.listen(8080, function () {
    console.log('123123')
})


const box =
    `
    <div>
        <button>butto1221n</button>
    </div>
`;
const responseSomething = (req, res) =>{
    console.log(req)
    res.send(box)
}
app.get('/',responseSomething)

app.get('/test', function (req, res){
    res.sendFile(__dirname + '/test.html')
    }
)


