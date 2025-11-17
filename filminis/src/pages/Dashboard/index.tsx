import React from 'react';
import { useAuth } from '../../context/auth_context';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';

// 1. IMPORTE OS NOVOS COMPONENTES
import AdminStatsCard from '../../components/AdminStatsCard';
import AdminRequestTable from '../../components/AdminRequestTable';

function Dashboard() {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // 2. Mock data para os Stats (vamos conectar ao backend depois)
    const stats = {
        edicao: 55,
        criacao: 32,
        cadastrados: 32,
        aberto: 87
    };

    // Proteção da Rota: Se não for admin, volta para a Home
    React.useEffect(() => {
        if (!isLoggedIn) {
             navigate('/login');
        } else if (user && user.role !== 'ADMIN') {
            navigate('/'); // Redireciona usuários comuns para a Home
        }
    }, [user, isLoggedIn, navigate]);

    // Se ainda estiver carregando ou se não for admin
    if (!user || user.role !== 'ADMIN') {
        return (
            <div className={styles.dashboardContainer}>
                <Navbar variant="solid" />
                <main className={styles.dashboardMain}>
                    <p>Carregando ou acesso negado...</p>
                </main>
                <Footer variant='min' />
            </div>
        );
    }

    // Se for Admin
    return (
        <div className={styles.dashboardContainer}>
            <Navbar variant="solid" /> 
            
            <main className={styles.dashboardMain}>
                
                <div className={styles.statsGrid}>
                   <AdminStatsCard title="Solicitações de edição" count={stats.edicao} />
                   <AdminStatsCard title="Solicitações de criação" count={stats.criacao} />
                   <AdminStatsCard title="Filmes cadastrados" count={stats.cadastrados} />
                   <AdminStatsCard title="Solicitações em aberto" count={stats.aberto} />
                </div>

                <section className={styles.requestSection}>
                    <AdminRequestTable />
                </section>

            </main>
            <Footer variant='min' />
        </div>
    );
}

export default Dashboard;