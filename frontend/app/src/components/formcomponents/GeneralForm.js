import React from "react";
import '../styles/Categories.css'
import { Form } from "react-bootstrap";

const FormGeneral= (props) => {
    return <Form method="post" data={props.data}>
        {props.children}
        </Form>;
} 

export default FormGeneral;