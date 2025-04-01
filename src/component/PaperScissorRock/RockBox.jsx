import React from "react";
import { styled } from "@mui/material/styles";

const BoxStyle = styled("div")(() => ({
    width: "50%",
    border: "5px solid black",
    color: "#000",
    padding: "20px",
    textAlign: "center",
    borderRadius: "8px",
}));

const HandStyle = styled("div")(() => ({
    height: 67,
    "& .MuiSvgIcon-root, & span": {
        fontSize: 50,
    },
}));

const RockBox = (props) => {
    // console.log("props:", props);
    return (
        <BoxStyle
            sx={{
                borderColor:
                    props.result === "이겼다"
                        ? "green"
                        : props.result === "졌다"
                        ? "red"
                        : "black",
            }}
        >
            <h2>{props.name}</h2>
            <HandStyle>{props.item.icon}</HandStyle>
            <p>
                {props.result === "이겼다"
                    ? "win"
                    : props.result === "졌다"
                    ? "loose"
                    : "same"}
            </p>
        </BoxStyle>
    );
};

export default RockBox;
