import { useEffect, useState } from "react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendDomain = process.env.REACT_APP_backendDomain;

function EmailTemplateForm(props) {
    const [emailTemplateBody, setEmailTemplateBody] = useState("");
    const [emailTemplateName, setEmailTemplateName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("template", props);
        if (props.template) {
            setEmailTemplateBody(props.template.emailTemplateBody);
            setEmailTemplateName(props.template.emailTemplateName);
        }
    }, []);

    const postData = () => {
        const postRequest =
            "{emailTemplateName: " +
            emailTemplateName +
            ",\n emailTemplateBody: " +
            emailTemplateBody +
            "}";
        alert(
            "sent a post request:\n" +
                postRequest +
                `\nto ${backendDomain}/api/v1/emailtemplate`
        );

        axios
            .post(`${backendDomain}/api/v1/emailtemplates`, {
                emailTemplateName,
                emailTemplateBody,
            })
            .then(() => {
                alert("Email template added");
                navigate('/react/emailtemplates');
            })
            .catch((err) => {
                alert("error in creation! staying on this page." + err);
            });
    };

    const updateData = () => {
        axios.put(`${backendDomain}/api/v1/emailtemplates/${props.template.emailTemplateId}`, {
            emailTemplateName,
            emailTemplateBody,
        })
        .then(() => {
            alert("Email template edited!");
            navigate('/react/emailtemplates');
        })
        .catch((err) => {
            alert("error in updating! staying on this page." + err);
        });
    };

    return (
        <div>
            <label>Email Template Name:</label>
            <input
                onChange={(e) => setEmailTemplateName(e.target.value)}
                value = {emailTemplateName}
                class="form-control"
                type="text"
                placeholder="Enter template name"
            />
            <br></br>

            <ReactQuill
                theme="snow"
                value={emailTemplateBody}
                onChange={setEmailTemplateBody}
            />
            {props.template ? (
                <>
                    <button className="btn btn-primary" onClick={updateData}>
                        Update Template
                    </button>
                </>
            ) : (
                <>
                    <button className="btn btn-primary" onClick={postData}>
                        Submit Template
                    </button>
                </>
            )}
        </div>
    );
}

export default EmailTemplateForm;
