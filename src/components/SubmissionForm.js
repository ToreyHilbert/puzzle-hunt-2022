import { useState } from 'react'
import { SubmissionFormButton, SubmissionFormContainer, SubmissionFormInput, SubmissionFormTeamSelect } from './SubmissionFormStyled'

import axios from 'axios'

export const SubmissionForm = ({ teamNames, setTeamData }) => {
    const [phraseText, setPhraseText] = useState("")
    const [selectedTeam, setSelectedTeam] = useState(null);

    const submitForm = async () => {
        if (selectedTeam == null) {
            return
        }

        const submittedPhraseText = phraseText
        setPhraseText("")

        try {
            const response = await axios.post('/.netlify/functions/phrase', {
                team: selectedTeam,
                phrase: submittedPhraseText,
            })

            setTeamData(response.data)
        } catch (error) {
            console.log("Error in submission form!", error)
        }

    }

    return (
        <SubmissionFormContainer>
            <SubmissionFormInput 
                type="text"
                placeholder="Enter a phrase"
                value={phraseText}
                onChange={event => setPhraseText(event.target.value)}
            />
            <SubmissionFormTeamSelect onChange={event => setSelectedTeam(event.target.value)}>
                <option disabled selected value={null}>-- Select your team --</option>
                {teamNames.map((team, i) =>
                    <option key={i} value={team}>{team}</option>
                )}
            </SubmissionFormTeamSelect>
            <SubmissionFormButton onClick={submitForm}>Submit!</SubmissionFormButton>
        </SubmissionFormContainer>
    );
}
