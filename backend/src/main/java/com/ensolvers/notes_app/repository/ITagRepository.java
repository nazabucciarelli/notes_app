package com.ensolvers.notes_app.repository;

import com.ensolvers.notes_app.model.tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITagRepository extends JpaRepository<Tag, Long> {
}
