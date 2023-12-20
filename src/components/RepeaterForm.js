import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import React from 'react'

export default function RepeaterForm() {
    return (
        <>
            <div className="container">
                <h3 className="text-center py-5">Add Multiple Employee</h3>
                <Formik
                    initialValues={{
                        employees: [{},{}]
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {(formik) => {
                        <Form>
                            <div className="form-group mt-3">
                                <FieldArray
                                    name='employees'
                                    render={
                                        arrayHelpers => {
                                            <div>
                                                {formik.values.employees.map((employee, index) => {
                                                    return (
                                                        <div>
                                                            {`Employee ${index + 1}`}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                    }
                                />
                            </div>
                        </Form>
                    }
                    }
                </Formik>


            </div>
        </>
    )
}
