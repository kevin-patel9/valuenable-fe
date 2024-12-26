import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PolicyForm from './PolicyForm';
import PolicyIllustration from './PolicyIllustration';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PolicyForm />} />
                <Route path="/illustration/:policyId" element={<PolicyIllustration />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
