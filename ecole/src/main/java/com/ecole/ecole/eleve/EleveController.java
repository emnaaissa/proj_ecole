package com.ecole.ecole.eleve;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class EleveController {

    @Autowired
    private EleveRepository eleveRepository;

    // 1. Créer un élève (POST)
    @PostMapping("/eleves")
    public ResponseEntity<Eleve> createEleve(@RequestBody Eleve eleve) {
        Eleve nouveauEleve = eleveRepository.save(eleve);
        return new ResponseEntity<>(nouveauEleve, HttpStatus.CREATED);
    }

    // 2. Lire tous les élèves (GET)
    @GetMapping("/eleves")
    public ResponseEntity<List<Eleve>> getAllEleves() {
        List<Eleve> eleves = eleveRepository.findAll();
        return new ResponseEntity<>(eleves, HttpStatus.OK);
    }

    // 3. Lire un élève par ID (GET)
    @GetMapping("/eleves/{id}")
    public ResponseEntity<Eleve> getEleveById(@PathVariable Long id) {
        Optional<Eleve> eleve = eleveRepository.findById(id);
        if (eleve.isPresent()) {
            return new ResponseEntity<>(eleve.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 4. Mettre à jour un élève (PUT)
    @PutMapping("/eleves/{id}")
    public ResponseEntity<Eleve> updateEleve(@PathVariable Long id, @RequestBody Eleve eleveDetails) {
        Optional<Eleve> eleve = eleveRepository.findById(id);

        if (eleve.isPresent()) {
            Eleve eleveMiseAJour = eleve.get();
            eleveMiseAJour.setPrenom(eleveDetails.getPrenom());
            eleveMiseAJour.setNom(eleveDetails.getNom());
            eleveMiseAJour.setDateNaissance(eleveDetails.getDateNaissance());
            eleveMiseAJour.setSexe(eleveDetails.getSexe());
            eleveMiseAJour.setNumeroTelephone(eleveDetails.getNumeroTelephone());
            eleveMiseAJour.setAdresse(eleveDetails.getAdresse());
            eleveMiseAJour.setClasseActuelle(eleveDetails.getClasseActuelle());
            eleveMiseAJour.setNomParent(eleveDetails.getNomParent());
            eleveMiseAJour.setNumeroTelephoneParent(eleveDetails.getNumeroTelephoneParent());

            Eleve eleveSauvegarde = eleveRepository.save(eleveMiseAJour);
            return new ResponseEntity<>(eleveSauvegarde, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 5. Supprimer un élève (DELETE)
    @DeleteMapping("/eleves/{id}")
    public ResponseEntity<Void> deleteEleve(@PathVariable Long id) {
        Optional<Eleve> eleve = eleveRepository.findById(id);

        if (eleve.isPresent()) {
            eleveRepository.delete(eleve.get());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}