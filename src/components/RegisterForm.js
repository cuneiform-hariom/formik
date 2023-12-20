import { Field, Formik, Form, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from 'yup'

export default function RegisterForm() {


    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('name field is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('email field is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Invalid phone number")
            .required("Phone number is required"),
        password: Yup.string()
            .required('password field is required')
            .min(6, 'min 6 char is required')
            .max(10, 'max 10 char is allowed'),
        c_password: Yup.string()
            .required('confirm password field is required')
            .oneOf([Yup.ref('password')], 'password must be same'),
        addinfo: Yup.boolean(),
        addInfoText: Yup.string().when('addinfo', {
            is: true,
            then: formSchema => formSchema.required('Add info field is required')
        }),
    })

    return (
        <div>
            <div className="container">
                <h2 className='my-4 text-center'>Formik Form</h2>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        gender: '',
                        password: '',
                        c_password: '',
                        addinfo: false,
                        addInfoText: '',
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >

                    {(formik) => (
                        <Form className='form'>
                            <div className='mt-4'>
                                <label htmlFor="name">Name:</label>
                                <Field
                                    type="text"
                                    name="name"
                                    className='form-control'
                                />
                                <ErrorMessage
                                    name='name'
                                    component='span'
                                    className='text-danger'
                                />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="email">Email:</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className='form-control'
                                />
                                <ErrorMessage
                                    name='email'
                                    component='span'
                                    className='text-danger'
                                />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="phone">Phone:</label>
                                <Field
                                    type="text"
                                    name="phone"
                                    className='form-control'
                                    maxLength={10}
                                    onInput={(e) => { e.target.value = e.target.value.slice(0, 10).replace(/\D/g, ""); }}
                                    placeholder='Mobile Number'
                                />
                                <ErrorMessage
                                    name='phone'
                                    component='span'
                                    className='text-danger'
                                />
                            </div>
                            <div className='mt-4'>
                                <label>Gender</label>
                                <div className='mt-1 d-flex'>
                                    <div>
                                        <Field
                                            type="radio"
                                            name="gender"
                                            className='mx-1'
                                            id="male"
                                            value="male"
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className='mx-3'>
                                        <Field
                                            type="radio"
                                            name="gender"
                                            className='mx-1'
                                            id="female"
                                            value="female"
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="password">Password:</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className='form-control'
                                    id="password"
                                />
                                <ErrorMessage
                                    name='password'
                                    component='span'
                                    className='text-danger'
                                />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="c_password">Confirm password:</label>
                                <Field
                                    type="password"
                                    name="c_password"
                                    id="c_password"
                                    className='form-control'
                                />
                                <ErrorMessage
                                    name='c_password'
                                    component='span'
                                    className='text-danger'
                                />

                            </div>
                            <div className="mt-4">
                                <Field
                                    type="checkbox"
                                    name="addinfo"
                                    id="addinfo"
                                    className='form-check-input me-2'
                                />
                                <label className='form-check-label' htmlFor="addinfo">Additional Info</label>
                            </div>
                            {formik.values.addinfo && <div className="mt-4">
                                <label htmlFor="addInfoText">Add Additional Information</label>
                                <Field
                                    as="textarea"
                                    name="addInfoText"
                                    id="addInfoText"
                                    className='form-control'
                                    value={formik.values.addInfoText}
                                />
                                <ErrorMessage
                                    name='addInfoText'
                                    component='span'
                                    className='text-danger'
                                />
                            </div>}
                            <div className='mt-4'>
                                <button className='btn btn-primary' type="submit">Send</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
