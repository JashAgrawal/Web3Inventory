import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
const NewInvoice = (props) => {
  const { contract, setLoading } = props;
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const handleChange = (e, feild) => {
    let obj = {};
    obj[feild] = e.target.value;
    setInvoiceDetails({ ...invoiceDetails, ...obj });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const tx = await contract._invoiceCreation(
        invoiceDetails.Buyer_Pan,
        invoiceDetails.Seller_Pan,
        invoiceDetails.Invoice_Amount
      );
      const recipt = await tx.wait();
      const value = recipt?.events[0]?.args[0].toNumber();
      console.log(value);
      setLoading(false);
      alert("Invoice Added :- " + value);
      console.log("/////////////");
    } catch (e) {
      alert("Something Went Wrong");
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className='createInvoiceContainer'>
        <Input
          required
          size='large'
          placeholder='Buyer Pan'
          onChange={(e) => {
            handleChange(e, "Buyer_Pan");
          }}
          className='inputs'
        />
        <Input
          required
          size='large'
          placeholder='Seller Pan'
          onChange={(e) => {
            handleChange(e, "Seller_Pan");
          }}
          className='inputs'
        />
        <Input
          required
          size='large'
          type='Number'
          placeholder='Invoice Amount'
          onChange={(e) => {
            handleChange(e, "Invoice_Amount");
          }}
          className='inputs'
        />
        <Button
          type='primary'
          onClick={() => handleSubmit()}
          className='inputs create-button'
        >
          Add Invoice
        </Button>
      </div>
    </div>
  );
};

export default NewInvoice;
