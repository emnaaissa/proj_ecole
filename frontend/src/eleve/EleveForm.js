import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';

const EleveForm = ({ eleve, onClose }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        dateNaissance: '',
        sexe: '',
        numeroTelephone: '',
        adresse: '',
        classeActuelle: '',
        nomParent: '',
        numeroTelephoneParent: ''
    });

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (eleve) {
            setFormData(eleve);
            setShow(true);
        } else {
            setFormData({
                nom: '',
                prenom: '',
                dateNaissance: '',
                sexe: '',
                numeroTelephone: '',
                adresse: '',
                classeActuelle: '',
                nomParent: '',
                numeroTelephoneParent: ''
            });
            setShow(false);
        }
    }, [eleve]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (eleve) {
            await axios.put(`http://localhost:9091/api/eleves/${eleve.id}`, formData);
        } else {
            await axios.post('http://localhost:9091/api/eleves', formData);
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
                إضافة تلميذ
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={modalHeaderStyle}>
                    <Button variant="close" onClick={handleClose} /> {/* Close button on the left */}
                    <Modal.Title style={modalTitleStyle}>
                        {eleve ? 'تعديل التلميذ' : 'إضافة تلميذ'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ direction: 'rtl' }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="nom">
                            <Form.Label>الإسم</Form.Label>
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
                        <Form.Group controlId="numeroTelephone">
                            <Form.Label>رقم الهاتف</Form.Label>
                            <Form.Control
                                type="text"
                                name="numeroTelephone"
                                value={formData.numeroTelephone}
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
                        <Form.Group controlId="classeActuelle">
                            <Form.Label>القسم الحالي</Form.Label>
                            <Form.Control
                                type="text"
                                name="classeActuelle"
                                value={formData.classeActuelle}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="nomParent">
                            <Form.Label>إسم الولي</Form.Label>
                            <Form.Control
                                type="text"
                                name="nomParent"
                                value={formData.nomParent}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="numeroTelephoneParent">
                            <Form.Label>رقم هاتف الولي</Form.Label>
                            <Form.Control
                                type="text"
                                name="numeroTelephoneParent"
                                value={formData.numeroTelephoneParent}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit">
                            {eleve ? 'تعديل' : 'إضافة'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EleveForm;