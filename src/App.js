import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table';

function App() {
  const [tableData, setTableData] = useState([])

  const columns = [
    { title: "Name", field: "name", sorting: false, filtering: false },
    { title: "Username", field: "username", sorting: false, filtering: false },
    { title: "Email", field: "email", filterPlaceholder: "Filter by email" },
    { title: "Phone Number", field: "phone", align: "center", filtering: false },
    { title: "Website", field: "website", sorting: false, filtering: false },
  ]

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(resp => resp.json())
      .then(resp => {
        console.log("Response from json", resp)
        setTableData(resp)
      })
  }, [])

  return (

    <div className="App">
      <h1 align="center">React Website</h1>
      <h4 align="center">Material Table</h4>

      <MaterialTable columns={columns} data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            console.log(newRow)
            setTableData([...tableData, newRow])
            setTimeout(() => resolve(), 500)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData[oldRow.tableData.id] = newRow
            setTableData(updatedData)
            setTimeout(() => resolve(), 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData.splice(selectedRow.tableData.id, 1)
            setTableData(updatedData)
            setTimeout(() => resolve())
          })
        }}

        options={{
          sorting: true, search: true,
          searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
          filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 15, 20], pageSize: 2, paginationType: "stepped",
          showFirstLastPageButtons: false, paginationPosition: "bottom", exportButton: true, exportAllData: true,
          exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1
        }}
        title="Student Information" />

    </div>
  );
}

export default App;
