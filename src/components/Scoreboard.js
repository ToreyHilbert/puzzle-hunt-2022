import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import React from 'react';
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const Scoreboard = (props) => {
    console.log(props)
    const computedTeams = props.teams.map(team => ({
        ...team,
        points : team.submitted_puzzles + team.solved_puzzles.reduce((prev, next) => prev + next, 0),
        num_first : team.solved_puzzles.filter(num => num === 2).length,
        num_solved : team.solved_puzzles.filter(num => num > 0).length,
    }))

    const rows = [
        ["", ...computedTeams.map(team => team.name)],
        ["#01", ...computedTeams.map(team => team.solved_puzzles[0])],
        ["#02", ...computedTeams.map(team => team.solved_puzzles[1])],
        ["#03", ...computedTeams.map(team => team.solved_puzzles[2])],
        ["#04", ...computedTeams.map(team => team.solved_puzzles[3])],
        ["#05", ...computedTeams.map(team => team.solved_puzzles[4])],
        ["#06", ...computedTeams.map(team => team.solved_puzzles[5])],
        ["#07", ...computedTeams.map(team => team.solved_puzzles[6])],
        ["#08", ...computedTeams.map(team => team.solved_puzzles[7])],
        ["#09", ...computedTeams.map(team => team.solved_puzzles[8])],
        ["#10", ...computedTeams.map(team => team.solved_puzzles[9])],
        ["#11", ...computedTeams.map(team => team.solved_puzzles[10])],
        ["#12", ...computedTeams.map(team => team.solved_puzzles[11])],
        ["#13", ...computedTeams.map(team => team.solved_puzzles[12])],
        ["#14", ...computedTeams.map(team => team.solved_puzzles[13])],
        ["#15", ...computedTeams.map(team => team.solved_puzzles[14])],
        ["#16", ...computedTeams.map(team => team.solved_puzzles[15])],
        ["#17", ...computedTeams.map(team => team.solved_puzzles[16])],
        ["#18", ...computedTeams.map(team => team.solved_puzzles[17])],
        ["#19", ...computedTeams.map(team => team.solved_puzzles[18])],
        ["#20", ...computedTeams.map(team => team.solved_puzzles[19])],
    ]

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table sx={{minWidth : 120}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell sx={"text-align:right;"}>#Solved</TableCell>
                            <TableCell sx={"text-align:right;"}>#First Solved</TableCell>
                            <TableCell sx={"text-align:right;"}>#Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            computedTeams.map((team, i) => (
                                <TableRow key={i}>
                                    <TableCell>{team.name}</TableCell>
                                    <TableCell sx={"text-align:right;"}>{team.num_solved}</TableCell>
                                    <TableCell sx={"text-align:right;"}>{team.num_first}</TableCell>
                                    <TableCell sx={"text-align:right;"}>{team.points}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Full list of solved puzzles</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component = {Paper}>
                        <Table size="small" sx = {{ minWidth: 50 }}>
                            <TableHead>
                                <TableRow>
                                    {
                                        rows[0].map((colname, i) => (
                                            <TableCell sx={"text-align:right;"} key={i}>{colname}</TableCell>)
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(1).map((row, i) => (
                                    <TableRow sx={{ background: row.filter(val => val > 0).length > 0 ? "#D3EFDE" : "#FFFFD0" }} key={i}>
                                        {row.map((val, j) => (
                                            <TableCell
                                                sx={j === 0 ? "text-align:left;" : "text-align:right;"}
                                                key={j}
                                            >
                                                {val}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
                
            </Accordion>
        </React.Fragment>
    )
}
