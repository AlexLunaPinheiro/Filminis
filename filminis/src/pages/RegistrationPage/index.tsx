import PageTemplate from '../../components/LoginPageTemplate';
import RegistrationForm from '../../components/RegistrationForm';
import Navbar from '../../components/NavBar';

function RegistrationPage() {
  return (
    <>
      <Navbar />
      <PageTemplate>
        <RegistrationForm />
      </PageTemplate>
    </>
  );
};

export default RegistrationPage;
