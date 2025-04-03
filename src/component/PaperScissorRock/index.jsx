import React, { useEffect, useState } from "react";
import RockBox from "./RockBox";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const GameWrap = styled("div")(() => ({
    position: "relative",
    minWidth: 400,
    minHeight: 400,
    padding: "10px",
    textAlign: "center",
    "@media (max-width: 400px)": {
        minWidth: "100%",
    },
    "&::after": {
        display: "block",
        position: "absolute",
        top: 123,
        left: "50%",
        marginLeft: "-30px",
        content: '"VS"',
        color: "#1976d2",
        fontSize: 50,
        fontWeight: 900,
        zIndex: 2,
        textShadow: "-1px 0px #fff, 0px 2px #fff, 2px 0px #fff, 0px -1px #fff",
    },
}));

const BoxWrap = styled("div")(() => ({
    display: "flex",
    margin: "10px",
}));

const ButtonWrap = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    gap: "5px",
}));

const ProcessBox = styled("ul")(() => ({
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    listStyle: "none",
}));

const choice = {
    scissor: {
        name: "Scissor",
        icon: <span>✌️</span>,
    },
    rock: {
        name: "Rock",
        icon: <span>✊</span>,
    },
    paper: {
        name: "Paper",
        icon: <span>✋</span>,
    },
};

const RockScissorPaper = () => {
    const [myHand, setMyHand] = useState(null);
    const [comHand, setComHand] = useState(null);
    const [myResult, setMyResult] = useState("");
    const [comResult, setComResult] = useState("");
    const [totalResult, setTotalResult] = useState("");

    const [time, setTime] = useState(5);
    const [resultPerTime, setResultPerTime] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const getRandomHand = () => {
        // choice 객체의 키를 배열로 추출
        const hands = [...Object.keys(choice)];
        const randomIndex = Math.floor(Math.random() * hands.length);
        return hands[randomIndex];
    };

    const game = (item) => {
        setMyHand(item);
        const comSelect = getRandomHand();
        setComHand(comSelect);
        setTime(time - 1);
    };

    const gameResult = (myHand, comHand) => {
        let myResult = "";
        let comResult = "";
        if (myHand === comHand) {
            myResult = "비겼다";
            comResult = "비겼다";
        } else if (
            (myHand === "rock" && comHand === "scissor") ||
            (myHand === "paper" && comHand === "rock") ||
            (myHand === "scissor" && comHand === "paper")
        ) {
            myResult = "이겼다";
            comResult = "졌다";
        } else {
            myResult = "졌다";
            comResult = "이겼다";
        }
        return { myResult, comResult };
    };

    const resetGame = () => {
        setTime(5);
        setButtonDisabled(false);
        setResultPerTime([]);
        setMyHand(null);
        setComHand(null);
        setMyResult("");
        setComResult("");
        setTotalResult("");
    };

    useEffect(() => {
        if (myHand === null || comHand === null) return;
        const resultText = gameResult(myHand, comHand);
        // console.log(resultText.myResult);
        setMyResult(resultText.myResult);
        setComResult(resultText.comResult);
        setResultPerTime((prev) => [
            ...prev,
            `${5 - time} ${resultText.myResult}`,
        ]); // 결과가 같더라도 유일한 값을 갖도록 숫자 붙임
    }, [myHand, comHand, time]);

    useEffect(() => {
        if (time === 0 && resultPerTime.length > 0) {
            setButtonDisabled(true);

            const winCount = resultPerTime
                .map((r) => r.split(" ")[1]) // 숫자 제거 후 결과값만 추출
                .filter((r) => r === "이겼다").length;

            const loseCount = resultPerTime
                .map((r) => r.split(" ")[1])
                .filter((r) => r === "졌다").length;

            setTotalResult(
                winCount > loseCount
                    ? "이겼다"
                    : winCount < loseCount
                    ? "졌다"
                    : "비겼다"
            );
        }
    }, [time, resultPerTime]);

    // 가위,바위,보 버튼을 클릭하면, 내 박스에는 해당 선택이 보여지고, 컴퓨터는 랜덤하게 뽑은 것이 보여진다.
    // 게임 결과가 텍스트로 노출되고, 이기면 박스컬러가 그린, 지면 레드, 비기면 블랙으로 표시된다.
    return (
        <GameWrap>
            <h1>가위바위보 게임</h1>
            <BoxWrap>
                <RockBox
                    name="you"
                    item={myHand ? choice[myHand] : { name: "", icon: <div /> }}
                    result={myResult}
                />
                <RockBox
                    name="computer"
                    item={
                        comHand ? choice[comHand] : { name: "", icon: <div /> }
                    }
                    result={comResult}
                />
            </BoxWrap>
            <ButtonWrap>
                <Button
                    variant="contained"
                    startIcon={<span>✌️</span>}
                    onClick={() => {
                        game("scissor");
                    }}
                    disabled={buttonDisabled}
                >
                    가위
                </Button>
                <Button
                    variant="contained"
                    startIcon={<span>✊</span>}
                    onClick={() => {
                        game("rock");
                    }} //onClick사용시에 ()=> 의 콜백함수로 넣어줘야 리랜더링될 때 실행되지 않음
                    disabled={buttonDisabled}
                >
                    바위
                </Button>

                <Button
                    variant="contained"
                    startIcon={<span>✋</span>}
                    onClick={() => {
                        game("paper");
                    }}
                    disabled={buttonDisabled}
                >
                    보
                </Button>
            </ButtonWrap>
            <h2>기회: {time}</h2>
            {resultPerTime.length > 0 && (
                <>
                    <ProcessBox>
                        {resultPerTime.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ProcessBox>
                </>
            )}

            {buttonDisabled && (
                <>
                    <h2>결과: {totalResult}</h2>
                    <Button variant="outlined" onClick={() => resetGame()}>
                        게임 시작
                    </Button>
                </>
            )}
        </GameWrap>
    );
};

export default RockScissorPaper;
