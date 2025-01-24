import React, { useState } from 'react';
import FilterableAuditList from './FilterableAuditList';
import CheckListItemDetail from './CheckListItemDetail';
import { Box } from '@mui/material';
import { useJsonData } from '../hooks/useJsonData';
import { CheckListDataItem } from '../Types';
 
const CheckList: React.FC = () => {
    const auditData = normalizeItems(useJsonData<CheckListDataItem>('/lb-audit-demo/data/clist-extension.json'));
    const [selectedItem, setSelectedItem] = useState<CheckListDataItem|null>(null);

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
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
    );
};

function normalizeItems(items: CheckListDataItem[]): CheckListDataItem[] {
    return items.map((item) => {
        const normalizedGlossary = normalizeGlossaryItem(item.glossary);
        const normalizedRelevant_links =  item.relevant_links ? normalizeRelevantLinks(item.relevant_links) : normalizeRelevantLinks(item.related_links);
        return { ...item, glossary: normalizedGlossary, relevant_links: normalizedRelevant_links };
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
            url: (details as any).link || (details as any).url || '',
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
      definition: (details as any).definition || '',
      link: (details as any).link || '',
    }));
  }
 

export default CheckList;
