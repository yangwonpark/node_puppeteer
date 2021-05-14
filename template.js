const puppeteer = require('puppeteer');

//입력 할 텍스트
const insert_name =  "insert_" + Math.random().toString(36).substring(2, 15);
const insert_description = "insert_" + Math.random().toString(36).substring(2, 15);

//수정 할 텍스트
const modi_name = "update_" + Math.random().toString(36).substring(2, 15);
const modi_description = "update_" + Math.random().toString(36).substring(2, 15);

async function run (){

    // 브라우저 열기
    const browser = await puppeteer.launch({
        // headless : false    // default: true    false로 하면 웹 브라우저가 같이 실행됨(chormium)
    });
    const page = await browser.newPage();  
    

    // 웹사이트 로딩 => 네이버 코스피 지수
    await page.goto('https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%BD%94%EC%8A%A4%ED%94%BC', {timeout: 0, waitUntil: 'domcontentloaded'});

    // 상단 테이블의 th 제목을 가져오고 싶은경우
    const tdName = await page.$eval('.spt_con strong', strong => strong.textContent.trim() );
    console.log(tdName);

    // 브라우저 닫기
    await browser.close();
}

run();
