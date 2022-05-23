// 게시판 운영 관련 API 모음

// 기본 세팅 진행(express 임포트, 스키마 임포트, 라우터 객체 받아오기)
const express = require("express");
const Boards = require("../schemas/board");
const router = express.Router();


// 전체 게시글 조회 API

router.get("/", async (req, res) => {

    const { category } = req.query;

    const boards = await Boards.find({category}, {_id: 0, password : 0, context : 0});

    // 오름차순으로 데이터 정렬
    res.json({
        boards: boards.sort((a, b) => a["uploadDate"] - b["uploadDate"])
    })

});



// 게시글 작성 API
// post 통해서는 글 제목과 작성자, 비밀번호만 입력
// request를 받으면 받는 시점의 날짜 데이터를 받아오기

router.post("/boards", async (req, res) => {
    const { boardTitle, name, password, context } = req.body; // post로 전달되는 데이터들을 각각 변수로 저장
    const boards = await Boards.find({ boardTitle }); // 게시판 제목 데이터 추출
    console.log(boards);
    if (boards.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." }); //response로 경고 문구 송부, 리턴을 통해서 콜백함수를 종료
        }
        // 현재 시간 추가
        const uploadDate = new Date();
        const createBoards = await Boards.create({ boardTitle, name, uploadDate, password, context });
        res.send("데이터가 작성 완료되었습니다.");
});

// 게시글 조회 API(단순 개시글 조회)

router.get("/boards", async (req, res) => {

    const { category } = req.query;

    const boards = await Boards.find({category}, {_id: 0, password : 0});

    console.log(boards);

    // 오름차순으로 데이터 정렬
    res.json({
        boards: boards.sort((a, b) => a["uploadDate"] - b["uploadDate"])
    })

});

// 게시글 수정 API

router.put("/boards", async (req, res) => {
    const { boardTitle, password, context } = req.body; // post로 전달되는 게시글명과 비밀번호를 각각 저장
    
    // 우선, 동일한 게시글이 존재하지 않는지 찾기(존재하지 않으면 중단)
    const boards = await Boards.find({boardTitle}); // 게시글 제목 추출
    if (!boards.length) {
        return res.status(400).json({ success: false, errorMessage: "게시글이 존재하지 않습니다." }); //response로 경고 문구 송부, 리턴을 통해서 콜백함수를 종료
        }
    
    // 다음으로, 비밀번호 같은지 여부 체크        
    if (Number(password) != Number(boards[0].password)) {
        return res.status(400).json({ success: false, errorMessage: "비밀번호가 다릅니다." }); //response로 경고 문구 송부, 리턴을 통해서 콜백함수를 종료
    }

    // 게시글 수정하기
    await Boards.updateOne({boardTitle: boardTitle}, {$set : {context}});

    res.json({success: true});

    
});

// 게시글 삭제하기
router.delete("/boards", async (req, res) => {
    const { boardTitle, password} = req.body; // post로 전달되는 게시글명과 비밀번호를 각각 저장
    
    // 우선, 동일한 게시글이 존재하지 않는지 찾기(존재하지 않으면 중단)
    const boards = await Boards.find({boardTitle}); // 게시글 제목 추출
    if (!boards.length) {
        return res.status(400).json({ success: false, errorMessage: "게시글이 존재하지 않습니다." }); //response로 경고 문구 송부, 리턴을 통해서 콜백함수를 종료
        }
    
    // 다음으로, 비밀번호 같은지 여부 체크        
    if (Number(password) != Number(boards[0].password)) {
        return res.status(400).json({ success: false, errorMessage: "비밀번호가 다릅니다." }); //response로 경고 문구 송부, 리턴을 통해서 콜백함수를 종료
    }

    // 게시글 삭제하기
    await Boards.deleteOne({ boardTitle });

    res.json({success: true});

    
});




// 라우터 export
module.exports = router;

// router.get('/', async (req, res) => {
//     const { username } = req.query;
//     const wholeArticle = await Articles.find(
//       {},
//       { _id: 0, title: 1, username: 1, date: 1 }
//     );
  
//     const article = username
//       ? await Articles.find(
//           { username },
//           { _id: 0, username: 1, title: 1, password: 1, content: 1 }
//         )
//       : wholeArticle.sort((a, b) => a['date'] - b['date']);
//     res.json({ article });
//   });