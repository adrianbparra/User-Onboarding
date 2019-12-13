import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";
import UserList from "./UserList"


function UserForm({values, errors, touched, status}) {

    const [users, setUsers] = useState([]);

    useEffect(()=> {
        status && setUsers(users => [...users, status])
    },[status])
    
    // console.log(values)

    return (
        <div  className="main-container">
            
            <Form>
                <h1>Add New Users</h1>
                <Field type="name" name="name" placeholder="Enter Name" />
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}

                <Field type="email" name="email" placeholder="Enter Email"/>
                <Field type="password" name="password" placeholder="Enter Password"/>
                <label>
                    
                    <Field  type="checkbox" name="tos" checked={values.tos}/>
                    Check to agree to the Terms of Services
                </label>
                <button type="submit">Submit!</button>

            </Form>

            <UserList users={users} />
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues(props){
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            tos: props.tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),

    }),
    handleSubmit(values, {setStatus, resetForm, status}) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log("success", res);
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.log(err.response))
    }
})(UserForm);

export default FormikUserForm;