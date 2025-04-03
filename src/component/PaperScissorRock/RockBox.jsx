import React from "react";
import { styled } from "@mui/material/styles";

const BoxStyle = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "50%",
    height: 170,
    border: "5px solid black",
    color: "#000",
    padding: "20px 0",
    borderRadius: "8px",
}));

const HandStyle = styled("div")(() => ({
    "& .MuiSvgIcon-root, & span": {
        fontSize: 50,
    },
}));

const RockBox = (props) => {
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
                    : props.result === "비겼다"
                    ? "same"
                    : ""}
            </p>
        </BoxStyle>
    );
};

export default RockBox;
