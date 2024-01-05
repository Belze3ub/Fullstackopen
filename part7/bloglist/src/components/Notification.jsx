import { AlertCircle, Check } from 'lucide-react';
import '../styles.css';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const Notification = ({ notification }) => {
  const { content, type } = notification;

  {return type === 'bad' ? (
    <Alert variant="destructive" className="my-2">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{content}</AlertDescription>
    </Alert>
  ) : (
    <Alert className="border-green-600 my-2">
      <Check className="h-4 w-4" color='green' />
      <AlertTitle className="text-green-600">Ok</AlertTitle>
      <AlertDescription className="text-green-600">{content}</AlertDescription>
    </Alert>
  );}
};

export default Notification;
