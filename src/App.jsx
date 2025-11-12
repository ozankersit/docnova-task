import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import Invoice from "./app/components/Invoice";
import LoginForm from "./app/components/LoginForm";
import InvoiceDetail from "./app/components/InvoiceDetail";
import { useSelector } from "react-redux";

function App() {
  const { jwt } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={!jwt ? <LoginForm /> : <Navigate to="/invoice" replace />} />
      <Route
        path="/invoice"
        element={jwt ? <Invoice /> : <Navigate to="/" replace />}
      />
      <Route
        path="/invoice"
        element={jwt ? <Invoice /> : <Navigate to="/" replace />}
      />
      <Route
        path="/invoice/:id"
        element={jwt ? <InvoiceDetail /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
