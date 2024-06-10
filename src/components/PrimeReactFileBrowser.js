import React, { useState, useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function PrimeReactFileBrowser() {  
  const [files, setFiles] = useState({files: []});

  useEffect(() => {
    fetch("http://localhost:3000/api/files/d/")
      .then(response => response.json())
      .then(data => {
        console.log({files: data});
        return setFiles({files: data});
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const fileTypeIconTemplate = (rowData) => {
    return (
      <span className="p-column-title">
        {rowData.isDirectory ? <i className="pi pi-folder"></i> : <i className="pi pi-file"></i>}
      </span>
    );
  }

  return (
    <DataTable value={files.files} tableStyle={{ minWidth: '50rem' }}>
      <Column body={fileTypeIconTemplate} header="Dir"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="size" header="Size"></Column>
      <Column field="createdTime" header="Created time"></Column>
      <Column field="updatedTime" header="Updated time"></Column>
    </DataTable>
  );
}

export default PrimeReactFileBrowser;