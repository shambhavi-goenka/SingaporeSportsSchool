import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Read() {
// popup loading please wait

    const backendDomain = process.env.REACT_APP_backendDomain;
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        console.log("hello");

        // popup loading information from database
        Swal.fire({
            title: 'Loading information from database...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        axios.get(`${backendDomain}/api/v1/loanpass`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
                Swal.close();
            })


        // // giving in example data
        // const mockupData = [{
        //     "id": '1',
        //     "firstName": "John",
        //     "lastName": "Doe",
        //     "checkbox": true,
        // }];
    
        // console.log(mockupData);
        // setAPIData(mockupData);
    }, []);

    const remindCollection = () =>{
        axios.get(`${backendDomain}/api/v1/loanpass/remind/collection`)
            .then((response) => {
                alert("Loanpass collection reminders sent")
                Swal.close();
            })
    }
    
    const remindReturn = () =>{
        axios.get(`${backendDomain}/api/v1/loanpass/remind/return`)
            .then((response) => {
                alert("Loanpass return reminders sent")
                Swal.close();
            })
    }

    const setData = (data) => {
        let { passId, attractionId, passNumber, previousLoanBy, description } = data;
        localStorage.setItem('passId', passId);
        localStorage.setItem('attractionId', attractionId);
        localStorage.setItem('passNumber', passNumber);
        localStorage.setItem('previousLoanBy', previousLoanBy);
        localStorage.setItem('description', description);
    }

    const getData = () => {
        Swal.fire({
            title: 'Loading information from database...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        axios.get(`${backendDomain}/api/v1/loanpass`)
            .then((getData) => {
                setAPIData(getData.data);
                Swal.close();
            })
    }

    const onDelete = (id) => {
        Swal.fire({
            title: 'Loading information from database...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        axios.delete(`${backendDomain}/api/v1/loanpass/${id}`)
        .then(() => {
            getData();
            Swal.close();
        })
    }

    return (
        <div class="container rounded content" style={{ height: "100%", width: "80%" }}>
            {/* button to create loanpass */}
            <Link to="/react/createloanpass">
                <Button primary>Create Loan Pass</Button>
            </Link>
            <Button onClick = {()=>{remindCollection()}}>Send Collection Reminders</Button>
            <Button onClick = {()=>{remindReturn()}}>Send Return Reminders</Button>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>pass<br/>Id</Table.HeaderCell>
                        <Table.HeaderCell width={1}>attraction<br/>Id</Table.HeaderCell>
                        <Table.HeaderCell width={1}>pass<br/>Number</Table.HeaderCell>
                        <Table.HeaderCell width={1}>previous<br/>Loan<br/>By</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Status</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Type</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Replace<br/>ment Fee</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Email Template</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Attachment Link</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Update</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        const descriptionSplitted = data.description.split(",./");
                        const status = descriptionSplitted[0];
                        const type = descriptionSplitted[1];
                        const replacementFee = descriptionSplitted[2];
                        let emailTemplate = descriptionSplitted[3];
                        let attachmentLink = descriptionSplitted[4];

                        try {
                            emailTemplate = emailTemplate.slice(0, 10) + "...";
                            attachmentLink = attachmentLink.slice(0, 10) + "...";
                        } catch (error) {
                            console.log(error);
                        }

                        return (
                            <Table.Row>
                                <Table.Cell>{data.passId}</Table.Cell>
                                <Table.Cell>{data.attractionId}</Table.Cell>
                                <Table.Cell>{data.passNumber}</Table.Cell>
                                <Table.Cell>{data.previousLoanBy}</Table.Cell>
                                <Table.Cell>{status}</Table.Cell>
                                <Table.Cell>{type}</Table.Cell>
                                <Table.Cell>{replacementFee}</Table.Cell>
                                <Table.Cell>{emailTemplate}</Table.Cell>
                                <Table.Cell>{attachmentLink}</Table.Cell>

                                <Link to='/react/update'>
                                    <Table.Cell> 
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.passId)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}