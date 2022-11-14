import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function Update() {
  const { setAuth, auth } = useAuth();
  console.log(auth.id, "AUTH ID :D");
  const backendDomain = process.env.REACT_APP_backendDomain;
  const navigate = useNavigate();
  const [passId, setPassId] = useState("");
  const [attractionId, setAttractionId] = useState("");
  const [passNumber, setPassNumber] = useState("");
  const [previousLoanBy, setPreviousLoanBy] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [replacementFee, setReplacementFee] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [attachmentLink, setAttachmentLink] = useState("");

  const [oldStatus, setOldStatus] = useState("");

  useEffect(() => {
    setPassId(localStorage.getItem("passId"));
    setAttractionId(localStorage.getItem("attractionId"));
    setPassNumber(localStorage.getItem("passNumber"));
    setPreviousLoanBy(localStorage.getItem("previousLoanBy"));
    setDescription(localStorage.getItem("description"));
    const status = localStorage.getItem("description").split(",./")[0];
    const type = localStorage.getItem("description").split(",./")[1];
    const replacementFee = localStorage.getItem("description").split(",./")[2];
    const emailTemplate = localStorage.getItem("description").split(",./")[3];
    const attachmentLink = localStorage.getItem("description").split(",./")[4];
    setStatus(status);
    setOldStatus(status);
    setType(type);
    setReplacementFee(replacementFee);
    setEmailTemplate(emailTemplate);
    setAttachmentLink(attachmentLink);
  }, []);

  const updateAPIData = () => {
    const description1 =
      status +
      ",./" +
      type +
      ",./" +
      replacementFee +
      ",./" +
      emailTemplate +
      ",./" +
      attachmentLink;
    console.log(description);
    Swal.fire({
      title: "Loading information from database...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axios
      .put(
        `${backendDomain}/api/v1/loanpass/${passId}?attractionId=${attractionId}&passNumber=${passNumber}&previousLoanBy=${previousLoanBy}&description=${description1}`,
        null
      )
      .then(() => {
        // if status = Loaned out, add to successloan
        if (status === "Loaned out" && oldStatus !== "Loaned out") {
          // get successloan by attraction, staff and date
          axios
            .get(
              `${backendDomain}/api/v1/successloan/staff/${previousLoanBy}/attraction/${attractionId}/month/${
                new Date().getMonth() + 1
              }/year/${new Date().getFullYear()}/day/${new Date().getDay()}`
            )
            .then((response) => {
              if (response.data.length === 0) {
                axios
                  .post(`${backendDomain}/api/v1/successloan`, {
                    attractionId: attractionId,
                    staffId: previousLoanBy,
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear(),
                    day: new Date().getDay(),
                  })
                  .then(() => {
                    Swal.close();
                    alert("created success loan!");
                  });
              } else {
                Swal.close();
              }
            });
        }

        Swal.close();
        navigate("/react/read");
      })
      .catch((err) => {
        Swal.close();
        alert("error in update! staying on this page." + err);
      });
  };

  return (
    <div
      style={{
        width: "85%",
        height: "70vh",
        maxWidth: "500px",
        minWidth: "200px",
      }}
    >
      <Form className="create-form">
        <Form.Field>
          <label>attractionId</label>
          <input
            placeholder="attractionId"
            value={attractionId}
            onChange={(e) => setAttractionId(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>passNumber</label>
          <input
            placeholder="passNumber"
            value={passNumber}
            onChange={(e) => setPassNumber(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>previousLoanBy</label>
          <input
            placeholder="previousLoanBy"
            value={previousLoanBy}
            onChange={(e) => setPreviousLoanBy(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Uncollected">Uncollected</option>
            <option value="Loaned out">Loaned out</option>
            <option value="Lost">Lost</option>
          </select>
        </Form.Field>
        <Form.Field>
          <label>type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Physical">Physical</option>
            <option value="Digital">Digital</option>
          </select>
        </Form.Field>
        <Form.Field>
          <label>replacementFee</label>
          <input
            placeholder="replacementFee"
            value={replacementFee}
            onChange={(e) => setReplacementFee(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>emailTemplate</label>
          <input
            placeholder="emailTemplate"
            value={emailTemplate}
            onChange={(e) => setEmailTemplate(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>attachmentLink</label>
          <input
            placeholder="attachmentLink"
            value={attachmentLink}
            onChange={(e) => setAttachmentLink(e.target.value)}
          />
        </Form.Field>
        <Button type="submit" onClick={updateAPIData}>
          Update
        </Button>
      </Form>
    </div>
  );
}