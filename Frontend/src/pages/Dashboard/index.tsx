import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth_context';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import AdminStatsCard from '../../components/AdminStatsCard';
import AdminRequestTable from '../../components/AdminRequestTable';

import { 
    getAdminDashboardStats, 
    getAdminSolicitacoes 
} from '../../services/interceptors/admin_interceptor';
import type { 
    StatsDashboard, 
    SolicitacaoAdmin 
} from '../../services/interceptors/admin_interceptor';


function Dashboard() {
    const { user, isLoggedIn, isLoading } = useAuth(); 
    const navigate = useNavigate();

    const [stats, setStats] = useState<StatsDashboard | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);

    const [requests, setRequests] = useState<SolicitacaoAdmin[]>([]);
    const [loadingRequests, setLoadingRequests] = useState(true);

    // Extrai a função 'loadRequests' para fora do useEffect
    const loadRequests = async () => {
        try {
            setLoadingRequests(true);
            const data = await getAdminSolicitacoes();
            setRequests(data);
        } catch (error) {
            console.error("Erro ao buscar solicitações:", error);
        } finally {
            setLoadingRequests(false);
        }
    };

    // Proteção da Rota 
    useEffect(() => {
        if (isLoading) return; // Espera o AuthContext
        
        if (!isLoggedIn) {
             navigate('/login');
        } else if (user && user.role !== 'ADMIN') {
            navigate('/'); 
        }
    }, [user, isLoggedIn, isLoading, navigate]);

    // useEffect para buscar os dados
    useEffect(() => {
        if (isLoggedIn && user?.role === 'ADMIN') {
            
            async function loadStats() {
                try {
                    setLoadingStats(true);
                    const data = await getAdminDashboardStats();
                    setStats(data);
                } catch (error) {
                    console.error("Erro ao buscar estatísticas:", error);
                } finally {
                    setLoadingStats(false);
                }
            }
            
            loadStats();
            loadRequests(); 
        }
    }, [isLoggedIn, user]); 

    // render de loading/acesso negado
    if (isLoading || !user) {
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

    return (
        <div className={styles.dashboardContainer}>
            <Navbar variant="solid" /> 
            
            <main className={styles.dashboardMain}>
                
                <div className={styles.statsGrid}>
                   <AdminStatsCard 
                        title="Solicitações de edição" 
                        count={loadingStats ? '...' : (stats?.edicao ?? 0)} 
                    />
                   <AdminStatsCard 
                        title="Solicitações de criação" 
                        count={loadingStats ? '...' : (stats?.criacao ?? 0)} 
                    />
                   <AdminStatsCard 
                        title="Filmes cadastrados" 
                        count={loadingStats ? '...' : (stats?.cadastrados ?? 0)} 
                    />
                   <AdminStatsCard 
                        title="Solicitações em aberto" 
                        count={loadingStats ? '...' : (stats?.aberto ?? 0)} 
                    />
                </div>

                <section className={styles.requestSection}>
                    <AdminRequestTable 
                        requests={requests}
                        loading={loadingRequests}
                        onRefresh={loadRequests} // Passe a função de refresh
                    />
                </section>

            </main>
            <Footer variant='min' />
        </div>
    );
}

export default Dashboard;