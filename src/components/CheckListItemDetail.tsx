import React, { useState } from 'react';
// import axios from 'axios';
import { Modal, Button, Box } from '@mui/material';
import Editor from "@monaco-editor/react";

import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CheckListDataItem } from '../Types';

const referenceProperties = [
  "NIS2",
  "ISA_n_62443_n_(2-4)",
  "REG. MACCHINE",
  "ISO22301",
  "GDPR",
  "EN 303 645",
  "ISO_n_27001",
  "NIST CSF",
  "CSA CAIQ",
  "ISO27017",
  "EuCRA",
  "Exe. Ord. on Improving the Nation’s Cybersecurity",
];

const CheckListItemDetail: React.FC<{ details: CheckListDataItem | null }> = ({ details }) => {
  if (!details) {
    return <Typography variant="h6">Select an item to view details</Typography>;
  }
  const [selectedItem, setSelectedItem] = useState<any | null>({});
  const [editorContent, setEditorContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const references = referenceProperties
  .filter((prop) => details[prop]) // Check if the property exists and is not null/undefined
  .map((prop) => ({ name: prop, value: details[prop] })); // Create an array of references


  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setEditorContent(JSON.stringify(item || {}, null, 2)); // Start with existing or empty JSON
    setIsEditing(true);
  };

  // Handle save
  const handleSave = async () => {
    if (!selectedItem) return;

    try {
      /*
      const updatedItem = {
        ...selectedItem,
        additionalInfo: JSON.parse(editorContent),
      };
      
      const updatedItems = items.map((item) =>
        item.id === selectedItem.id ? updatedItem : item
      );
      // Save updated JSON to the server
      await axios.put(apiEndpoint, updatedItems);
      setItems(updatedItems);
      setIsEditing(false);
      setSelectedItem(null);
      */
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setIsEditing(false);
    setSelectedItem(null);
  };

  return (
    <div>
    <Card sx={{ marginLeft: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{`${details.idd}`}</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {details.area} - {details.category}
        </Typography>
        {/* Render References */}
        {references.length > 0 && (
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              References
            </Typography>
            <ul>
              {references.map((ref, index) => (
                <li key={index}>
                  <strong>{ref.name}:</strong> {ref.value}
                </li>
              ))}
            </ul>
          </Box>
        )}        
        <Typography variant="body2" gutterBottom>
          {details.detailed_explanation}
        </Typography>
        <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(details)}
            >
              JSON
        </Button>
        <Typography variant="h6" gutterBottom>
          Glossary
        </Typography>
        {details.glossary.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{item.term}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.definition}</Typography>
              { item.link && item.link.length > 1 && <a href={item.link} target="_blank" rel="noopener noreferrer">
                Learn more ... 
              </a> }
            </AccordionDetails>
          </Accordion>
        ))}

        <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
          Related Links
        </Typography>
        <ul>
          {details.relevant_links.map((link, index) => (
            <React.Fragment>
            { link.url && link.url.length && <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li> }
            </React.Fragment>
          ))}
        </ul>
      </CardContent>
    </Card>
    <Modal open={isEditing} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Edit Item JSON</h2>
        <Editor
          height="500px"
          language="json"
          value={editorContent}
          onChange={(value) => setEditorContent(value || "")}
        />
        <Box mt={2}>
          {/*
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            sx={{ ml: 2 }}
          >
            Close {/*Cancel*/}
          </Button>
        </Box>
      </Box>
    </Modal>
    </div>
  );
};

export default CheckListItemDetail;
