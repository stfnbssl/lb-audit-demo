import React, { useState } from 'react';
import FilterableAuditList from './FilterableAuditList';
import CheckListItemDetail from './CheckListItemDetail';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, DarkMode, LightMode } from '@mui/icons-material';
import { useJsonData } from '../hooks/useJsonData';
import { CheckListDataItem } from '../Types';
 
const CheckList: React.FC<{ onToggleTheme?: () => void; isDarkMode?: boolean }> = ({ onToggleTheme, isDarkMode }) => {
    const auditData = normalizeItems(useJsonData<CheckListDataItem>('/lb-audit-demo/data/clist-extension.json'));
    const [selectedItem, setSelectedItem] = useState<CheckListDataItem|null>(null);

    return (
        <React.Fragment>
        <AppBar position="static" sx={{ backgroundColor: isDarkMode ? '#333' : '#3f51b5' }}>
            <Toolbar>
                {/* Left Menu Icon */}
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
                </IconButton>

                {/* Title */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Audit Checklist
                </Typography>

                {/* Search Bar */}
                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: isDarkMode ? '#555' : '#ffffff',
                    color: isDarkMode ? '#ffffff' : '#333',
                    borderRadius: 1,
                    padding: '0 10px',
                    width: '300px',
                }}
                >
                <SearchIcon />
                <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    sx={{ ml: 1, flex: 1, color: 'inherit' }}
                />
                </Box>

                {/* Theme Switcher */}
                <IconButton color="inherit" onClick={onToggleTheme}>
                {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
            </Toolbar>
        </AppBar>        
        <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'row' }}>
            <Box
                sx={{
                flex: 1,
                overflow: 'auto',
                borderRight: '1px solid #ddd',
                padding: 2,
                }}
            >
                <FilterableAuditList items={auditData} onItemSelect={(item) => setSelectedItem(item)} />
            </Box>
            <Box
                sx={{
                    flex: 2,
                    overflow: 'auto',
                    padding: 2,
                    backgroundColor: '#f9f9f9',
                    }}
                >
                { selectedItem && <CheckListItemDetail details={selectedItem} /> }
                </Box>
        </Box>
        </React.Fragment>
    );
};

function normalizeItems(items: CheckListDataItem[]): CheckListDataItem[] {
    return items.map((item) => {
        let normalizeDetailed_explanation = item.detailed_explanation;
        let normalizedGlossary = [];
        const normalizedRelevant_links =  item.relevant_links ? normalizeRelevantLinks(item.relevant_links) : normalizeRelevantLinks(item.related_links);
        if (item.description_detailed) {
            normalizeDetailed_explanation = item.description_detailed.explanation;
            normalizedGlossary = normalizeGlossaryItem(item.description_detailed.glossary);
        } else {
            normalizedGlossary = normalizeGlossaryItem(item.glossary);
        }
        return { ...item, detailed_explanation: normalizeDetailed_explanation, glossary: normalizedGlossary, relevant_links: normalizedRelevant_links };
      });
}

function normalizeRelevantLinks(relevant_links: any) {
    if (!relevant_links) {
        return [];
    } 
    else if (Array.isArray(relevant_links)) {
        return relevant_links.map((details) => {
            const normalizedTitle =  (details as any).title || (details as any).definition || '';
            const normalizedDefinition =  (details as any).definition || (details as any).description || '';
            const normalizedLink =  (details as any).link || (details as any).url || '';
            return { ...details, title: normalizedTitle, definition: normalizedDefinition, url: normalizedLink };
        });
    } else {
        return Object.entries(relevant_links).map(([title, details]) => ({
            title,
            definition: (details as any).definition || (details as any).description || details || '',
            url: typeof details == 'string' ? details : ((details as any).link || (details as any).url || ''),
        }));
    }
}

function normalizeGlossaryItem(
    glossary: object | { term: string; definition: string; link: string }[]
  ): { term: string; definition: string; link: string }[] {
    if (!glossary) {
        return [];
    } 
    else if (Array.isArray(glossary)) {
      // Already an array, return as is
      return glossary;
    }  
    // Transform object into an array
    return Object.entries(glossary).map(([term, details]) => ({
      term,
      definition: (details as any).definition || details || '',
      link: (details as any).link || '',
    }));
  }
 

export default CheckList;
