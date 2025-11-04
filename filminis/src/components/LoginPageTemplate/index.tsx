import React from 'react';
import './LoginPageTemplate.css';

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  return <div className="page-wrapper">{children}</div>;
};

export default PageTemplate;