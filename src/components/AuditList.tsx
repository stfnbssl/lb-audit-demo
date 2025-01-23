import React from 'react';
import { useJsonData } from '../hooks/useJsonData';

interface AuditItem {
  idd: string;
  area: string;
  category: string;
  description: string;
}

const AuditList: React.FC = () => {
  const auditData = useJsonData<AuditItem>('/data/clist-extension.json');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Audit Checklist</h1>
      <ul className="space-y-4">
        {auditData.map((item) => (
          <li key={item.idd} className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{item.idd} - {item.area}</h2>
            <p className="text-gray-600"><strong>Category:</strong> {item.category}</p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditList;
