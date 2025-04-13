import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[300px] space-y-6 text-center">
      <h3 className="text-2xl font-semibold text-foreground">
        السلة فارغة حالياً
      </h3>
      <p className="text-md text-muted-foreground">ابدأ التسوق الآن!</p>
      <Button
        className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 ease-out transform hover:scale-105"
        onClick={() => router.push("/")}
      >
        تصفح المنتجات
      </Button>
    </div>
  );
};
export default EmptyCart;