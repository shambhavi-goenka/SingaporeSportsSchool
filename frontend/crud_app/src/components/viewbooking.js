import React, { useState , useEffect} from 'react';
import Select from 'react-select'
import DatePicker from 'react-date-picker';
import { addDays } from 'date-fns';
import axios from 'axios';
import Calendar from 'moedim';
const backendDomain = process.env.REACT_APP_backendDomain;


var options = [];

// get options from backend axios call
axios.get(`${backendDomain}/api/v1/attractions`)
    .then(res => {
        options = [];

        console.log(res.data);
        res.data.forEach(attraction => {
            options.push({ value: attraction.attractionID, label: attraction.name });
        }
        )

        console.log(options);
    });

const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black'
    })
}



export default function ViewBooking() {



    // state for attraction
    const [attraction, setAttraction] = useState();

    const SelectAttractionComponent = () => (
        <Select styles={customStyles} options={options} defaultValue={[options[0]]} value={attraction} onChange={(d) => onAttractionChange(d)} />
      )



    const [value, setValue] = useState(addDays(new Date(), 1));

    const [waitList, setWaitList] = useState("click on a date to view waitlist");

    const onAttractionChange = (e) => {
        setAttraction(e);
        onDateChange(value, e);
    }


    const onDateChange = (date, newAttraction) => {
        setValue(date);
        setAttraction(newAttraction);
        setWaitList("loading...");
        
        console.log(date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let attractionId = 1;
        try {
            attractionId = newAttraction.value;
        } catch (error) {
            attractionId = 1;
        }

        console.log(newAttraction);

        const myDate = `${attractionId},${day},${month},${year}`;
        

        axios.get(`${backendDomain}/api/v1/bookingdate/${myDate}`)
        .then((response) => {
            console.log(response.data);
            setWaitList(response.data.waitingList);
        }
        )
        .catch((error) => {
            setWaitList("no bookings");
        })
    }
    
    useEffect(() => {
        // Update the document title using the browser API
        console.log("useEffect only once!");
        onDateChange(value, attraction);
    }, [""]);


    return (
        <div>
        <h1>Place:</h1>
        <SelectAttractionComponent />
        <br/>
        <Calendar value={value} onChange={(d) => onDateChange(d, attraction)} />
        <h1>Waiting list:</h1>
        {waitList}
        </div>
    )
  
    
}