import { ScoreboardContainer } from './ScoreboardStyles'

export const Scoreboard = (props) => {
    console.log(props)
    const computedTeams = props.teams.map(team => ({
        ...team,
        points : team["submitted_puzzles"] + team["solved_puzzles"].reduce((prev, next) => prev + next, 0)
    }))

    return (
        <ScoreboardContainer>
            <table>
                <tr>
                    <th>Team name</th>
                    <th>Points</th>
                    <th>#01</th>
                    <th>#02</th>
                    <th>#03</th>
                    <th>#04</th>
                    <th>#05</th>
                    <th>#06</th>
                    <th>#07</th>
                    <th>#08</th>
                    <th>#09</th>
                    <th>#10</th>
                    <th>#11</th>
                    <th>#12</th>
                    <th>#13</th>
                    <th>#14</th>
                    <th>#15</th>
                    <th>#16</th>
                    <th>#17</th>
                    <th>#18</th>
                    <th>#19</th>
                    <th>#20</th>
                </tr>
                {computedTeams.map((team, i) =>
                    <tr key = {i}>
                        <td>{team["name"]}</td>
                        <td>{team["points"]}</td>
                        {team["solved_puzzles"].map((val, j) => 
                            <td>{val}</td>
                        )}
                    </tr>
                )}
            </table>
        </ScoreboardContainer>
    );
}
