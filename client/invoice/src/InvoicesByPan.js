import React, { useState } from "react";
import { Input, Button } from "antd";
const InvoicesByPan = (props) => {
  const { contract, setLoading, setActive } = props;
  const [buyerPan, setbuyerPan] = useState(0);
  const [invoice, setInvoice] = useState(null);
  const handleChange = (e) => {
    setbuyerPan(e.target.value);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      let res = await contract.getInvoicesByPan(buyerPan);
      console.log(res);
      alert(res);
      setInvoice(res);
    } catch (e) {
      alert("Something Went Wrong");
      console.log(e);
    }
    setLoading(false);
    setActive("2");
  };
  return (
    <div>
      <div className='createInvoiceContainer'>
        <Input
          required
          size='large'
          placeholder='Buyer Pan'
          onChange={(e) => {
            handleChange(e);
          }}
          className='inputs'
        />
        <Button
          type='primary'
          onClick={(e) => handleSubmit(e)}
          className='inputs create-button'
        >
          Get Payment Status
        </Button>
      </div>
    </div>
  );
};

export default InvoicesByPan;
