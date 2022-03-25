import React, { useState } from "react";
import { Input, Button } from "antd";
const GetPaymentStatus = (props) => {
  const { contract, setLoading, setActive } = props;
  const [invoiceId, setInvoiceId] = useState(0);
  const [invoiceStatus, setInvoiceStatus] = useState(null);
  const handleChange = (e) => {
    setInvoiceId(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await contract.getPaymentStatus(invoiceId);
      console.log(res);
      setInvoiceStatus(res);
      let response =
        "" + (res == "0" ? "PAYMENT IS PENDING" : "PAYMENT IS PAID");
      alert(response);
    } catch (e) {
      alert("Something Went Wrong");
      console.log(e);
    }
    setLoading(false);
    // setActive("2");
  };
  return (
    <div>
      <div className='createInvoiceContainer'>
        <Input
          required
          size='large'
          type='Number'
          placeholder='Invoice Id'
          onChange={(e) => {
            handleChange(e);
          }}
          className='inputs'
        />
        <Button
          type='primary'
          onClick={(e) => handleSubmit(e)}
          className='inputs create-button'
          htmlType='button'
        >
          Get Payment Status
        </Button>
        <h1>{invoiceStatus}</h1>
        {invoiceStatus == 0 && <h1>PAYMENT IS PENDING</h1>}
        {invoiceStatus == 1 && <h1>PAYMENT IS PAID</h1>}
      </div>
    </div>
  );
};

export default GetPaymentStatus;
