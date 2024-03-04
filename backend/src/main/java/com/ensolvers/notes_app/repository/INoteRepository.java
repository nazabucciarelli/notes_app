package com.ensolvers.notes_app.repository;

import com.ensolvers.notes_app.model.note.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface INoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByArchivedDateNullAndDeletedFalseOrderByCreationDateDesc();

    List<Note> findByArchivedDateNotNullAndDeletedFalseOrderByArchivedDateDesc();

    boolean existsNoteByTagIdAndDeletedIsFalse(Long tagId);
}
