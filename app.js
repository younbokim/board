const express = require("express"); // express 모듈 import
const connect = require("./schemas")//경로는 스키마 안의 인덱스를 자동으로 추적
// const connect = require("./schemas") // schemas/index.js import
const app = express(); // express 메서드 통해서 객체 생성
const port = 3000; // 포트명 설정

connect(); // 서버 연결

const boardRouter = require("./routes/boards.js"); // board 라우터 세팅

app.use(express.json());// body로 들어오는 json 데이터를 파싱해주는 함수(여기 미들웨어에는 무조건 들어옴, 1순위)

app.use("/api", [boardRouter]); // api 경로로 접속시 board 라우터로 접속


// 접속 테스트
app.get('/', (req, res) =>{
    res.send("Hello World");
  });

// 서버 접속 개시
app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!");
});

