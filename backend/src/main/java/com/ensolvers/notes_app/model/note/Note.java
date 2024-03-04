package com.ensolvers.notes_app.model.note;

import com.ensolvers.notes_app.model.tag.Tag;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "notes")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    @ManyToOne
    private Tag tag;
    private LocalDateTime creationDate = LocalDateTime.now();
    private boolean deleted = false;
    private LocalDateTime archivedDate;
}
