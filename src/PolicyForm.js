import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { commonPoint } from './common/ApiCall';
import { useNavigate } from 'react-router-dom';

const PolicyForm = () => {
  const [formData, setFormData] = useState({
    dob: '',
    gender: 'M',
    sumAssured: '',
    modalPremium: '',
    premiumFrequency: 'Yearly',
    pt: '',
    ppt: '',
  });
  const [policyUserList, setPolicyUserList] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const dob = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const modalPremium = parseInt(formData.modalPremium, 10);
    const pt = parseInt(formData.pt, 10);
    const ppt = parseInt(formData.ppt, 10);

    if (ppt < 5 || ppt > 10) {
      return setError('PPT must be between 5 and 10 years.');
    }
    if (pt < 10 || pt > 20) {
      return setError('PT must be between 10 and 20 years.');
    }
    if (modalPremium < 10000 || modalPremium > 50000) {
      return setError('Premium must be between 10,000 and 50,000.');
    }
    if (pt <= ppt) {
      return setError('PT must be greater than PPT.');
    }
    if (!['Yearly', 'Half-Yearly', 'Monthly'].includes(formData.premiumFrequency)) {
      return setError('Invalid premium frequency selected.');
    }
    if (age < 23 || age > 56) {
      return setError('Age must be between 23 and 56.');
    }
    try {
      await axios.post(`${commonPoint}/api/v1/policy/policies`, formData);
      getUserPolicyList();
    } catch (error) {
      console.error('Error submitting policy:', error);
    }
  };

  const getUserPolicyList = async () => {
    try {
      const response = await axios.get(`${commonPoint}/api/v1/policy/policyUserList`);
      setPolicyUserList(response?.data?.policyDetails || []);
    } catch (error) {
      console.error('Error fetching policy user list:', error);
    }
  };

  useEffect(() => {
    getUserPolicyList();
  }, []);

  const navigate = useNavigate();

  const navigateToPolicyDetail = (policyId) => {
    navigate(`/illustration/${policyId}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input style={{ height: 40 }}  type="date" name="dob" onChange={handleChange} required />
        <select style={{ height: 46 }}  name="gender" onChange={handleChange}>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <input style={{ height: 40 }} type="number" name="sumAssured" onChange={handleChange} required placeholder="Sum Assured" />
        <input style={{ height: 40 }}  type="number" name="modalPremium" onChange={handleChange} required placeholder="Modal Premium" />
        <select style={{ height: 46 }}  name="premiumFrequency" onChange={handleChange}>
          <option value="Yearly">Yearly</option>
          <option value="Half-Yearly">Half-Yearly</option>
          <option value="Monthly">Monthly</option>
        </select>
        <input style={{ height: 40 }}  type="number" name="pt" onChange={handleChange} required placeholder="Policy Term (PT)" />
        <input style={{ height: 40 }}  type="number" name="ppt" onChange={handleChange} required placeholder="Premium Payment Term (PPT)" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button style={{ height: 40 }}  type="submit">Submit</button>
      </form>

      <h2>Policy User List</h2>
      {policyUserList.length > 0 ? (
        <table border="1" style={{ width: '80%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Sum Assured</th>
              <th>Modal Premium</th>
              <th>Premium Frequency</th>
              <th>PT</th>
              <th>PPT</th>
            </tr>
          </thead>
          <tbody>
            {policyUserList?.map((item, index) => (
              <tr
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => navigateToPolicyDetail(item._id)}
                key={index}
              >
                <td>{index + 1}</td>
                <td>{item.dob}</td>
                <td>{item.gender}</td>
                <td>{item.sumAssured}</td>
                <td>{item.modalPremium}</td>
                <td>{item.premiumFrequency}</td>
                <td>{item.pt}</td>
                <td>{item.ppt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No policies found.</p>
      )}
    </>
  );
};

export default PolicyForm;