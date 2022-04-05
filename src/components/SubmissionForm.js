import { useState } from 'react'
import { SubmissionFormButton, SubmissionFormContainer, SubmissionFormInput, SubmissionFormTeamSelect } from './SubmissionFormStyled'

import axios from 'axios'

export const SubmissionForm = () => {
    const [phraseText, setPhraseText] = useState("Playful Persephone")
    const [selectedTeam, setSelectedTeam] = useState(null);

    const teams = ["Tensor", "Other", "Other 2"]

    const submitForm = () => {
        if (selectedTeam == null) {
            return
        }

        axios.post('/.netlify/functions/phrase', {
            team: selectedTeam,
            phrase: phraseText,
        })
    }

    return (
        <SubmissionFormContainer>
            <SubmissionFormInput 
                type="text" 
                value={phraseText}
                onChange={event => setPhraseText(event.target.value)}
            />
            <SubmissionFormTeamSelect onChange={event => setSelectedTeam(event.target.value)}>
                <option disabled selected value={null}>-- Select your team --</option>
                {teams.map((team, i) =>
                    <option key={i} value={team}>{team}</option>
                )}
            </SubmissionFormTeamSelect>
            <SubmissionFormButton onClick={submitForm}>Submit!</SubmissionFormButton>
        </SubmissionFormContainer>
    );
}
