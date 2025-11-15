import styles from './RequestsTable.module.css';
import Chips from '../Chips';

type RequestData = {
    id: number;
    data: string;
    filme: string;
    tipo: string;
    status: 'Aprovado' | 'Reprovado' | 'Em análise';
};

const mockRequests: RequestData[] = [
    { id: 1, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', status: 'Reprovado' },
    { id: 2, data: '27/11/2006', filme: 'A origem', tipo: 'Adição', status: 'Aprovado' },
    { id: 3, data: '27/11/2006', filme: 'Interestelar', tipo: 'Edição', status: 'Em análise' },
    { id: 4, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', status: 'Reprovado' },
    { id: 5, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', status: 'Em análise' },
    { id: 6, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', status: 'Reprovado' },
    { id: 7, data: '27/11/2006', filme: 'A origem', tipo: 'Adição', status: 'Aprovado' },
    { id: 1, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', status: 'Reprovado' },
    { id: 2, data: '27/11/2006', filme: 'A origem', tipo: 'Adição', status: 'Aprovado' },
    { id: 3, data: '27/11/2006', filme: 'Interestelar', tipo: 'Edição', status: 'Em análise' },
    { id: 4, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', status: 'Reprovado' },
    { id: 5, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', status: 'Em análise' },
    { id: 6, data: '27/11/2006', filme: 'A origem', tipo: 'Edição', status: 'Reprovado' },
    { id: 7, data: '27/11/2006', filme: 'A origem', tipo: 'Adição', status: 'Aprovado' },
];

const statusMap = {
    'Aprovado': 'approved',
    'Reprovado': 'disapproved',
    'Em análise': 'waiting',
};

function RequestsTable() {
    return (
        <div className={styles.tableBorderWrapper}>

            <div className={styles.tableScrollContainer}>

                <table className={styles.table}>
                    <thead>
                        <tr className={styles.headRow}>
                            <th className={styles.th}>Data</th>
                            <th className={styles.th}>Filme</th>
                            <th className={styles.th}>Tipo</th>
                            <th className={styles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockRequests.map((request, index) => ( 
                            <tr key={`${request.id}-${index}`} className={styles.dataRow}>
                                <td className={styles.td}>{request.data}</td>
                                <td className={styles.td}>{request.filme}</td>
                                <td className={styles.td}>{request.tipo}</td>
                                <td className={styles.td}>
                                    <Chips 
                                        text={request.status}
                                        // @ts-ignore
                                        variant={statusMap[request.status]}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            
            </div>
        </div>
    );
}

export default RequestsTable;
