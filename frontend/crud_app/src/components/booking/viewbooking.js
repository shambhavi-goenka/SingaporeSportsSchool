import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { addDays } from "date-fns";
import axios from "axios";
import Calendar from "moedim";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const backendDomain = process.env.REACT_APP_backendDomain;


var options = [];

Swal.fire({
  title: "Loading information from database...",
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();
  },
});
// get options from backend axios call
axios.get(`${backendDomain}/api/v1/attractions`).then((res) => {
  Swal.close();
  options = [];

  console.log(res.data);
  res.data.forEach((attraction) => {
    options.push({ value: attraction.attractionID, label: attraction.name });
  });

  console.log(options);
});

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
  control: (provided) => ({
    ...provided,
    color: "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
};

export default function ViewBooking() {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth, auth } = useAuth();
  console.log(auth.id, "AUTH ID :D");

  // state for attraction
  const [attraction, setAttraction] = useState();

  const SelectAttractionComponent = () => (
    <Select
      placeholder="Loading options from backend.. please wait"
      styles={customStyles}
      options={options}
      defaultValue={[options[0]]}
      value={attraction}
      onChange={(d) => onAttractionChange(d)}
    />
  );

  const [value, setValue] = useState(addDays(new Date(), 1));

  const [waitList, setWaitList] = useState("click on a date to view waitlist");

  const [waitListArray, setWaitListArray] = useState([]);

  const onAttractionChange = (e) => {
    setAttraction(e);
    onDateChange(value, e);
  };

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

    Swal.fire({
      title: "Loading information from database...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .get(`${backendDomain}/api/v1/bookingdate/${myDate}`)
      .then((response) => {
        Swal.close();
        console.log(response.data);
        setWaitList(response.data.waitingList);

        let tempwaitingList = response.data.waitingList;
        setWaitListArray(tempwaitingList.split(","));
      })
      .catch((error) => {
        setWaitList("no bookings");
        setWaitListArray([]);
      });
  };

  useEffect(() => {
    // Update the document title using the browser API
    console.log("useEffect only once!");
    onDateChange(value, attraction);
  }, [""]);

  return (
    <div
      class="container rounded content"
      style={{
        width: "85%",
        height: "100%",
        maxWidth: "1000px",
        minWidth: "300px",
      }}
    >
      <h1 class="main-header">View Booking</h1>
      <div class="row">
        <div class="col-sm">
          <div class="card" style={{ width: "17rem", height: "45vh" }}>
            <h1 class="sub-header">Place:</h1>
            <SelectAttractionComponent />
            <br />
            <Calendar
              value={value}
              onChange={(d) => onDateChange(d, attraction)}
            />
          </div>
        </div>
        <div class="col-sm">
          <div class="card" style={{ width: "17rem", height: "45vh" }}>
            <h1 class="sub-header">Waiting list:</h1>
            <p>{waitList}</p>
            {waitListArray.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    // send axios get to get user details

                    Swal.fire({
                      title: "Loading information from database...",
                      allowOutsideClick: false,
                      didOpen: () => {
                        Swal.showLoading();
                      },
                    });

                    axios
                      .get(`${backendDomain}/api/v1/usersById/${item}`)
                      .then((response) => {
                        Swal.close();
                        console.log(response.data);
                        var output = "";
                        for (var entry in response.data) {
                          output += entry + " | " + response.data[entry] + "\n";
                        }
                        alert(output);
                      })
                      .catch((error) => {
                        Swal.close();
                        alert("Cannot find user details");
                      });

                    // alert("Userid "+ item + " details\nname:\ncontact:\nemail:\n");
                  }}
                >
                  {item}
                </button>
                <button
                  onClick={() => {
                    const day = value.getDate();
                    const month = value.getMonth() + 1;
                    const year = value.getFullYear();

                    //get current date
                    const today = new Date();

                    // get difference between current date and selected date
                    const diffTime = (value - today) / 60 / 60 / 24 / 1000;
                    console.log(diffTime);

                    if (diffTime <= 0) {
                      alert("Cannot cancel booking for today or past days");
                      return;
                    }

                    let userlogin = JSON.parse(localStorage.getItem("auth"))["id"]

                    if (userlogin != item) {
                      alert("Please login as the user to cancel the booking");
                      return;
                    }

                    let removeUser = window.confirm(
                      "Are you sure you want to remove user " +
                        item +
                        " from the waiting list?"
                    );
                    // send axios to remove user from waiting list
                    if (removeUser) {
                      let attractionId = 1;
                      try {
                        attractionId = attraction.value;
                      } catch (error) {}
                      const myDate = `${attractionId},${day},${month},${year}`;

                      console.log(myDate);
                      console.log(waitList);
                      let newWaitingList = waitList.replaceAll("," + item, "");
                      newWaitingList = newWaitingList.replaceAll(
                        item + ",",
                        ""
                      );
                      newWaitingList = newWaitingList.replaceAll(item, "");

                      console.log(newWaitingList);

                      Swal.fire({
                        title: "Loading information from database...",
                        allowOutsideClick: false,
                        didOpen: () => {
                          Swal.showLoading();
                        },
                      });

                      if (newWaitingList === "") {
                        axios
                          .delete(
                            `${backendDomain}/api/v1/bookingdate/${myDate}`
                          )
                          .then((response) => {
                            Swal.close();
                            console.log(response.data);
                            setWaitList("no bookings");
                            setWaitListArray([]);
                            // get all successloan on the date
                            axios
                              .get(
                                `${backendDomain}/api/v1/successloan/staff/${item}/attraction/${attractionId}/month/${month}/year/${year}/day/${day}`
                              )
                              .then((response) => {
                                console.log(response.data);
                                for (let i = 0; i < response.data.length; i++) {
                                  const successLoan = response.data[i];
                                  // delete successloan
                                  axios.delete(
                                    `${backendDomain}/api/v1/successloan/${successLoan.successLoanId}`
                                  );
                                  alert("deleted successloan");
                                }
                              });
                          });
                      } else {
                        Swal.fire({
                          title: "Loading information from database...",
                          allowOutsideClick: false,
                          didOpen: () => {
                            Swal.showLoading();
                          },
                        });

                        axios
                          .put(
                            `${backendDomain}/api/v1/bookingdate/${myDate}?waitingList=${newWaitingList}`,
                            null
                          )
                          .then((response) => {
                            Swal.close();
                            setWaitList(newWaitingList);
                            setWaitListArray(newWaitingList.split(","));
                            alert(
                              "User " + item + " removed from waiting list"
                            );

                            // get all successloan on the date
                            axios
                              .get(
                                `${backendDomain}/api/v1/successloan/staff/${item}/attraction/${attractionId}/month/${month}/year/${year}/day/${day}`
                              )
                              .then((response) => {
                                for (let i = 0; i < response.data.length; i++) {
                                  const successLoan = response.data[i];
                                  // delete successloan
                                  axios.delete(
                                    `${backendDomain}/api/v1/successloan/${successLoan.id}`
                                  );
                                  alert("deleted successloan");
                                }
                              });
                          });
                      }
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
