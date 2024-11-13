import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import slider1 from '../assets/images/slider1.png';
import slider3 from '../assets/images/slider3.png';
import { Link, useNavigate } from 'react-router-dom';
import './all.css';
import { app } from '../firebase.config';
import { getDatabase, ref, set } from 'firebase/database';
import { useFormik } from 'formik';
import { signupSchema } from '../yup';

const initialValues = {
    name: '',
    phone: '',
    email: ''
};

function Signup() {
    const navi = useNavigate();
    const database = getDatabase(app);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit: (values) => {
            set(ref(database, `users/+91${values.phone}`), {
                name: values.name,
                phone: `+91${values.phone}`,
                email: values.email
            }).then(() => {
                navi('/home');
            });
        }
    });

    return (
        <div className='px-3'>
            <Row className='d-flex justify-content-center' style={{ height: '60vh', paddingInline: '6vw' }}>
                {width >= 700 && (
                    <Col sm={5} className='slider-side d-flex justify-content-center px-4 mt-4'>
                        <div className='mt-5 rounded-5' style={{ width: '90%', backgroundColor: `rgb(217 ,217 ,217,0.2)` }}>
                            <Carousel className='d-flex justify-content-center align-item-center'>
                                <Carousel.Item interval={4000}>
                                    <img className='img-fluid' src={slider1} alt="slider1" style={{ width: '100%', height: '83vh' }} />
                                </Carousel.Item>
                                <Carousel.Item interval={4000}>
                                    <img className='img-fluid' src={slider3} alt="slider1" style={{ width: '100%', height: '83vh' }} />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </Col>
                )}

                <Col sm={6} className='my-2'>
                    <div className='w-100 d-flex justify-content-end'>
                        <img className='img-fluid rounded-pill my-4 shadow-lg' src={logo} alt="logo" style={{ width: '80px', height: '80px' }} />
                    </div>
                    <div className='mx-4 w-75'>
                        <h2 style={{ fontWeight: 600, color: '#313131', textShadow: '1px 3px 30px grey' }}>Sign up</h2>
                        <small style={{ color: '#313131' }} className='mt-2 mb-5'>Let’s get you all set up so you can access your personal account.</small>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className=''>
                                    <FloatingLabel controlId="floatingInput" label="Name" className="w-100 mt-4">
                                        <Form.Control type="text" name='name' placeholder="Name" style={{ borderColor: '#1C1B1F' }} value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                    </FloatingLabel>
                                    <div className='form_error '><p className='text-danger'>{errors.name}</p></div>
                                </Col>
                                <Col sm={6}>
                                    <FloatingLabel controlId="floatingInput" label="Phone" className="w-100  mt-4">
                                        <Form.Control name='phone' type="text" placeholder="Phone" style={{ borderColor: '#1C1B1F' }} value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                                    </FloatingLabel>
                                    <div className='form_error '><p className='text-danger'>{errors.phone}</p></div>
                                </Col>
                                <Col sm={12}>
                                    <FloatingLabel controlId="floatingInput" label="Email" className="w-100 mt-4 ">
                                        <Form.Control type="email" name='email' placeholder="Email" style={{ borderColor: '#1C1B1F' }} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                    </FloatingLabel>
                                    <div className='form_error mb-4'><p className='text-danger'>{errors.email}</p></div>
                                </Col>
                            </Row>
                            <span><input type="checkbox" className='me-2' /> <small>I agree to all the <span style={{ color: '#FF8682' }}>terms</span> and <span style={{ color: '#FF8682' }}>Privacy Policies</span></small></span>

                            <button type='submit' className='btn w-100 rounded-1 text-white p-2 mt-4' style={{ background: '#515DEF', fontSize: '13px' }}>Create Account</button>
                        </form>

                        <br />
                        <div className='w-100 text-center my-2'>
                            <small><span className='me-2'>Already have an account?</span><Link to={'/'} style={{ textDecoration: 'none' }}><span style={{ color: '#FF8682' }}>Login</span></Link></small>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Signup;
