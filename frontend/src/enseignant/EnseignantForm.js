import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';

const EnseignantForm = ({ enseignant, onClose }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        matiere: '',
        adresse: '',
        sexe: '',
        dateNaissance: '',
        salaire: ''
    });

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (enseignant) {
            setFormData(enseignant);
            setShow(true);
        } else {
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                telephone: '',
                matiere: '',
                adresse: '',
                sexe: '',
                dateNaissance: '',
                salaire: ''
            });
            setShow(false);
        }
    }, [enseignant]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (enseignant) {
            await axios.put(`http://localhost:9091/api/enseignants/${enseignant.id}`, formData);
        } else {
            await axios.post('http://localhost:9091/api/enseignants', formData);
        }
        setShow(false);
        onClose();
    };

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    // Inline styles for the modal header
    const modalHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between', // Space between the close button and title
        alignItems: 'center',
        direction: 'rtl', // Ensure right-to-left text direction
    };

    const modalTitleStyle = {
        flex: 1, // Allow title to take available space
        textAlign: 'center', // Center the title
        margin: '0', // Remove margin for centering
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                إضافة المعلم
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={modalHeaderStyle}>
                    <Button variant="close" onClick={handleClose} /> {/* Close button on the left */}
                    <Modal.Title style={modalTitleStyle}>
                        {enseignant ? 'تعديل المعلم' : 'إضافة المعلم'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ direction: 'rtl' }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="nom">
                            <Form.Label>الاسم</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="prenom">
                            <Form.Label>اللقب</Form.Label>
                            <Form.Control
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>البريد الإلكتروني</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="telephone">
                            <Form.Label>رقم الهاتف</Form.Label>
                            <Form.Control
                                type="text"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="matiere">
                            <Form.Label>المادة</Form.Label>
                            <Form.Control
                                type="text"
                                name="matiere"
                                value={formData.matiere}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="adresse">
                            <Form.Label>العنوان</Form.Label>
                            <Form.Control
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="sexe">
                            <Form.Label>الجنس</Form.Label>
                            <Form.Control
                                type="text"
                                name="sexe"
                                value={formData.sexe}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="dateNaissance">
                            <Form.Label>تاريخ الميلاد</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateNaissance"
                                value={formData.dateNaissance}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="salaire">
                            <Form.Label>الراتب</Form.Label>
                            <Form.Control
                                type="text"
                                name="salaire"
                                value={formData.salaire}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {enseignant ? 'تعديل' : 'إضافة'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EnseignantForm;