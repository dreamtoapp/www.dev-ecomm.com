import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

export default function EmptyBox({ title, description }: { title: string; description: string }) {
  return (
    <Alert variant="default" className="text-center w-full">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}