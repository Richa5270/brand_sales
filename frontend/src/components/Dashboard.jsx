import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";

let endpoint = "http://localhost:8082/api/v1/";

const Dashboard = () => {
  const [data, setData] = useState([]);

  //Add Data
  const [brand, setBrand] = useState("");
  const [transaction_Type, setTransaction_Type] = useState("");
  const [total_Orders, setTotal_Orders] = useState("");
  const [total_Order_Value, setTotal_Order_Value] = useState("");
  const [gross_Margin_Percentage, setGross_Margin_Percentage] = useState("");
  const[dateData,setDateDate] = useState("");
  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function getData(){
  const getData = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(endpoint + "brand_sales_daily", config)
      .then((res) => {
        // console.log(res.data.data)
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  // console.log(data);

  // add Brand Sales

  const addBrandSales = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const postData = {
      brand: brand,
      transactionType: transaction_Type,
      totalOrders: total_Orders,
      totalOrderValue: total_Order_Value,
      grossMarginPercentage: gross_Margin_Percentage,
    };

    //console.log(postData,"postData");

    axios
      .post(endpoint + "brand_sales_daily", postData, config)
      .then((res) => {
        console.log(res);
        alert("Recode add sucessfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete Brand Sales

  const deleteBrandSales = (id) => {
    axios
      .delete(endpoint + "brand_sales_daily/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        alert("Recode Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("clecked");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-header" style={{ backgroundColor: "gray" }}>
                <h3>Dashboard</h3>
              </div>
              &nbsp;
              <div className="card-body">
                {/*------------- Date ---------------*/}
                <input type="date" style={{position: "relative", left: "0px",float:"left" ,top: "-30px"}} value ={dateData} 
                onChange={(e)=>
                {console.log(e.target.value) 
                  setDateDate(e.target.value)
                }}/>
                <button
                  style={{
                    float: "right",
                    marginTop: "-30px",
                    backgroundColor: "darkgreen",
                  }}
                  className="btn btn-secondary"
                  onClick={handleShow}
                >
                  + Add Brand Sales
                </button>

                <table className="table table-bordered">
                  <thead style={{ backgroundColor: "gray" }}>
                    <tr>
                      <th>Brand</th>
                      <th>Transaction Type</th>
                      <th>Total Orders</th>
                      <th>Total Order Value</th>
                      <th>Gross Margin Percentage</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.brand}</td>
                          <td>
                            <select
                              class="form-select"
                              aria-label="Disabled select example"
                              // disabled
                            >
                              <option selected>{item.transactionType}</option>
                            </select>
                          </td>
                          <td>{item.totalOrders}</td>
                          <td>{item.totalOrderValue}</td>
                          <td>{item.grossMarginPercentage}</td>
                          <td>
                            <button
                              className="btn btn-white"
                              onClick={() => deleteBrandSales(item._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  style={{ float: "right" }}
                  className="btn btn-secondary"
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
                  {/* -------------------------Model----------------- */}
      <Modal show={show} onHide={handleClose}>  
      <Modal.Header closeButton>
          <Modal.Title>+ Add Brand Sales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Brand"
                autoFocus
                value={brand}
                onChange={(e) => {
                  console.log(e.target.value);
                  setBrand(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Transaction Type</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Transaction Type"
                autoFocus
                value={transaction_Type}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTransaction_Type(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Total Orders</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Total Orders"
                autoFocus
                value={total_Orders}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTotal_Orders(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Total Order Value</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Total Order Value"
                autoFocus
                value={total_Order_Value}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTotal_Order_Value(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Gross Margin Percentage</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Gross Margin Percentage"
                autoFocus
                value={gross_Margin_Percentage}
                onChange={(e) => {
                  console.log(e.target.value);
                  setGross_Margin_Percentage(e.target.value);
                }}
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" 
          onClick={addBrandSales}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  );
};

export default Dashboard;
