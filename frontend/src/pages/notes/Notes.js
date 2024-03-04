import { useEffect, useState } from "react";
import { Container, Grid, Typography } from '@mui/material';
import Note from "../../components/note/Note";
import config from "../../config";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from "../../components/form_dialog/FormDialog";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TagsDialog from "../../components/tags_dialog/TagsDialog";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const [addNoteForm, setAddNoteForm] = useState(false);
    const [tagsDialog, setTagsDialog] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        fetch(config.apiUrl + '/notes/unarchived')
            .then((doc) => doc.json())
            .then((data) => {
                setNotes(data)
            });
    }

    const fetchTags = () => {
        fetch(config.apiUrl + '/tags')
            .then((doc) => doc.json())
            .then((data) => {
                setTags(data)
            });
    }

    const handleClickAddNoteButton = () => {
        setAddNoteForm(true);
        fetchTags();
    }

    const handleClickEditTagsButton = () => {
        setTagsDialog(true);
    }

    return (
        <>
            <Container sx={{ mt: 3 }}>
                <Button onClick={handleClickAddNoteButton} variant="contained" color="success"><AddIcon sx={{ ml: -1, mr: 1 }}></AddIcon> Add Note</Button>
                <Button onClick={handleClickEditTagsButton} variant="outlined" sx={{ ml: 2 }} color="warning"> <LocalOfferIcon sx={{ ml: -1, mr: 1 }}></LocalOfferIcon> Edit Tags</Button>
            </Container>
            <Grid sx={{ mt: 1.0 }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {notes.length === 0 ?
                    <Container sx={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography color="#736e6e">No tasks to show. Please, before creating a task, create a tag pressing the "Edit Tags" button.</Typography>
                    </Container> : ""}
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    item
                    xs={12}>
                    {notes.map((note) => <Note key={note.id} fetchTags={fetchTags} tags={tags} fetchNotes={fetchNotes} note={note} />)}
                </Grid>
            </Grid>
            <FormDialog tags={tags} fetchNotes={fetchNotes} dialogTitle="Add a note" open={addNoteForm} setOpen={setAddNoteForm}></FormDialog>
            <TagsDialog open={tagsDialog} setTagsDialog={setTagsDialog}></TagsDialog>
        </>
    )
}

export default Notes;