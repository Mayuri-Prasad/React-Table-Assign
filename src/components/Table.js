import React, { useState } from 'react';
import './Table.css'; // Import the CSS styles

const Table = () => {
    const [rows, setRows] = useState([{ id: Date.now(), column1: '', column2: [] }]);
    const [dropdown1Options] = useState(['Option 1', 'Option 2', 'Option 3']); // Removed setDropdown1Options
    const [dropdown2Options, setDropdown2Options] = useState(['Option A', 'Option B', 'Option C']);
    
    const handleAddRow = () => {
        setRows([...rows, { id: Date.now(), column1: '', column2: [] }]);
    };

    const handleColumn1Change = (id, value) => {
        setRows(rows.map(row => row.id === id ? { ...row, column1: value } : row));
    };

    const handleColumn2Change = (id, value) => {
        setRows(rows.map(row => row.id === id ? { ...row, column2: value } : row));
    };

    const handleAddDropdown2Option = (id, newOption) => {
        setDropdown2Options([...dropdown2Options, newOption]);
        handleColumn2Change(id, [...rows.find(row => row.id === id).column2, newOption]);
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Label 1</th>
                        <th>Label 2</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.id}>
                            <td>
                                <select value={row.column1} onChange={(e) => handleColumn1Change(row.id, e.target.value)}>
                                    <option value="" disabled>Select an option</option>
                                    {dropdown1Options.filter(option => !rows.some(r => r.column1 === option)).map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select multiple value={row.column2} onChange={(e) => handleColumn2Change(row.id, Array.from(e.target.selectedOptions, option => option.value))}>
                                    {dropdown2Options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                    <option value="" disabled>Add new option</option>
                                    <input type="text" onBlur={(e) => handleAddDropdown2Option(row.id, e.target.value)} placeholder="New option" />
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-row-button" onClick={handleAddRow}>Add new Row</button>
        </div>
    );
};

export default Table;
