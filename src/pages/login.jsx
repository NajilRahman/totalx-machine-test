import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import logo from '../assets/images/logo.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import slider1 from '../assets/images/slider1.png'
import slider3 from '../assets/images/slider3.png'
import Verify from '../components/Verify';
import { Link, useNavigate } from 'react-router-dom';
import './all.css'
import { useFormik } from 'formik';
import { loginSchema } from '../yup'
import { app, auth } from '../firebase.config';
import { getAuth, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const initialValues = {
    phone: ''
}
function Login() {
    const navi=useNavigate()
    const [state, setState] = useState(true)
    const [loading, setLoading] = useState(false)
    const [mount, setMount] = useState(true)

    useEffect(() => {
        setMount(true)
        onAuthStateChanged(auth,(user)=>{
        if(user)
        {  
            navi('/home')
        }
        else{
            setMount(false)
            console.log(user)
        }
       
    })
    }, [])
    

    




    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', { 'size': 'invisible' })
            recaptcha.render().then(() => {
                setLoading(true)
                const phone = `+91${values.phone}`;

                signInWithPhoneNumber(auth, phone, recaptcha)
                    .then((res) => {
                        window.confirmationResult = res
                        setLoading(false)
                        setState(!state)
                        toast.success('OTP sended successfully')

                    })
                    .catch((err) => {
                        setLoading(false)
                        toast.success('For testing purpose use 123456789 phone and 123456 OTP')
                    });
            }).catch((error) => {
                console.log('Error rendering reCAPTCHA:', error);
                toast.error('Refresh the page before tryfing again')
            });



        }
    })
    return (
        <div className='px-3'>

           {
            !mount?
            <Row className='  d-flex justify-content-center ' style={{ height: '60vh', paddingInline: '6vw' }}>

            {
                state ?
                    <Col sm={6} className='my-2'>
                        <img className='img-fluid rounded-pill my-4 shadow-lg' src={logo} alt="logo" style={{ width: '80px', height: '80px' }} />

                        <div className='py-5 mx-4 w-75'>
                            <h2 style={{ fontWeight: 600, color: '#313131', textShadow: '1px 3px 30px grey' }}  >Login</h2>
                            <small style={{ color: '#313131' }} className='mt-2 mb-5'>An authentication code has been sent to your email.</small>
                            <form onSubmit={handleSubmit}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Enter Mobile Number"
                                    className="w-100 mt-5"
                                >
                                    <Form.Control type="String" placeholder="Phone" name='phone' style={{ borderColor: '#1C1B1F' }} onChange={handleChange} onBlur={handleBlur} value={values.phone} />
                                </FloatingLabel>
                                <div className='form_error  mb-4'><p className='text-danger'>{errors.phone}</p></div>
                                <div id='recaptcha-container'></div>
                                <button type='submit' className='btn w-100 rounded-1 text-white p-2' style={{ background: '#515DEF', fontSize: '13px' }} disabled={loading}>
                                    {loading ? <div class="spinner-border text-light"  role="status">
                                </div>:'Get OTP'}</button>
                            </form>
                            <br />
                            <div className='w-100 text-center my-2'>
                                <small><span>Don't have an account?</span> <Link to={'/signup'} style={{ textDecoration: 'none' }}><span style={{ color: '#FF8682' }}> Sign up</span></Link></small>
                            </div>

                        </div>
                    </Col>
                    :
                    <Verify setState={setState} />
            }
            <Col sm={5} className='d-flex justify-content-center px-4  mt-4' id='slider-side'>
                <div className='  mt-5  rounded-5 ' style={{ width: '90%', backgroundColor: `rgb(217 ,217 ,217,0.2)` }}>
                    <Carousel className='d-flex justify-content-center align-item-center'>
                        <Carousel.Item interval={4000} >
                            <img className='img-fluid ' src={slider1} alt="slider1" style={{ width: '100%', height: '83vh' }} />

                        </Carousel.Item>

                        <Carousel.Item interval={4000} >
                            <img className='img-fluid' src={slider3} alt="slider1" style={{ width: '100%', height: '83vh' }} />

                        </Carousel.Item >
                    </Carousel>
                </div>
            </Col>
        </Row>
        : <div className='d-flex justify-content-center align-items-center'style={{height:'100vh'}}><div class="spinner-border text-dark "  role="status"/></div>

           }
        </div >
    )
}

export default Login
