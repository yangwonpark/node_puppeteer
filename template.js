const puppeteer = require('puppeteer');

//입력 할 텍스트를 랜덤 생성
const insert_name =  "insert_" + Math.random().toString(36).substring(2, 15);
const insert_description = "insert_" + Math.random().toString(36).substring(2, 15);

//수정 할 텍스트
const modi_name = "update_" + Math.random().toString(36).substring(2, 15);
const modi_description = "update_" + Math.random().toString(36).substring(2, 15);

async function run(){

    // 브라우저 열기
    const browser = await puppeteer.launch({
        // headless : false    // default: true    false로 하면 웹 브라우저가 같이 실행됨(chormium)
    });
    const page = await browser.newPage();  
    
    page.on("dialog", (dialog) => {
        dialog.accept();        // alert, confirm 창이 무조건 yes로 처리
    });

    // 웹사이트 로딩
    await page.goto('http://localhost:3000/', {timeout: 0, waitUntil: 'domcontentloaded'});

    // 상단 테이블의 th 제목을 가져오고 싶은경우
    // const tdName = await page.$eval('.spt_con strong', strong => strong.textContent.trim() );
    // console.log(tdName);



    await page.waitForSelector('.btn-default');
    await page.click('.btn-default');
    
    await page.waitForSelector('.btn-primary');
    
    // a,b = insert_name, insert_description        =>  얘네를 선택자로 불러온 태그에 넣어줌
    await page.evaluate( (a, b) => {
        document.querySelector('input[name=name]').value = a;
        document.querySelector('textarea[name=description]').value = b;
        document.querySelector('.btn-primary').click();
    }, insert_name, insert_description );
    
    await page.waitForSelector('.btn-default');
    await page.click('table tr:nth-child(2) td:nth-child(1) a');
    
    await page.waitForSelector('.btn-primary');
    await page.click('.btn-primary');
    await page.waitForSelector('.btn-primary');
    
    await page.evaluate((a, b) => {
        document.querySelector('input[name=name]').value = a;
        document.querySelector('textarea[name=description]').value = b;
        document.querySelector('.btn-primary').click();
    }, modi_name, modi_description);


    // delete관련
    await page.waitForSelector('.btn-default');
    await page.click('.btn-default');
    await page.waitForSelector('.btn-default');

    await page.click('.btn-danger'); 



    // 브라우저 닫기
    await browser.close();
}

run();
