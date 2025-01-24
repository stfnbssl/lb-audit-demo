import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { CheckListDataItem } from '../Types';


interface FilterableCheckListItemsProps {
  items: CheckListDataItem[];
  onItemSelect: (item: CheckListDataItem) => void;
}

const FilterableCheckListItems: React.FC<FilterableCheckListItemsProps> = ({ items, onItemSelect }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const categories = ["", ...Array.from(new Set(items.map((item) => item.category)))];
  const areas = ["", ...Array.from(new Set(items.map((item) => item.area)))];
  
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "" || item.category === selectedCategory;
    const matchesArea = selectedArea === "" || item.area === selectedArea;

    return matchesSearch && matchesCategory && matchesArea;
  });

  return (
    <Box sx={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
          padding: 2,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Area</InputLabel>
          <Select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Areas</MenuItem>
            {areas.map((area, index) => (
              <MenuItem key={index} value={area}>
                {area}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <List>
        {filteredItems.map((item) => (
          <ListItem
            key={item.idd}
            onClick={() => {onItemSelect(item); console.log('selected item', item);}}
            sx={{ 
              borderBottom: '1px solid #ddd' ,
              cursor: 'pointer', // Makes the cursor a pointer on hover
              '&:hover': {
                backgroundColor: '#f0f0f0', // Optional hover effect
              },            
            }}
          >
            <ListItemText primary={item.idd} secondary={item.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FilterableCheckListItems;

