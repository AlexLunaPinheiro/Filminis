import styles from './MovieSpecs.module.css'

type MovieSpecsProps = {
    ano: number,
    duracaoHoras: number,
    duracaoMinutos : number,
    generos: string[],
    produtora: string
};

function MovieSpecs ({ano, duracaoHoras, duracaoMinutos, generos, produtora}: MovieSpecsProps){
    const listaGeneros = Array.isArray(generos) ? generos : [generos];
    return(
        <p className={styles.specsText}>{ano} | {duracaoHoras} horas e {duracaoMinutos} | {listaGeneros.join(" * ")} | {produtora}</p>
    )
    
}

export default MovieSpecs;