import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Read() {
    const backendDomain = process.env.REACT_APP_backendDomain;
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        console.log("hello");
        axios.get(`${backendDomain}/api/v1/loanpass`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
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

    
    

    const setData = (data) => {
        let { passId, attractionId, passNumber, previousLoanBy, description } = data;
        localStorage.setItem('passId', passId);
        localStorage.setItem('attractionId', attractionId);
        localStorage.setItem('passNumber', passNumber);
        localStorage.setItem('previousLoanBy', previousLoanBy);
        localStorage.setItem('description', description);
    }

    const getData = () => {
        axios.get(`${backendDomain}/api/v1/loanpass`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`${backendDomain}/api/v1/loanpass/${id}`)
        .then(() => {
            getData();
        })
    }

    return (
        <div>
            <Table singleLine className='mainreadtable'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>passId</Table.HeaderCell>
                        <Table.HeaderCell>attractionId</Table.HeaderCell>
                        <Table.HeaderCell>passNumber</Table.HeaderCell>
                        <Table.HeaderCell>previousLoanBy</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Replacement Fee</Table.HeaderCell>
                        <Table.HeaderCell>Email Template</Table.HeaderCell>
                        <Table.HeaderCell>Attachment Link</Table.HeaderCell>
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