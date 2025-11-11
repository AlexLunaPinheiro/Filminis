import PageTemplate from '../../components/LoginPageTemplate';
import RegistrationForm from '../../components/LoginForm';
import Navbar from '../../components/NavBar';

function LoginPage() {
  return (
    <>
      <Navbar />
      <PageTemplate>
        <RegistrationForm />
      </PageTemplate>
    </>
  );
};

export default LoginPage;
