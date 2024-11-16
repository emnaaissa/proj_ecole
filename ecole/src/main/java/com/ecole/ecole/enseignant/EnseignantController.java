package com.ecole.ecole.enseignant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enseignants")
public class EnseignantController {

    @Autowired
    private EnseignantService enseignantService;

    // Ajouter un enseignant
    @PostMapping
    public Enseignant ajouterEnseignant(@RequestBody Enseignant enseignant) {
        return enseignantService.ajouterEnseignant(enseignant);
    }

    // Supprimer un enseignant par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> supprimerEnseignant(@PathVariable Long id) {
        enseignantService.supprimerEnseignant(id);
        return ResponseEntity.ok().build();
    }

    // Modifier un enseignant par ID
    @PutMapping("/{id}")
    public Enseignant editerEnseignant(@PathVariable Long id, @RequestBody Enseignant enseignantDetails) {
        return enseignantService.editerEnseignant(id, enseignantDetails);
    }

    // Rechercher un enseignant par ID
    @GetMapping("/{id}")
    public Enseignant rechercherEnseignant(@PathVariable Long id) {
        return enseignantService.rechercherEnseignant(id);
    }

    // Lister tous les enseignants
    @GetMapping
    public List<Enseignant> listerEnseignants() {
        return enseignantService.listerEnseignants();
    }

    // Rechercher les enseignants par nom
    @GetMapping("/recherche")
    public List<Enseignant> rechercherEnseignantsParNom(@RequestParam String nom) {
        return enseignantService.rechercherEnseignantsParNom(nom);
    }
}

