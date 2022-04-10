import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledStack = styled(Stack)((_) => ({
    "> img": {
        width: "100%",
        height: "auto",
    },
}));

export const PuzzleClues = () => {
    return (
        <React.Fragment>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Puzzle #07</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StyledStack spacing={2}>
                        <img
                            alt="puzzle-07-pic-1"
                            src="https://cdn.statically.io/gh/ToreyHilbert/puzzle-hunt-2022/main/assets/PuzzleHunt2022-Puzzle07-1.jpg"
                        />
                        <img
                            alt="puzzle-07-pic-2"
                            src="https://cdn.statically.io/gh/ToreyHilbert/puzzle-hunt-2022/main/assets/PuzzleHunt2022-Puzzle07-2.jpg"
                        />
                        <img
                            alt="puzzle-07-pic-3"
                            src="https://cdn.statically.io/gh/ToreyHilbert/puzzle-hunt-2022/main/assets/PuzzleHunt2022-Puzzle07-3.jpg"
                        />
                    </StyledStack>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Puzzle #08</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <audio controls>
                        <source
                            src="https://raw.githubusercontent.com/ToreyHilbert/puzzle-hunt-2022/main/assets/PuzzleHunt2022-Puzzle08.mp3"
                            type="audio/mpeg"
                        />
                    </audio>
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    );
};
