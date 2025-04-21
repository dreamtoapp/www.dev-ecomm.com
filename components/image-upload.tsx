import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  ImageOff,
  RefreshCcw,
  Trash2,
  UploadCloud,
  ZoomIn,
} from 'lucide-react';
import Image from 'next/image';
import type { Accept } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import fallbackImage from '@/public/fallback/fallback.webp';

interface ImageUploadProps {
  initialImage?: string | null;
  onImageUpload: (file: File | null) => void;
  aspectRatio?: number;
  maxSizeMB?: number;
  allowedTypes?: string[];
  minDimensions?: { width: number; height: number };
  disabled?: boolean;
  className?: string;
  uploadLabel?: string;
  previewType?: 'cover' | 'contain';
  quality?: number;
  alt?: string;
  priority?: boolean;
  error?: string | null;
  name?: string;
  showInstruction?: boolean;
}

const ImageUpload = ({
  initialImage = null,
  onImageUpload,
  aspectRatio = 1,
  maxSizeMB = 2,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  minDimensions,
  disabled = false,
  className,
  uploadLabel = 'اسحب وأفلت الصورة هنا أو انقر للتحميل',
  previewType = 'cover',
  quality = 75,
  alt = 'معاينة الصورة',
  priority = false,
  error: parentError,
  name,
  showInstruction = true
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setPreview(initialImage);
  }, [initialImage]);

  const acceptTypes = allowedTypes.reduce((acc, type) => {
    acc[type as keyof Accept] = [];
    return acc;
  }, {} as Accept);

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const validateImage = useCallback(async (file: File) => {
    const validTypes = allowedTypes.includes(file.type);
    const validSize = file.size <= maxSizeMB * 1024 * 1024;

    if (!validTypes) throw new Error(`الأنواع المسموحة: ${allowedTypes.join(', ')}`);
    if (!validSize) throw new Error(`الحجم الأقصى: ${maxSizeMB}MB`);

    if (minDimensions) {
      const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
        const img = new window.Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
          URL.revokeObjectURL(img.src);
        };
        img.onerror = () => resolve({ width: 0, height: 0 });
      });

      if (dimensions.width < minDimensions.width || dimensions.height < minDimensions.height) {
        throw new Error(`الأبعاد الدنيا: ${minDimensions.width}x${minDimensions.height} بكسل`);
      }
    }
  }, [allowedTypes, maxSizeMB, minDimensions]);

  const processFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setInternalError(null);
    setImageError(false);

    try {
      await validateImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onImageUpload(file); // إرسال الملف إلى الحالة في المكون الأب
    } catch (err) {
      setInternalError(err instanceof Error ? err.message : 'صورة غير صالحة');
      onImageUpload(null); // إرسال null عند وجود خطأ
    } finally {
      setIsLoading(false);
    }
  }, [validateImage, onImageUpload]);

  const { getInputProps, open } = useDropzone({
    onDropAccepted: (acceptedFiles) => processFile(acceptedFiles[0]),
    onDropRejected: (rejectedFiles) => {
      setInternalError(rejectedFiles[0]?.errors[0]?.message || 'تم رفض الملف');
    },
    accept: acceptTypes,
    disabled: disabled,
    multiple: false,
    maxSize: maxSizeMB * 1024 * 1024,
    noClick: true,
    noDrag: true,

  });

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPreview(null);
    onImageUpload(null); // إرسال null إلى المكون الأب عند إزالة الصورة
    setInternalError(null);
  }, [onImageUpload]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    preview?.startsWith('blob:') && URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <div className="flex items-start  gap-4">
      <div className={cn('space-y-4', className)}>
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg overflow-hidden',
            'transition-all duration-200 ease-in-out bg-background h-full',
            disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer',
            (parentError || internalError) && 'border-destructive'
          )}
          style={{ aspectRatio }}
        >
          <input {...getInputProps()} className="hidden" name={name} />

          {preview ? (
            <div className="relative w-full h-full">
              <Image
                src={preview.startsWith("blob:") || preview.startsWith("http") ? preview : fallbackImage} // Use fallbackImage if preview is invalid
                alt={alt}
                fill
                priority={priority}
                quality={quality}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={cn(
                  'object-cover transition-opacity rounded-lg',
                  previewType === 'contain' ? 'object-contain' : 'object-cover',
                  isLoading && 'opacity-50'
                )}
                unoptimized={preview?.startsWith('blob:')}
                onError={handleImageError}
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.naturalWidth === 0) handleImageError();
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 p-2 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDialogOpen(true);
                  }}
                  aria-label="تكبير الصورة"
                  type="button"
                  className="text-white hover:text-secondary"
                >
                  <ZoomIn className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  aria-label="حذف الصورة"
                  type="button"
                  className="text-white hover:text-secondary"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                  aria-label="تغيير الصورة"
                  type="button"
                  className="text-white hover:text-secondary"
                >
                  <RefreshCcw className="w-5 h-5" />
                </Button>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-4 bg-background">
                  <div className="relative w-full h-full">
                    <DialogTitle className="sr-only">معاينة الصورة</DialogTitle>
                    <div className="flex items-center justify-center h-full pt-8">
                      <Image
                        src={preview.startsWith("blob:") || preview.startsWith("http") ? preview : fallbackImage} // Use fallbackImage if preview is invalid
                        alt={`عرض كامل - ${alt}`}
                        width={1920}
                        height={1080}
                        className="object-contain max-h-[80vh] rounded-lg shadow-xl"
                        unoptimized={preview?.startsWith('blob:')}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              {isLoading ? (
                <div
                  className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
                  aria-label="جاري التحميل"
                />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <UploadCloud className="w-8 h-8 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm">{uploadLabel}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      open();
                    }}
                    aria-label="فتح مستكشف الملفات"
                    type="button"
                  >
                    اختر صورة
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {(parentError || internalError) && (
          <p
            className="text-destructive text-sm flex items-center gap-2"
            role="alert"
            aria-live="assertive"
          >
            <ImageOff className="w-4 h-4" />
            {parentError || internalError}
          </p>
        )}
      </div>

      <div>
        {showInstruction && (
          <div className="space-y-3 text-right text-muted-foreground">
            {/* Aspect Ratio Instruction */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">

              <span >
                {aspectRatio
                  ? `النسبة المطلوبة للصورة: ${aspectRatio}`
                  : 'يمكنك استخدام أي نسبة عرض/ارتفاع'
                }
              </span>
            </div>

            {/* Size Requirements */}
            <div className="flex items-center gap-2 text-smtext-muted-foreground">

              <span>
                {maxSizeMB && `الحجم الأقصى: ${maxSizeMB} ميجابايت`}
                {minDimensions && (
                  <>
                    {' '}
                    • الأبعاد الدنيا: {minDimensions.width}×{minDimensions.height} بكسل
                  </>
                )}
              </span>
            </div>

            {/* Format Instruction */}
            {allowedTypes && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">

                <span>
                  صيغ الملفات المسموح بها: {allowedTypes.join('، ')}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default ImageUpload;