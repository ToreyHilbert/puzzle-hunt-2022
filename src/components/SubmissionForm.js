import { useState } from 'react'
import { 
    Card,
    CardContent,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material'


import axios from 'axios'

export const SubmissionForm = ({ teamNames, setTeamData }) => {
    const [phraseText, setPhraseText] = useState("")
    const [selectedTeam, setSelectedTeam] = useState('');

    const submitForm = async () => {
        if (selectedTeam === "") {
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
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <TextField 
                        sx={{minWidth: 300}}
                        label="Solution phrase"
                        variant="standard"
                        value={phraseText}
                        onChange={event => setPhraseText(event.target.value)}
                    />
                    <FormControl sx={{minWidth: 300}}>
                        <InputLabel id="team-select-label">Selected team</InputLabel>
                        <Select
                            labelId="team-select-label"
                            value={selectedTeam}
                            label="Team"
                            onChange={event => setSelectedTeam(event.target.value)}
                        >
                            {teamNames.map((team, i) =>
                                <MenuItem key={i} value={team}>{team}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Button 
                        variant="contained"
                        onClick={submitForm}
                    >
                        Submit!
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}
