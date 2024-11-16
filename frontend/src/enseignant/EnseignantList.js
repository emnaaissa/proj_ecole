import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';
import EnseignantForm from './EnseignantForm';

const EnseignantList = () => {
    const [enseignants, setEnseignants] = useState([]);
    const [editingEnseignant, setEditingEnseignant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEnseignants();
    }, []);

    const fetchEnseignants = async () => {
        try {
            const response = await axios.get('http://localhost:9091/api/enseignants');
            setEnseignants(response.data);
        } catch (err) {
            setError('Failed to fetch teachers');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المعلم؟')) {
            try {
                await axios.delete(`http://localhost:9091/api/enseignants/${id}`);
                fetchEnseignants(); // Rafraîchir la liste après la suppression
            } catch (err) {
                setError('فشل في حذف المعلم');
            }
        }
    };


    const handleEdit = (enseignant) => {
        setEditingEnseignant(enseignant);
    };

    const handleCloseForm = () => {
        setEditingEnseignant(null);
        fetchEnseignants();
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ direction: 'rtl' }}>قائمة المعلمين</h2>
                <EnseignantForm enseignant={editingEnseignant} onClose={handleCloseForm} />
            </div>

            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Table striped bordered hover style={{ direction: 'rtl' }}>
                    <thead>
                        <tr>
                            <th>الرقم</th>
                            <th>الاسم</th>
                            <th>اللقب</th>
                            <th>البريد الإلكتروني</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enseignants.map((enseignant) => (
                            <tr key={enseignant.id}>
                                <td>{enseignant.id}</td>
                                <td>{enseignant.nom}</td>
                                <td>{enseignant.prenom}</td>
                                <td>{enseignant.email}</td>
                                <td>
                                    <Button onClick={() => handleEdit(enseignant)}>تعديل</Button>{' '}
                                    <Button variant="danger" onClick={() => handleDelete(enseignant.id)}>حذف</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default EnseignantList;