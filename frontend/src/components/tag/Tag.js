import { Button, Container, DialogContentText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import config from "../../config";
import { useState } from "react";
import AlertDialog from "../alert_dialog/AlertDialog";

export default function Tag(props) {
    const [warningDialog, setWarningDialog] = useState(false);

    const handleClickDeleteButton = () => {
        fetch(config.apiUrl + "/notes/exists_note_by_tag/" + props.tagId)
            .then(response => { return response.json() })
            .then(data => {
                if (data.exists) {
                    setWarningDialog(data.exists)
                } else {
                    const createNoteRequest = {
                        method: 'DELETE'
                    }
                    fetch(config.apiUrl + "/tags/" + props.tagId, createNoteRequest)
                        .then(() => {
                            props.fetchTags();
                        })
                        .catch(error => console.error("Error trying to delete a tag", error))
                }
            })
            .catch(error => console.error("Error trying to verify if a note exists by a tag", error))
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <DialogContentText fontSize={14}>{props.name}</DialogContentText>
            <Button onClick={handleClickDeleteButton} size="small" color="error"><CloseIcon></CloseIcon></Button>
            <AlertDialog setOpen={setWarningDialog} open={warningDialog} yesNoButtons={false} title="Warning"
                body="You can't delete a tag which is currently being used by some notes!"></AlertDialog>
        </Container>
    )
}