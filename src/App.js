import { useState, useEffect } from 'react';
import axios from 'axios'

import { AppContainer } from './AppStyles.js'

import { Scoreboard } from './components/Scoreboard.js'
import { SubmissionForm } from './components/SubmissionForm.js';

export const App = () => {
  const [teamData, setTeamData] = useState([])

  useEffect(async () => {
    try {
      const response = await axios.get("/.netlify/functions/get-team-data")
      setTeamData(response.data)
    } catch (error) {
      console.log(error.toJSON())
    }
  }, [])

  return (
      <AppContainer>
          <SubmissionForm 
            teamNames={teamData.map(team => team.name)}
            setTeamData={setTeamData}
          />
          <Scoreboard teams={teamData} />
      </AppContainer>
  );
}
