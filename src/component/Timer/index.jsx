import { useState } from "react";
import Timer from "./Timer";

const Sample = () => {
    const [showTimer, setShowTimer] = useState(true);

    return (
        <div>
            <button onClick={() => setShowTimer(!showTimer)}>타이머</button>
            {showTimer && <Timer />}
        </div>
    );
};
export default Sample;
