import { useState } from "react";
// import { Link } from "react-router-dom";
import NewInvoice from "./NewInvoice";
import GetPaymentStatus from "./getPaymentDetails";
import InvoicesByPan from "./InvoicesByPan";
const HomeTabs = (props) => {
  const [active, setActive] = useState(1);
  function callback(key) {
    console.log(key);
    setActive(key);
  }
  return (
    <div>
      <div className='Tab-Container'>
        <h1
          onClick={() => setActive(1)}
          className={`tabs ${active == 1 && "active"}`}
        >
          Create An Invoice
        </h1>
        <h1
          onClick={() => setActive(2)}
          className={`tabs ${active == 2 && "active"}`}
        >
          Get Payment Details
        </h1>
        <h1
          onClick={() => setActive(3)}
          className={`tabs ${active == 3 && "active"}`}
        >
          Filter Invoces By Pan
        </h1>
      </div>

      {active == 1 && (
        <NewInvoice contract={props.contract} setLoading={props.setLoading} />
      )}
      {active == 2 && (
        <GetPaymentStatus
          contract={props.contract}
          setLoading={props.setLoading}
        />
      )}
      {active == 3 && (
        <InvoicesByPan
          contract={props.contract}
          setLoading={props.setLoading}
        />
      )}
    </div>
  );
};
export default HomeTabs;
