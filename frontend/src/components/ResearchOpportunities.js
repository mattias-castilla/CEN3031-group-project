import React, { useState } from 'react';
import './ResearchOpportunities.css'; 

const ResearchOpportunities = () => {
  const [selectedTag, setSelectedTag] = useState('');
  const [sortedByDate, setSortedByDate] = useState(false);
  
  
  const opportunities = [
    { title: 'Research Opportunity 1', tags: ['Tag 1', 'Tag 2'], date: '2025-04-20', description: 'Description for research opportunity 1' },
    { title: 'Research Opportunity 2', tags: ['Tag 2', 'Tag 3'], date: '2025-04-19', description: 'Description for research opportunity 2' },
    { title: 'Research Opportunity 3', tags: ['Tag 1', 'Tag 3'], date: '2025-04-18', description: 'Description for research opportunity 3' },
    
  ];

  const handleTagFilterChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const handleSortByDate = () => {
    setSortedByDate(!sortedByDate);
  };

  
  const filteredOpportunities = opportunities.filter(opportunity =>
    selectedTag ? opportunity.tags.includes(selectedTag) : true
  ).sort((a, b) => {
    return sortedByDate ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="research-page">
      <header>
        <div className="logo">AcademiNet</div>
      </header>
      
      <div className="filters">
        <input 
          type="text" 
          placeholder="Filter by tags..." 
          value={selectedTag} 
          onChange={handleTagFilterChange} 
        />
        <button onClick={handleSortByDate}>Sort by Date</button>
      </div>

      <div className="research-list">
        {filteredOpportunities.map((opportunity, index) => (
          <div className="research-item" key={index}>
            <h3>{opportunity.title}</h3>
            <p>{opportunity.description}</p>
            <div className="tags">
              {opportunity.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            <p className="date">{opportunity.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchOpportunities;
