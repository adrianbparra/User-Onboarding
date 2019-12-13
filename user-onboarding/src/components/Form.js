import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";
import UserList from "./UserList"


function UserForm({values, props}) {

    const [users, setUsers] = useState([]);

    useEffect(()=> {

    },[status])
    
    console.log(values)

    return (
        <div  className="form-container">
            <h1>Add New Users</h1>
            <Form>
                <Field type="name" name="name" placeholder="Enter Name" />

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
    handleSubmit(values, {setStatus, resetForm}) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log("success", res);
                setStatus(res.data);
                resetForm();
            })
    }
})(UserForm);

export default FormikUserForm;