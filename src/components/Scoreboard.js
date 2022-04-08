import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Scoreboard = (props) => {
    console.log(props)
    const computedTeams = props.teams.map(team => ({
        ...team,
        points : team["submitted_puzzles"] + team["solved_puzzles"].reduce((prev, next) => prev + next, 0)
    }))

    const rows = [
        ["", ...computedTeams.map(team => team.name)],
        ["Points", ...computedTeams.map(team => team.points)],
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
        <TableContainer component = {Paper}>
            <Table sx = {{minWidth: 500}}>
                <TableHead>
                    <TableRow>
                        {
                            rows[0].map((colname, i) => (
                                <TableCell key={i}>{colname}</TableCell>)
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(1).map((row, i) => (
                        <TableRow key={i}>
                            {row.map((val, j) => (
                                <TableCell key={j}>{val}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
