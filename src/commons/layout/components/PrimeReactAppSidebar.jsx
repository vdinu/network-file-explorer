import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function PrimeReactAppSidebar() {
  const [visible, setVisible] = React.useState(false);

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Button icon="pi pi-bars" onClick={toggleSidebar} />
      <Sidebar visible={visible} onHide={toggleSidebar}>
        <Accordion multiple>
          <AccordionTab header="About" leftIcon={<FontAwesomeIcon icon={faInfoCircle} />}>
            <p>
              This is the About section. It contains some text about the application.
            </p>
          </AccordionTab>
        </Accordion>
      </Sidebar>
    </div>
  );
};

export { PrimeReactAppSidebar };