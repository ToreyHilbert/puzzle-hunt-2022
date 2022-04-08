import { useState } from 'react'
import { 
    Alert,
    Snackbar,
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
    const [selectedTeam, setSelectedTeam] = useState("");

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        severity: "error",
        message: "",
    });
  
    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSnackbarState({
        ...snackbarState,
          open: false,
      })
    };

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

            setSnackbarState({
                open: true,
                severity: "success",
                message: "Success!"
            })
            setTeamData(response.data)
        } catch (error) {
            console.log("Error in submission form!", error.response)

            setSnackbarState({
                open: true,
                severity: "error",
                message: error.response.data.message,
            })
        }

    }

    return (
        <Card>
            <Snackbar 
                open={snackbarState.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarState.severity}
                >
                    {snackbarState.message}
                </Alert>
            </Snackbar>
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
