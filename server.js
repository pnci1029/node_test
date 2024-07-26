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
// client.connect()
//     .then(() => console.log('Connected to the database'))
//     .catch(err => console.error('Connection error', err.stack));


/**
 * npm install -g nodemon / yarn add global nodemon
 * nodemon server.js -> 저장 시 바로 반영
 *
 * dotenv
 */


/**
 * yarn add pg -> 포스트그리 라이브러리 설치
 * yarn add dotenv -> 환경변수 파일 생성
 */

app.listen(8080, function () {
    console.log('start')
})

const box =
    `
    <div>
        <button>butto1221n</button>
    </div>
`;
const responseSomething = (req, res) =>{
    // console.log(req)
    console.clear()
    console.log('request 11');
    console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ')
    getHtml().then(r =>console.log('crawling success'));
    console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ')

    // res.send(box)
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
 * 2.  HTML 문서에서 데이터를 추출을 위한 라이브러리 추가
 * yarn add cheerio
 */

const axios= require('axios');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const getHtml = async () => {
    try {
        // 브라우저와 페이지 생성
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // 페이지로 이동
        // await page.goto("https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&currentJobId=3985096110&position=1&pageNum=0", {
        await page.goto("https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0&currentJobId=3985096909", {
        // await page.goto('https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs', {
            waitUntil: 'networkidle2' // 네트워크가 조용해질 때까지 대기
        });

        // 페이지 내용 추출
        const content = await page.content();

        // cheerio로 HTML 파싱
        const $ = cheerio.load(content);

        // // 특정 클래스 이름의 요소 추출
        // const targetElements = $('section.two-pane-serp-page__results-list').html();

        // cheerio로 텍스트 추출 및 공백 제거
        const cleanText = (selector) => {
            return $(selector).text().replace(/\s+/g, ' ').trim();
        };

        // 필요한 데이터 추출
        const jobs = [];
        $('section.two-pane-serp-page__results-list .base-search-card').each((i, element) => {
            jobs.push({
                job_position: cleanText($(element).find('.base-search-card__title')),
                company: cleanText($(element).find('.base-search-card__subtitle a')),
                location: cleanText($(element).find('.job-search-card__location')),
                jobLevel: cleanText($(element).find('.show-more-less-html__markup.show-more-less-html__markup--clamp-after-5')),
            });
        });

        // 추출된 데이터 출력
        console.log(jobs);

        // 브라우저 종료
        await browser.close();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};








// const puppeteer = require('puppeteer');
// let content = '';
//
// (async () => {
//     // 브라우저 인스턴스를 시작합니다.
//     const browser = await puppeteer.launch({headless: false}); // headless: false로 설정하여 브라우저를 시각적으로 확인
//     const page = await browser.newPage();
//
//     // 페이지로 이동하기 전에 쿠키를 설정합니다.
//     await page.setCookie({
//         name: 'cf_clearance',
//         value: '.WR212JH80bM1js8kTzhgQonRkJRZtOzC5NtmtgZd54-1721543806-1.0.1.1-MxreS8PNG7hrq6S_MveKMGe_FWVTMurfbS9PVIlqf92SQApHXb1TOx.7lhS2n4VvLKPRcmylDYNk7ZOiSZbU2Q',
//         domain: '.glassdoor.com',
//         path: '/',
//         expires: Date.now() + 60 * 60 * 1000 // 1시간 후 만료
//     });
//
//     // 쿠키가 설정된 상태로 페이지를 요청합니다.
//     await page.goto("https://www.glassdoor.com", {
//         waitUntil: 'networkidle2'
//     });
//
//     // 리다이렉션이 발생할 경우 최종 페이지의 콘텐츠를 가져오기 위해 기다립니다.
//     await page.waitForNavigation({waitUntil: 'networkidle2'});
//
//     // 페이지의 최종 콘텐츠를 가져옵니다.
//      content = await page.content();
//
//     console.log(content);
//     // 브라우저를 종료합니다.
//     // await browser.close();
// })();










// const getHtml = async () => {
    // try {
    //     // 1
    //     // const html = await axios.get("https://www.genie.co.kr/chart/top200");
    //     const html = await axios.get(url, {
    //         headers: {
    //             Cookie: `cf_clearance=${cookies}`
    //             // Cookie: cookies
    //         }
    //     })
    //     let ulList = [];
    //     // 2
    //     const $ = cheerio.load(html.data);
    //     // 3
    //     // const bodyList = $("div.row d-flex flex-wrap");
    //     // const bodyList = $("div.row");
    //     // bodyList.map((i, element) => {
    //     //     ulList[i] = {
    //     //         rank: i + 1,
    //     //         // 4
    //     //         title: $(element).find("td.info a.title").text().replace(/\s/g, ""),
    //     //         artist: $(element).find("td.info a.artist").text().replace(/\s/g, ""),
    //     //     };
    //     // });
    //     console.clear()
    //     console.log("bodyList : ", ulList);
    //     console.log(2222)
    // } catch (error) {
    //     console.clear()
    //     console.error(error);
    //     console.log(1111)
    // }
// };

