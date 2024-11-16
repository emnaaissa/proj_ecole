package com.ecole.ecole.enseignant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EnseignantService {

    @Autowired
    private EnseignantRepository enseignantRepository;

    // Ajouter un enseignant
    public Enseignant ajouterEnseignant(Enseignant enseignant) {
        return enseignantRepository.save(enseignant);
    }

    // Supprimer un enseignant par ID
    public void supprimerEnseignant(Long id) {
        enseignantRepository.deleteById(id);
    }

    // Modifier un enseignant
    public Enseignant editerEnseignant(Long id, Enseignant enseignantDetails) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(id);
        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            enseignant.setNom(enseignantDetails.getNom());
            enseignant.setPrenom(enseignantDetails.getPrenom());
            enseignant.setEmail(enseignantDetails.getEmail());
            enseignant.setTelephone(enseignantDetails.getTelephone());
            enseignant.setMatiere(enseignantDetails.getMatiere());
            enseignant.setAdresse(enseignantDetails.getAdresse());
            enseignant.setSexe(enseignantDetails.getSexe());
            enseignant.setDateNaissance(enseignantDetails.getDateNaissance());
            enseignant.setSalaire(enseignantDetails.getSalaire());
            return enseignantRepository.save(enseignant);
        } else {
            throw new RuntimeException("Enseignant non trouvé");
        }
    }

    // Trouver un enseignant par ID
    public Enseignant rechercherEnseignant(Long id) {
        return enseignantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé"));
    }

    // Lister tous les enseignants
    public List<Enseignant> listerEnseignants() {
        return enseignantRepository.findAll();
    }

    // Rechercher les enseignants par nom
    public List<Enseignant> rechercherEnseignantsParNom(String nom) {
        return enseignantRepository.findByNomContaining(nom);
    }
}
