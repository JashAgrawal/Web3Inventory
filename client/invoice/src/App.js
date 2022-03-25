import "./App.css";
import { useEffect, useState } from "react";
import { loadContract } from "./Helpers/Index";
import Tab from "./Tab.js";
function App() {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadContract().then((res) => {
      setContract(res);
    });
  }, []);
  return (
    <div className='App'>
      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <Tab contract={contract} setLoading={setLoading} />
      )}
    </div>
  );
}

export default App;
// <Router>
//   <Tab />
//   <Routes>
//     <Route
//       exact
//       path='/'
//       element={
//         <NewInvoice contract={contract} setLoading={setLoading} />
//       }
//     />
//     <Route
//       path='2'
//       element={
//         <GetPaymentStatus contract={contract} setLoading={setLoading} />
//       }
//     />
//     <Route
//       path='3'
//       element={
//         <InvoicesByPan contract={contract} setLoading={setLoading} />
//       }
//     />
//   </Routes>
// </Router>
