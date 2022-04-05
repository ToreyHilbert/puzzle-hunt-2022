import { useEffect } from 'react';
import axios from 'axios'

import { AppContainer } from './AppStyles.js'

import { Scoreboard } from './components/Scoreboard.js'
import { SubmissionForm } from './components/SubmissionForm.js';

export const App = () => {

  useEffect(() => {
    axios.get("/.netlify/functions/get-team-data").then(response =>{
      console.log(response.data)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

  return (
    <AppContainer>
      <SubmissionForm />
      <Scoreboard />
    </AppContainer>
  );
}
