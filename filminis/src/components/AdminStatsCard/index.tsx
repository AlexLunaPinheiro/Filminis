import styles from './AdminStatsCard.module.css';

type AdminStatsCardProps = {
    title: string;
    count: number | string;
};

function AdminStatsCard({ title, count }: AdminStatsCardProps) {
    return (
        <article className={styles.card}>
            <p>{title}</p>
            <h2>{count}</h2>
        </article>
    );
}

export default AdminStatsCard;