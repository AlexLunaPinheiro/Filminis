import './Topic.module.css'

type TopicProps = {
    text: string
}

function Topic({text}: TopicProps){
    return(
        <h1>
            {text}
        </h1>
    )
}

export default Topic;