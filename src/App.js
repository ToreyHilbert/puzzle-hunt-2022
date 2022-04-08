import { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Stack, Typography } from '@mui/material'

import { Scoreboard } from './components/Scoreboard.js'
import { SubmissionForm } from './components/SubmissionForm.js';

export const App = () => {
  const [teamData, setTeamData] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/.netlify/functions/get-team-data")
        setTeamData(response.data)
      } catch (error) {
        console.log(error.toJSON())
      }
    })()
  }, [])

  return (
    <Container>
        <Stack spacing={2}>
            <Typography variant="h4">Puzzle Hunt 2022</Typography>
            <Scoreboard teams={teamData} />
            <Typography variant="body1">If you've arrived at the location of the solution for a puzzle, you should find a sticker stuck to something with a short phrase. Enter the phrase below to record your team's success!</Typography>
            <SubmissionForm 
              teamNames={teamData.map(team => team.name)}
              setTeamData={setTeamData}
            />
            <Typography variant="h6">What is this?</Typography>
            <Typography variant="body1">The Puzzle Hunt is an event at OSU originally hosted by two math students, Dennis Sweeney and Rushil Raghavan, in early 2020. This year, Oscar Coppola, Jay Ozello, and Torey Hilbert are bringing back the tradition by hosting another Puzzle Hunt. Participants receive a packet of 20 puzzles that point to some location on campus. After solving a puzzle, they travel to the location and find a secret phrase that they enter here. The event takes place across the majority of OSU campus east of the Olentangy.</Typography>
        </Stack>
    </Container>
  )
}
