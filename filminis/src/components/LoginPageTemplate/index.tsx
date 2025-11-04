import React from 'react';
import './LoginPageTemplate.css';

interface PageTemplateProps {
  children: React.ReactNode;
}

function PageTemplate ({ children }: PageTemplateProps){
  return (
    <>
      <div className="page-wrapper">{children}</div>
    </>
  )
};

export default PageTemplate;