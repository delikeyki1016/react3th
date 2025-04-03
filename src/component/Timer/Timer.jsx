import { useEffect } from "react";

const Timer = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("타이머!!");
        }, 1000);

        // 컴포넌트가 언마운트되면 실행되는 부분(즉 앱종료시에도 실행됨)
        return () => {
            clearInterval(interval);
            console.log("타이머 종료!!");
        };
    }, []);

    return <div>Timer</div>;
};
export default Timer;
