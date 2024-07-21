const express = require('express');
const {response, request} = require("express");
const app = express();
const { Client } = require("pg");
// 환경변수 사용
require('dotenv').config();


const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// db 연결
client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack));


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


/**
 * 1. 크롤링을 위한 라이브러리 추가
 * yarn add axios
 *
 */

const axios = require('axios');


const getHtml = async () => {
    try {
        // 1
        const html = await axios.get("https://www.examples.com");
        let ulList = [];
        // 2
        const $ = cheerio.load(html.data);
        // 3
        const bodyList = $("tr.list");
        bodyList.map((i, element) => {
            ulList[i] = {
                rank: i + 1,
                // 4
                title: $(element).find("td.info a.title").text().replace(/\s/g, ""),
                artist: $(element).find("td.info a.artist").text().replace(/\s/g, ""),
            };
        });
        console.log("bodyList : ", ulList);
    } catch (error) {
        console.error(error);
    }
};

getHtml().then();