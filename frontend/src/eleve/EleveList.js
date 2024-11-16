import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import EleveForm from './EleveForm';

const EleveList = () => {
    const [eleves, setEleves] = useState([]);
    const [editingEleve, setEditingEleve] = useState(null);

    useEffect(() => {
        fetchEleves();
    }, []);

    // Fonction pour récupérer les élèves depuis le backend
    const fetchEleves = async () => {
        const response = await axios.get('http://localhost:9091/api/eleves');
        setEleves(response.data);
    };

    // Fonction pour supprimer un élève
    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا التلميذ؟')) {
            
                await axios.delete(`http://localhost:9091/api/eleves/${id}`);
                fetchEleves(); // Refresh the list after successful deletion
            
        }
    };


    // Fonction pour éditer un élève
    const handleEdit = (eleve) => {
        setEditingEleve(eleve);
    };

    // Fonction pour fermer le formulaire et recharger la liste des élèves
    const handleCloseForm = () => {
        setEditingEleve(null);
        fetchEleves();
    };

    return (
        <div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ direction: 'rtl' }}>قائمة التلاميذ</h2>
                <EleveForm eleve={editingEleve} onClose={handleCloseForm} />
            </div>
            <Table striped bordered hover style={{ direction: 'rtl' }}>
                <thead>
                    <tr>
                        <th>الرقم</th>
                        <th>الاسم</th>
                        <th>اللقب</th>
                        <th>القسم</th>
                        <th>الهاتف</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {eleves.map((eleve) => (
                        <tr key={eleve.id}>
                            <td>{eleve.id}</td>
                            <td>{eleve.nom}</td>
                            <td>{eleve.prenom}</td>
                            <td>{eleve.classeActuelle}</td>
                            <td>{eleve.numeroTelephone}</td>
                            <td>
                                <Button onClick={() => handleEdit(eleve)}>تعديل</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(eleve.id)}>حذف</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EleveList;
