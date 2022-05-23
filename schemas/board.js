// 게시글 서버 구성을 위한 데이터베이스 세팅
// 필요한 변수명: 제목(String), 작성자명(String), 작성일자(Date), 비밀번호(Number)

// mongoose 모듈 임포트
const mongoose = require("mongoose");

// 스키마 함수를 활용해서 데이터베이스 형태를 세팅 (new를 통해서 클래스 생성)
const boardSchema = new mongoose.Schema({

    // 게시글 제목
    boardTitle: {
        type: String,
        required: true,
        unique: true
    },

    // 작성자명
    name: {
        type: String,
        required: true
    },
    
    // 작성일자
    uploadDate: {
        type: Date
    },
    
    // 비밀번호
    password: {
        type: Number
    },

    // 작성글
    context: {
        type: String
    }

});

// 스키마 데이터 Export
module.exports = mongoose.model("Boards", boardSchema);