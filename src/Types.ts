export interface GlossaryItem {
    term: string;
    definition: string;
    link: string;
}
  
export interface RelevantLink {
    title: string;
    description: string;
    url: string;
}
 
export interface CheckListDataItem {
    idd: string;
    area: string;
    category: string;
    description: string;
    detailed_explanation: string;
    glossary: GlossaryItem[];
    relevant_links: RelevantLink[];
    related_links: any;
}  
