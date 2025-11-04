import React from 'react';
import PageTemplate from '../../components/LoginPageTemplate';
import RegistrationForm from '../../components/RegistrationForm';

const RegistrationPage: React.FC = () => {
  return (
    <PageTemplate>
      <RegistrationForm />
    </PageTemplate>
  );
};

export default RegistrationPage;