import React from 'react';
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CheckListDataItem } from '../Types';

const CheckListItemDetail: React.FC<{ details: CheckListDataItem | null }> = ({ details }) => {
  if (!details) {
    return <Typography variant="h6">Select an item to view details</Typography>;
  }

  return (
    <Card sx={{ marginLeft: 2, padding: 2, maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{`${details.idd}`}</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {details.area} - {details.category}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {details.detailed_explanation}
        </Typography>

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
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Learn more
              </a>
            </AccordionDetails>
          </Accordion>
        ))}

        <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
          Related Links
        </Typography>
        <ul>
          {details.relevant_links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CheckListItemDetail;
