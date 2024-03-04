import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import config from "../../config";
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function FormDialog(props) {
    const [selectedTag, setSelectedTag] = useState(props.tagId ? props.tagId : '');
    const [content, setContent] = useState(props.content ? props.content : '');

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSelectChange = (event) => {
        setSelectedTag(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const cleanFields = () => {
        setSelectedTag("")
        setContent("")
    }

    const handleSubmitCreate = (event) => {
        event.preventDefault();
        const createNoteRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    content: content,
                    tagId: selectedTag
                }
            )
        }
        fetch(config.apiUrl + "/notes", createNoteRequest)
            .then(() => {
                props.fetchNotes();
            })
            .catch(error => console.error("Error trying to create a note", error))
        cleanFields();
        handleClose();
    }

    const handleSubmitEdit = (event) => {
        event.preventDefault()
        const editNoteRequest = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    content: content,
                    tagId: selectedTag
                }
            )
        }
        fetch(config.apiUrl + "/notes/" + props.noteId, editNoteRequest)
            .then(() => {
                props.fetchNotes();
            })
            .catch(error => console.error("Error trying to update a note", error))
        handleClose();
    }

    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                onClose={handleClose}>
                <DialogTitle>{props.dialogTitle}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel sx={{ mt: 0.6 }}>Tag</InputLabel>
                        <Select
                            disabled={props.tags && props.tags.length === 0 ? true : false}
                            id="tag"
                            required
                            value={selectedTag}
                            label="Tag"
                            onChange={handleSelectChange}
                            sx={{ mb: 2 }}
                        >
                            {props.tags && props.tags.map((tag) => <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            autoFocus
                            required
                            id="content"
                            name="content"
                            label="Content"
                            type="text"
                            variant="outlined"
                            value={content}
                            onChange={handleContentChange}
                            inputProps={{ maxLength: 50 }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={selectedTag === '' || content.trim() === '' ? true : false} onClick={props.dialogTitle.includes("Add") ? handleSubmitCreate : handleSubmitEdit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}
