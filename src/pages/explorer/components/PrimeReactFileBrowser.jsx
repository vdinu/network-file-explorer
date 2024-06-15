import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";

import { addSegment, removeSegment, isRoot } from '../../../commons/url.utils';

function PrimeReactFileBrowser() {  
  const [files, setFiles] = useState({files: []});
  const location = useLocation();

  useEffect(() => {
    fetch(`/api/files${location.pathname}`)
      .then(response => response.json())
      .then(data => {
        return setFiles({files: data});
      })
      .catch(error => console.error('Error:', error));
  }, [location]);

  const fileTypeIconTemplate = (rowData) => {
    return (
      rowData.isDirectory ?
      <FontAwesomeIcon icon={faFolder} /> :
      <FontAwesomeIcon icon={faFile} />
    );
  }

  const fileNameTemplate = (rowData) => {
    return (
      rowData.isDirectory ?
          <Link to={addSegment(location.pathname, rowData.name)}>{rowData.name}</Link> :
          rowData.name
    );
  }

  return (
    <div>
      {isRoot(location.pathname) ? '' : <Link to={removeSegment(location.pathname)}>..</Link>}
      <DataTable value={files.files} tableStyle={{ minWidth: '50rem' }}>
        <Column body={fileTypeIconTemplate} header="Dir"></Column>
        <Column body={fileNameTemplate} header="Name"></Column>
        <Column field="size" header="Size"></Column>
        <Column field="createdTime" header="Created time"></Column>
        <Column field="updatedTime" header="Updated time"></Column>
      </DataTable>
    </div>
  );
}

export { PrimeReactFileBrowser };