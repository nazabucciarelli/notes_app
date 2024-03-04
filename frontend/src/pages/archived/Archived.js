import { useEffect, useState } from "react";
import { Container, Grid, Typography } from '@mui/material';
import Note from "../../components/note/Note";
import config from "../../config";

const Archived = () => {
    const [archivedNotes, setArchivedNotes] = useState([])

    useEffect(() => {
        fetchNotes()
    }, []);

    const fetchNotes = () => {
        fetch(config.apiUrl + '/notes/archived')
            .then((doc) => doc.json())
            .then((data) => {
                setArchivedNotes(data)
            });
    }

    return (
        <>
            <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="end"
                sx={{ mt: '20px', paddingRight: '6em' }}>
            </Grid>
            <Grid sx={{ mt: 1.0 }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    item
                    xs={12}>
                    {archivedNotes.length === 0 ?
                        <Container sx={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography color="#736e6e">No tasks archived yet.</Typography>
                        </Container> : ""}
                    {archivedNotes.map((note) => <Note fetchNotes={fetchNotes} key={note.id} note={note} />)}
                </Grid>
            </Grid>
        </>
    )

}

export default Archived;