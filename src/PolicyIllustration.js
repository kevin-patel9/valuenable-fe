import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IllustrationTable from './IllustrationTable';
import { commonPoint } from './common/ApiCall';
import { useParams } from 'react-router-dom';

const PolicyIllustration = () => {
    const { policyId } = useParams();
    
    const [illustrationData, setIllustrationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIllustration = async () => {
            try {
                const response = await axios.get(`${commonPoint}/api/v1/policy/policies/${policyId}`);
                setIllustrationData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchIllustration();
    }, [policyId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Policy Illustration</h1>
            <h3>Policy Details:</h3>
            <ul>
                <li>Sum Assured: {illustrationData.policy.sumAssured}</li>
                <li>Modal Premium: {illustrationData.policy.modalPremium}</li>
                <li>Policy Term: {illustrationData.policy.pt} years</li>
                <li>Premium Payment Term: {illustrationData.policy.ppt} years</li>
            </ul>
            <h3>Illustration Table:</h3>
            <IllustrationTable illustration={illustrationData.illustration} />
        </div>
    );
};

export default PolicyIllustration;
