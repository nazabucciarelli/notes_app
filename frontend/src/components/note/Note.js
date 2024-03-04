import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialog from '../alert_dialog/AlertDialog';
import config from "../../config";
import FormDialog from '../form_dialog/FormDialog';

const formatDate = (date) => {
    return format(date, 'dd/MM/yyyy HH:mm');
};

const Note = (props) => {
    const [deleteAlertDialog, setDeleteAlertDialog] = React.useState(false);
    const [editNoteForm, setEditNoteForm] = React.useState(false);

    const handleClickEditButton = () => {
        props.fetchTags();
        setEditNoteForm(true)
    }

    const handleClickDeleteButton = () => {
        setDeleteAlertDialog(true);
    }

    const handleDeleteAlertDialogYes = () => {
        const deleteNoteRequest = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch(config.apiUrl + "/notes/" + props.note.id, deleteNoteRequest)
            .then(() => {
                props.fetchNotes();
            })
            .catch(error => console.error("Error trying to delete a note", error))
        setDeleteAlertDialog(false);
    }

    const handleClickArchive = () => {
        const archiveNoteRequest = {
            method: 'PUT'
        }
        fetch(config.apiUrl + "/notes/archive/" + props.note.id, archiveNoteRequest)
            .then(() => {
                props.fetchNotes();
            })
            .catch(error => console.error("Error trying to archive a note", error))
    }

    const handleClickUnarchive = () => {
        const archiveNoteRequest = {
            method: 'PUT'
        }
        fetch(config.apiUrl + "/notes/unarchive/" + props.note.id, archiveNoteRequest)
            .then(() => {
                props.fetchNotes();
            })
            .catch(error => console.error("Error trying to unarchive a note", error))
    }

    return (
        <Box sx={{ width: 275, padding: 1 }}>
            <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14, mb: 2 }} color="text.secondary" gutterBottom>
                        {props.note.tag.name}
                    </Typography>
                    <Typography sx={{wordWrap:'break-word'}} variant="h6" component="div">
                        {props.note.content}
                    </Typography>
                    <Typography sx={{ mt: 1.5, fontSize: 14 }} color="text.secondary">
                        Created on {formatDate(new Date(props.note.creationDate))}
                    </Typography>
                    {props.note.archivedDate !== null &&
                        <Typography sx={{ mt: 1.5, fontSize: 14 }} color="text.secondary">
                            Archived on {formatDate(new Date(props.note.archivedDate))}
                        </Typography>}
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    {props.note.archivedDate === null ?
                        <>
                            <Button onClick={handleClickEditButton} size="small">
                                <EditIcon sx={{ color: '#5f6769' }} />
                            </Button>
                            <Button size="small" onClick={handleClickArchive}>
                                Archive
                            </Button>
                            <Button onClick={handleClickDeleteButton} size="small">
                                <DeleteIcon sx={{ color: '#bd2615' }} />
                            </Button>
                        </>
                        :
                        <Button size="small" onClick={handleClickUnarchive}>Unarchive</Button>
                    }
                </CardActions>
            </Card>
            <AlertDialog yesNoButtons={true} title="Delete a note" body="Do you really want to delete this note?" handleYes={handleDeleteAlertDialogYes}
                open={deleteAlertDialog} setOpen={setDeleteAlertDialog}></AlertDialog>
            <FormDialog fetchNotes={props.fetchNotes} dialogTitle="Edit a note" noteId={props.note.id} tagId={props.note.tag.id}
                content={props.note.content} tags={props.tags} open={editNoteForm} setOpen={setEditNoteForm}></FormDialog>
        </Box>

    );
}

export default Note;