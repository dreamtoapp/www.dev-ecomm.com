'use client';

import { X } from 'lucide-react'; // Updated icon [[10]]
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Deslugify } from '@/utils/slug';

const ClearButton = ({ slugString }: { slugString?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFilters = !!searchParams.toString();
  const filterCount = searchParams.size;

  const handleClear = () => {
    if (hasFilters) {
      router.push(window.location.pathname, { scroll: false }); // Smooth navigation [[5]]
    }
  };

  if (!hasFilters) return null;

  return (
    <Card className="p-3  bg-background border" >
      <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-0" id="filter-display">
        {/* Filter display section */}
        <div className="flex items-center gap-2 flex-wrap" >
          <Badge variant="secondary" className="px-3 py-1">
            {filterCount} فلتر نشط{filterCount > 1 && 'ة'}
          </Badge>
          <span className="text-sm text-muted-foreground truncate max-w-[200px]">
            {Deslugify(slugString || '').replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
          </span>
        </div>

        {/* Clear button with tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClear}
              variant="outline"
              className="group transition-all hover:bg-destructive hover:text-white"
              size="sm"
            >
              <X className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
              <span className="hidden md:inline">مسح جميع الفلاتر</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>إزالة جميع الفلاتر النشطة ({filterCount})</p>
          </TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default ClearButton;