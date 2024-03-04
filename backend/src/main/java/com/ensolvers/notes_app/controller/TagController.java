package com.ensolvers.notes_app.controller;

import com.ensolvers.notes_app.infra.exceptions.ResourceNotFoundException;
import com.ensolvers.notes_app.model.tag.CreateTagData;
import com.ensolvers.notes_app.model.tag.Tag;
import com.ensolvers.notes_app.repository.ITagRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tags")
public class TagController {

    @Autowired
    private ITagRepository tagRepository;

    @GetMapping
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> optionalTagList = tagRepository.findAll();
        return ResponseEntity.ok().body(optionalTagList);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Tag> createTag(@RequestBody CreateTagData createTagData,
                                         UriComponentsBuilder uriComponentsBuilder) {
        Tag tag = new Tag(createTagData);
        tagRepository.save(tag);
        URI uri = uriComponentsBuilder.path("/tags/{id}").buildAndExpand(tag.getId()).toUri();
        return ResponseEntity.created(uri).body(tag);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable Long id) {
        Optional<Tag> tag = tagRepository.findById(id);
        if (tag.isPresent()) {
            return ResponseEntity.ok().body(tag.get());
        } else {
            throw new ResourceNotFoundException("Tag with the ID " + id + " was not found");
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deleteTagById(@PathVariable Long id) {
        Optional<Tag> tag = tagRepository.findById(id);
        if (tag.isPresent()) {
            tagRepository.delete(tag.get());
            return ResponseEntity.noContent().build();
        } else {
            throw new ResourceNotFoundException("Tag with the ID " + id + " was not found");
        }
    }

}
