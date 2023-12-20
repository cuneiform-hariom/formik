import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

export const FriendList = () => (
    <div className='container'>
        <h1 className='text-center my-5'>Friend List</h1>
        <Formik
            initialValues={{ friends: [] }}
            onSubmit={values =>
                console.log(values)
            }>
            {(formik) => (
                <Form>
                    <FieldArray
                        name="friends"
                        render={arrayHelpers => (
                            <div>
                                {formik.friends && formik.friends.length > 0 ? (
                                    formik.friends.map((friend, index) => (
                                        <div key={index}>
                                            <Field name={`friends.${index}`} />
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <button type="button" onClick={() => arrayHelpers.push('')}>
                                        {/* show this when user has removed all friends from the list */}
                                        Add a friend
                                    </button>
                                )}
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        )}
                    />
                </Form>
            )}
        </Formik>
    </div>
);