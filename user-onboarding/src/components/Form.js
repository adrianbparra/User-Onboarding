import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";
import UserList from "./UserList"


function UserForm({values, errors, touched, status, emails,setEmails}) {

    const [users, setUsers] = useState([{id: Date.now(),name:"waffle", email: "waffle@syrup.com", password:"Ilovewaffles"}]);
    
    

    console.log(emails);

    useEffect(()=> {
        status && setUsers(users => [...users, status]) && setEmails(emails => [...emails, status.email])
    },[status])
    
    // console.log(values)

    // const validateEmail = (value, props) => {
    //     let error;

    //     console.log(value)        
    //     if(users.includes(user=> user.email === value)){
    //         error = "User is taken"
    //     }

    //     return error
    //     // users.map(user => user.email)

    //     // if(!values.email === user.email){
    //     /////////////////////////////////////////////////////////////////////////////////////
    //     // }
    // }

    return (
        <div  className="main-container">
            
            <Form>
                <h1>Add New Users</h1>
                <Field type="name" name="name" placeholder="Enter Name" />
                {touched.name && errors.name && (
                    <p className="errors">{errors.name}</p>
                )}

                <Field type="email" name="email" placeholder="Enter Email"/>
                {touched.email && errors.email && (
                    <p className="errors">{errors.email}</p>
                )}
                <Field type="password" name="password" placeholder="Enter Password"/>
                {touched.password && errors.password && (
                    <p className="errors">{errors.password}</p>
                )}
                <label>
                    
                    <Field  type="checkbox" name="tos" checked={values.tos}/>
                    Check to agree to the Terms of Services 
                    
                </label>
                {touched.tos && <p className="errors tos">{errors.tos}</p>}
                <button type="submit">Submit!</button>

            </Form>

            
            <UserList users={users} />
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password,tos}){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },
    validationSchema: props => {
        console.log(props);
        return (
            Yup.object().shape({
                name: Yup.string().required(),      
                email: Yup.string().notOneOf(props.emails,`That email is taken, Please use another one or reset password.`).email("Please use an email").required(),
                password: Yup.string().required("Please Enter a Password"),
                tos: Yup.bool().oneOf([true], "You must agree to the Terms of Services").required()
                })
        )
    },
    handleSubmit(values, {setStatus, resetForm, status} ) {
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