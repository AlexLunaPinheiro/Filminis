import Styles from './Topic.module.css'

type TopicProps = {
    text: string
}

function Topic({text}: TopicProps){
    return(
        <h1 className={Styles.topic}>
            {text}
        </h1>
    )
}

export default Topic;