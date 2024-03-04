package com.ensolvers.notes_app.controller;

import com.ensolvers.notes_app.infra.exceptions.ResourceNotFoundException;
import com.ensolvers.notes_app.model.note.CreateNoteData;
import com.ensolvers.notes_app.model.note.ExistsNoteByTagIdData;
import com.ensolvers.notes_app.model.note.Note;
import com.ensolvers.notes_app.model.note.UpdateNoteData;
import com.ensolvers.notes_app.model.tag.Tag;
import com.ensolvers.notes_app.repository.INoteRepository;
import com.ensolvers.notes_app.repository.ITagRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notes")
public class NoteController {
    @Autowired
    private INoteRepository noteRepository;

    @Autowired
    private ITagRepository tagRepository;

    @GetMapping("/unarchived")
    public ResponseEntity<List<Note>> getUnarchivedNotes() {
        return ResponseEntity.ok().body(noteRepository.findByArchivedDateNullAndDeletedFalseOrderByCreationDateDesc());
    }

    @GetMapping("/archived")
    public ResponseEntity<List<Note>> getArchivedNotes() {
        return ResponseEntity.ok().body(noteRepository.findByArchivedDateNotNullAndDeletedFalseOrderByArchivedDateDesc());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Note> createNote(@RequestBody CreateNoteData createNoteData,
                                           UriComponentsBuilder uriComponentsBuilder) {
        Note note = new Note();
        note.setContent(createNoteData.content());
        Optional<Tag> tag = tagRepository.findById(createNoteData.tagId());
        if (tag.isPresent()) {
            Tag obtainedTag = tag.get();
            note.setTag(obtainedTag);
        } else {
            throw new ResourceNotFoundException("Tag with ID " + createNoteData.tagId() + " was not found");
        }
        noteRepository.save(note);
        URI uri = uriComponentsBuilder.path("/notes/{id}").buildAndExpand(note.getId()).toUri();
        return ResponseEntity.created(uri).body(note);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNoteById(@PathVariable Long id) {
        Optional<Note> note = noteRepository.findById(id);
        if (note.isPresent()) {
            return ResponseEntity.ok().body(note.get());
        } else {
            throw new ResourceNotFoundException("Note with ID " + id + " was not found");
        }
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> updateNoteById(@PathVariable Long id, @RequestBody UpdateNoteData updateNoteData) {
        Optional<Note> note = noteRepository.findById(id);
        Optional<Tag> tag = tagRepository.findById(updateNoteData.tagId());
        if (note.isPresent()) {
            Note obtainedNote = note.get();
            obtainedNote.setContent(updateNoteData.content());
            if (tag.isPresent()) {
                obtainedNote.setTag(tag.get());
            } else {
                throw new ResourceNotFoundException("Tag with the ID " + updateNoteData.tagId() + " was not found");
            }
            return ResponseEntity.ok().body(obtainedNote);
        } else {
            throw new ResourceNotFoundException("Note with ID " + id + " was not found");
        }
    }

    @PutMapping("/archive/{id}")
    @Transactional
    public ResponseEntity<?> archiveNoteById(@PathVariable Long id) {
        Optional<Note> note = noteRepository.findById(id);
        if (note.isPresent()) {
            Note obtainedNote = note.get();
            obtainedNote.setArchivedDate(LocalDateTime.now());
            return ResponseEntity.ok().body(obtainedNote);
        } else {
            throw new ResourceNotFoundException("Note with ID " + id + " was not found");
        }
    }

    @PutMapping("/unarchive/{id}")
    @Transactional
    public ResponseEntity<?> unarchiveNoteById(@PathVariable Long id) {
        Optional<Note> note = noteRepository.findById(id);
        if (note.isPresent()) {
            Note obtainedNote = note.get();
            obtainedNote.setArchivedDate(null);
            return ResponseEntity.ok().body(obtainedNote);
        } else {
            throw new ResourceNotFoundException("Note with ID " + id + " was not found");
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deleteNoteById(@PathVariable Long id) {
        Optional<Note> note = noteRepository.findById(id);
        if (note.isPresent()) {
            Note obtainedNote = note.get();
            obtainedNote.setDeleted(true);
            return ResponseEntity.noContent().build();
        } else {
            throw new ResourceNotFoundException("Note with ID " + id + " was not found");
        }
    }

    @GetMapping("/exists_note_by_tag/{tag_id}")
    public ResponseEntity<?> existsNoteByTagId(@PathVariable Long tag_id) {
        if (!tagRepository.existsById(tag_id)) {
            throw new ResourceNotFoundException("Tag with ID " + tag_id + " was not found");
        }
        return ResponseEntity.ok().body(new ExistsNoteByTagIdData(noteRepository.existsNoteByTagIdAndDeletedIsFalse(tag_id)));
    }

}
