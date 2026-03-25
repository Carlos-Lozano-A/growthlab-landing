import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Toaster } from "sonner";

function App() {
    return (
        <div className="App">
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
        </div>
    );
    }

export default App;
