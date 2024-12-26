import React from 'react';

const IllustrationTable = ({ illustration }) => {
    return (
        <table>
            <thead>
                <tr>
                <th>Year</th>
                <th>Premium</th>
                <th>Bonus Rate</th>
                <th>Bonus Amount</th>
                <th>Total Benefit</th>
                <th>Net Cashflow</th>
                </tr>
            </thead>
            <tbody>
                {illustration.map((row, index) => (
                <tr key={index}>
                    <td>{row.year}</td>
                    <td>{row.premium}</td>
                    <td>{row.bonusRate}%</td>
                    <td>{row.bonusAmount}</td>
                    <td>{row.totalBenefit}</td>
                    <td>{row.netCashflow}</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
};

export default IllustrationTable;
