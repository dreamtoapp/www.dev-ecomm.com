import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  ImageOff,
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

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
  uploadLabel = 'Drag & drop or click to upload',
  previewType = 'cover',
  quality = 75,
  alt = 'Upload preview',
  priority = false,
  error: parentError,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // مزامنة المعاينة مع الخاصية الأولية initialImage
  useEffect(() => {
    setPreview(initialImage);
  }, [initialImage]);

  // توليد نوع القبول المناسب
  const acceptTypes = allowedTypes.reduce((acc, type) => {
    acc[type as keyof Accept] = [];
    return acc;
  }, {} as Accept);

  // تنظيف عناوين URL للمعاينة
  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // وظيفة للتحقق من صحة الصورة
  const validateImage = useCallback(async (file: File) => {
    const validTypes = allowedTypes.includes(file.type);
    const validSize = file.size <= maxSizeMB * 1024 * 1024;

    if (!validTypes) throw new Error(`Allowed types: ${allowedTypes.join(', ')}`);
    if (!validSize) throw new Error(`Max size: ${maxSizeMB}MB`);

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
        throw new Error(`Minimum dimensions: ${minDimensions.width}x${minDimensions.height}px`);
      }
    }
  }, [allowedTypes, maxSizeMB, minDimensions]);

  // وظيفة لمعالجة الملف
  const processFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setInternalError(null);
    setImageError(false);

    try {
      await validateImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onImageUpload(file);
    } catch (err) {
      setInternalError(err instanceof Error ? err.message : 'Invalid image');
      onImageUpload(null);
    } finally {
      setIsLoading(false);
    }
  }, [validateImage, onImageUpload]);

  // تكوين منطقة السحب والإفلات
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDropAccepted: (acceptedFiles) => {
      processFile(acceptedFiles[0]);
    },
    onDropRejected: (rejectedFiles) => {
      setInternalError(rejectedFiles[0]?.errors[0]?.message || 'File rejected');
    },
    accept: acceptTypes,
    disabled: disabled || isLoading,
    multiple: false,
    maxSize: maxSizeMB * 1024 * 1024,
    noClick: true, // منع النقر التلقائي لفتح مستكشف الملفات
  });

  // وظيفة لإزالة الصورة
  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onImageUpload(null);
    setInternalError(null);

    // إزالة الصورة فقط دون فتح مستكشف الملفات
  }, [onImageUpload]);

  // وظيفة لمعالجة خطأ الصورة
  const handleImageError = useCallback(() => {
    setImageError(true);
    preview?.startsWith('blob:') && URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <div className={cn('space-y-4', className)}>
      {/* منطقة تحميل الصورة */}
      <div
        {...getRootProps()}
        className={cn(
          'group relative border-2 border-dashed rounded-lg overflow-hidden',
          'transition-all duration-200 ease-in-out bg-background h-full',
          disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer',
          isDragActive ? 'border-primary ring-2 ring-primary/20' : 'border-muted',
          (parentError || internalError) && 'border-destructive'
        )}
        style={{ aspectRatio }}
        aria-label="Image upload area"
      >
        {/* إدخال تحميل الصورة */}
        <input {...getInputProps()} aria-label="Image upload input" />

        {preview ? (
          <div className="relative w-full h-full">
            {/* حوار معاينة الصورة */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="absolute inset-0 w-full h-full focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDialogOpen(true);
                  }}
                  aria-label="Zoom image"
                >
                  <Image
                    src={preview}
                    alt={alt}
                    fill
                    priority={priority}
                    quality={quality}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={cn(
                      'object-cover transition-opacity cursor-zoom-in',
                      previewType === 'contain' ? 'object-contain' : 'object-cover',
                      isLoading && 'opacity-50'
                    )}
                    unoptimized={preview.startsWith('blob:')}
                    onError={handleImageError}
                    onLoadingComplete={({ naturalWidth }) => {
                      if (naturalWidth === 0) handleImageError();
                    }}
                  />
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-[90vw] max-h-[90vh] p-4 bg-background">
                <div className="relative w-full h-full">
                  <DialogTitle className="sr-only">Image preview</DialogTitle>
                  <div className="flex items-center justify-center h-full pt-8">
                    <Image
                      src={preview}
                      alt={`Full screen - ${alt}`}
                      width={1920}
                      height={1080}
                      className="object-contain max-h-[80vh] rounded-lg shadow-xl"
                      unoptimized={preview.startsWith('blob:')}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {!disabled && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {/* زر إزالة الصورة */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-secondary flex flex-col items-center gap-1"
                  onClick={handleRemove}
                  aria-label="Remove image"
                  type="button"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>

                {/* زر تكبير الصورة */}
                {!imageError && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-secondary flex flex-col items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDialogOpen(true);
                    }}
                    aria-label="Zoom image"
                    type="button"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            {isLoading ? (
              <div
                className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
                aria-label="Loading"
              />
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-sm">{uploadLabel}</p>
                <p className="text-muted-foreground text-xs mt-2">
                  Supported: {allowedTypes.join(', ').replace(/image\//g, '')}
                  <br />
                  Max size: {maxSizeMB}MB
                  {minDimensions && ` • Min: ${minDimensions.width}x${minDimensions.height}px`}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={open} // فتح مستكشف الملفات يدويًا عند عدم وجود معاينة
                  aria-label="Open file explorer"
                >
                  Select File
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* عرض الأخطاء */}
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
  );
};

export default ImageUpload;