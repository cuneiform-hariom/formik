import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

export default function Form() {

    const initialValues = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
        c_password: '',
        addinfo: false,
        addInfoText: '',
    }

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('name field is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('email field is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Invalid phone number")
            .required("Phone number is required"),
        // gender: Yup.string().required('gender field is required'),
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
                // then: Yup.string().required("Add info field is required")
                then: formSchema => formSchema.required('Add info field is required')
            }),
    })

    const formik = useFormik(({
        initialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    }))

    return (
        <div>
            <div className="container">
                <h2 className='my-4 text-center'>Formik Form</h2>

                <form className='form' onSubmit={formik.handleSubmit}>

                    <div className='mt-4'>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && <span className='text-danger'>{formik.errors.name}</span>}
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && <span className='text-danger'>{formik.errors.email}</span>}
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            maxLength={10}
                            onInput={(e) => { e.target.value = e.target.value.slice(0, 10).replace(/\D/g, ""); }}
                            placeholder='Mobile Number'
                        />
                        {formik.touched.phone && formik.errors.phone && <span className='text-danger'>{formik.errors.phone}</span>}
                    </div>
                    <div className='mt-4'>
                        <label>Gender</label>
                        <div className='mt-1 d-flex'>
                            <div>
                                <input
                                    className='mx-1'
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    checked={formik.values.gender === "male"}
                                />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div className='mx-3'>
                                <input
                                    className='mx-1'
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    checked={formik.values.gender === "female"}
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && <span className='text-danger'>{formik.errors.password}</span>}
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="c_password">Confirm password:</label>
                        <input
                            type="password"
                            name="c_password"
                            id="c_password"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.c_password}
                        />
                        {formik.touched.c_password && formik.errors.c_password && <span className='text-danger'>{formik.errors.c_password}</span>}
                    </div>
                    <div className="mt-4">
                        <input
                            type="checkbox"
                            name="addinfo"
                            id="addinfo"
                            className='form-check-input me-2'
                            value={formik.values.addinfo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label className='form-check-label' htmlFor="addinfo">Additional Info</label>
                    </div>
                    {formik.values.addinfo && <div className="mt-4">
                        <label htmlFor="addInfoText">Add Additional Information</label>
                        <textarea
                            name="addInfoText"
                            id="addInfoText"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.addInfoText}
                        >
                        </textarea>
                        {formik.touched.addInfoText && formik.errors.addInfoText && <span className='text-danger'>{formik.errors.addInfoText}</span>}
                    </div>}
                    <div className='mt-4'>
                        <button className='btn btn-primary' type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
