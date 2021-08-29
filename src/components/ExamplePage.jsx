import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';

export default function ExamplePage() {
  let { msg } = useParams()
  return (
    <Card>
      Message: {msg}
    </Card>
  );
}
