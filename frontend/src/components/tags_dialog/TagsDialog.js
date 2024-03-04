import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Container } from '@mui/material';
import config from "../../config";
import Tag from '../tag/Tag';

export default function TagsDialog(props) {
    const [tags, setTags] = React.useState([])
    const [tag, setTag] = React.useState("");

    React.useEffect(() => {
        fetchTags();
    }, [])

    const fetchTags = () => {
        fetch(config.apiUrl + '/tags')
            .then((doc) => doc.json())
            .then((data) => {
                setTags(data)
            });
    }

    const handleClose = () => {
        props.setTagsDialog(false);
    };

    const handleTagChange = (event) => {
        setTag(event.target.value)
    }

    const handleClickAddButton = () => {
        const createTagRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    name: tag
                }
            )
        }
        fetch(config.apiUrl + "/tags", createTagRequest)
            .then(() => {
                fetchTags();
            })
            .catch(error => console.error("Error trying to create a tag", error))
        setTag("");
    }

    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                onClose={handleClose}>
                <DialogTitle>Edit Tags</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create and remove tags for your notes
                    </DialogContentText>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
                        <TextField
                            autoFocus
                            id="tag"
                            name="tag"
                            label="Tag"
                            type="text"
                            variant="outlined"
                            value={tag}
                            onChange={handleTagChange}
                            inputProps={{ maxLength: 20 }}
                        /><Button disabled={tag.trim() === "" ? true: false} onClick={handleClickAddButton}><AddBoxIcon sx={{ fontSize: '3em' }} /></Button>
                    </Container>
                    <DialogContentText mb={2}>
                        Current tags:
                    </DialogContentText>
                    {tags.length === 0 ?
                        <DialogContentText fontSize={14} sx={{ textAlign: 'center' }} mt={2}>
                            No tags added yet
                        </DialogContentText> : ''}
                    {tags.map((tag) => <Tag fetchTags={fetchTags} key={tag.id} name={tag.name} tagId={tag.id}></Tag>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
