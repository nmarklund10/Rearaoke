import { useParams } from 'react-router-dom'

function ExamplePage() {
    let { msg } = useParams()
    return (
        <p> Message: {msg} </p>
    );
}

export default ExamplePage;