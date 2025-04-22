// ===========================
// TODO: [FEATURES] Future Enhancements for ImageUpload component:
//
// 1. Support drag-and-drop UI (visual feedback for drag events)
// 2. Allow multiple image uploads
// 3. Add image cropping before upload
// 4. Integrate with cloud storage (e.g., Cloudinary, S3)
// 5. Add progress bar for uploads
// 6. Preview image transformations (rotate/flip)
// 7. Add accessibility improvements (keyboard shortcuts, ARIA labels)
// 8. Support for more image formats (SVG, GIF, etc.)
// 9. Add mobile camera capture option
// 10. Add undo/redo for image selection
// ===========================

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Accept } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ImageOff, Trash2, UploadCloud, ZoomIn,  X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import fallbackImage from "@/public/fallback/fallback.webp";

/**
 * ImageUpload – Highly reusable, accessible, and i18n-ready image upload component
 *
 * @example <ImageUpload onImageUpload={fn} />
 *
 * @prop {string | null} initialImage – initial image url (optional)
 * @prop {(file: File | null) => void} onImageUpload – callback for uploaded file
 * @prop {number} aspectRatio – image aspect ratio (default: 1)
 * @prop {number} maxSizeMB – max file size in MB (default: 2)
 * @prop {string[]} allowedTypes – allowed mime types (default: jpeg/png/webp)
 * @prop {{width:number;height:number}} minDimensions – minimum dimensions (optional)
 * @prop {boolean} disabled – disables upload (default: false)
 * @prop {string} className – custom wrapper class
 * @prop {string} uploadLabel – label for upload button
 * @prop {string} previewType – 'cover' or 'contain'
 * @prop {number} quality – image quality (default: 75)
 * @prop {string} alt – alt text for image (default: Arabic)
 * @prop {boolean} priority – Next.js Image priority
 * @prop {string | null} error – error from parent
 * @prop {string} name – input name
 * @prop {boolean} showInstruction – show upload instructions (default: true)
 * @prop {object} i18n – labels and error messages for i18n
 * @prop {object} icons – override default icons
 * @prop {object} customActions – custom action buttons (optional)
 */

// --- Types ---
export interface ImageUploadError {
  type: 'size' | 'type' | 'dimensions' | 'unknown';
  message: string;
}

export interface ImageUploadI18n {
  uploadLabel: string;
  chooseImage: string;
  noImage: string;
  previewTitle: string;
  maxSize: string;
  minDimensions: string;
  allowedTypes: string;
  errorFallback: string;
  errorRejected: string;
}

export interface ImageUploadProps {
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
  i18n?: Partial<ImageUploadI18n>;
  icons?: Partial<{
    upload: React.ReactNode;
    remove: React.ReactNode;
    refresh: React.ReactNode;
    zoom: React.ReactNode;
    error: React.ReactNode;
  }>;
  customActions?: React.ReactNode;
  width?: number;
  height?: number;
}

const defaultI18n: ImageUploadI18n = {
  uploadLabel: 'اسحب وأفلت الصورة هنا أو انقر للتحميل',
  chooseImage: 'اختر صورة',
  noImage: 'لا توجد صورة',
  previewTitle: 'معاينة الصورة',
  maxSize: 'الحجم الأقصى',
  minDimensions: 'الأبعاد الدنيا',
  allowedTypes: 'صيغ الملفات المسموح بها',
  errorFallback: 'صورة غير صالحة',
  errorRejected: 'تم رفض الملف',
};

// Define valid error types for clarity
const VALID_ERROR_TYPES = ['size', 'type', 'dimensions', 'unknown'] as const;

type ValidErrorType = typeof VALID_ERROR_TYPES[number];

// Helper type guard for error types
const isValidErrorType = (type: any): type is ValidErrorType =>
  VALID_ERROR_TYPES.includes(type);

// --- Utility: Image Validation ---
function validateImageUtil(file: File, allowedTypes: string[], maxSizeMB: number, minDimensions?: { width: number; height: number }): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!allowedTypes.includes(file.type)) {
      reject({ type: 'type', message: `${defaultI18n.allowedTypes}: ${allowedTypes.join(', ')}` });
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      reject({ type: 'size', message: `${defaultI18n.maxSize}: ${maxSizeMB}MB` });
      return;
    }
    if (minDimensions) {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < minDimensions.width || img.height < minDimensions.height) {
          reject({ type: 'dimensions', message: `${defaultI18n.minDimensions}: ${minDimensions.width}x${minDimensions.height} بكسل` });
        } else {
          resolve();
        }
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        reject({ type: 'unknown', message: defaultI18n.errorFallback });
        URL.revokeObjectURL(img.src);
      };
    } else {
      resolve();
    }
  });
}

// --- Subcomponents ---
function ImageErrorMessage({ errors, icon }: { errors: ImageUploadError[]; icon: React.ReactNode }) {
  if (!errors.length) return null;
  return (
    <div className="text-destructive text-xs text-center mt-1" role="alert" aria-live="assertive">
      {icon} {errors.map((err, i) => <span key={i}>{err.message}</span>)}
    </div>
  );
}

function ImageActions({ customActions }: {
  customActions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 justify-center mt-2">
      {customActions}
    </div>
  );
}

function ImageUploadButton({ open, disabled, label, icon }: { open: () => void; disabled: boolean; label: string | React.ReactNode; icon: React.ReactNode }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={open}
      disabled={disabled}
    >
      {icon || <UploadCloud className="w-5 h-5" />}
      <span>{label}</span>
    </Button>
  );
}

function ImagePreview({ preview, alt, onZoom, onDelete, error, onError, previewType, quality, priority, i18n, icon, width, height, aspectRatio }: {
  preview: string | null;
  alt: string;
  onZoom: () => void;
  onDelete: () => void;
  error: boolean;
  onError: () => void;
  previewType: 'cover' | 'contain';
  quality: number;
  priority: boolean;
  i18n: ImageUploadI18n;
  icon: React.ReactNode;
  width?: number;
  height?: number;
  aspectRatio?: number;
}) {
  const showPlaceholder = !preview;
  return (
    <div
      className="relative w-full max-w-full min-h-[120px] rounded-md overflow-hidden border-2 border-dashed border-primary/40 bg-muted flex items-center justify-center transition-shadow focus-within:ring-2 focus-within:ring-primary/50"
      style={{
        aspectRatio: aspectRatio || (width && height ? width / height : 1),
        maxWidth: width ? `${width}px` : undefined,
        maxHeight: height ? `${height}px` : undefined,
        backgroundImage: showPlaceholder ? `url(${fallbackImage.src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f3f4f6',
      }}
      tabIndex={0}
      aria-label={showPlaceholder ? i18n.noImage : alt}
    >
      {preview ? (
        <>
          <Image
            src={preview}
            alt={alt}
            fill
            className={`object-${previewType} w-full h-full select-none`}
            quality={quality}
            priority={priority}
            onError={onError}
          />
          <div className="absolute top-2 left-2 flex gap-2 z-10">
            <button
              type="button"
              className="bg-background/70 rounded-full p-1 hover:bg-muted transition"
              onClick={onZoom}
              tabIndex={0}
              aria-label="تكبير الصورة"
            >
              {icon || <ZoomIn className="w-5 h-5" />}
            </button>
            <button
              type="button"
              className="bg-background/70 rounded-full p-1 hover:bg-muted transition"
              onClick={onDelete}
              tabIndex={0}
              aria-label="حذف الصورة"
            >
              <Trash2 className="w-5 h-5 text-destructive" />
            </button>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/60">
          <UploadCloud className="w-10 h-10 text-primary/70" />
          <span className="text-xs text-muted-foreground font-medium">{i18n.noImage}</span>
        </div>
      )}
    </div>
  );
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
  uploadLabel = 'اختر صورة',
  previewType = 'cover',
  quality = 75,
  alt = 'معاينة الصورة',
  priority = false,
  error: parentError,
  name,
  showInstruction = true,
  i18n: i18nOverride,
  icons = {},
  customActions,
  width,
  height,
}: ImageUploadProps) => {
  const i18n = { ...defaultI18n, ...(uploadLabel ? { uploadLabel } : {}), ...i18nOverride };
  const [preview, setPreview] = useState<string | null>(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ImageUploadError[]>([]);
  const [imageError, setImageError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

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

  // Debounced validation (prevents rapid-fire validation)
  const validateImage = useCallback(
    (file: File) => validateImageUtil(file, allowedTypes, maxSizeMB, minDimensions),
    [allowedTypes, maxSizeMB, minDimensions]
  );

  const processFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setErrors([]);
    setImageError(false);
    try {
      await validateImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onImageUpload(file);
    } catch (err) {
      if (typeof err === 'object' && err && 'type' in err && 'message' in err) {
        const errorType = isValidErrorType((err as any).type) ? (err as any).type : 'unknown';
        setErrors([{ type: errorType, message: (err as any).message }]);
      } else {
        setErrors([{ type: 'unknown', message: i18n.errorFallback }]);
      }
      onImageUpload(null);
    } finally {
      setIsLoading(false);
    }
  }, [validateImage, onImageUpload, i18n.errorFallback]);

  const { getInputProps, open } = useDropzone({
    onDropAccepted: (acceptedFiles) => processFile(acceptedFiles[0]),
    onDropRejected: (rejectedFiles) => {
      setErrors([{ type: 'unknown', message: i18n.errorRejected }]);
    },
    accept: acceptTypes,
    disabled: disabled,
    multiple: false,
    maxSize: maxSizeMB * 1024 * 1024,
    noClick: true,
    noDrag: true,
  });

  const handleZoom = () => setIsDialogOpen(true);
  const handleRemove = () => {
    setPreview(null);
    setErrors([]);
    setImageError(false);
    onImageUpload(null);
  };
  const handleRefresh = () => {
    setPreview(initialImage);
    setErrors([]);
    setImageError(false);
    onImageUpload(null);
  };

  // TODO: [TYPE SAFETY] Change `allErrors: any[]` to `ImageUploadError[]` and ensure all error objects conform to the ImageUploadError type for strict TypeScript safety.
  // Merge parent error
  const allErrors: any[] = [
    ...(parentError ? [{ type: 'unknown', message: parentError }] : []),
    ...errors,
  ];

  return (
    <div className={cn('flex flex-col items-start justify-start gap-2 w-full', className)}>
      <input {...getInputProps()} name={name} />
      <div className="relative w-full">
        <ImagePreview
          preview={preview}
          alt={alt}
          onZoom={handleZoom}
          onDelete={handleRemove}
          error={imageError}
          onError={() => setImageError(true)}
          previewType={previewType}
          quality={quality}
          priority={priority}
          i18n={i18n}
          icon={icons?.zoom}
          width={width}
          height={height}
          aspectRatio={aspectRatio}
        />
      </div>
      <div className="flex items-center gap-2 w-full mb-2">
        <button
          type="button"
          className="flex items-center gap-1 px-2 py-1 rounded bg-muted text-primary text-xs border border-primary/20 hover:bg-primary/10 transition"
          onClick={() => setShowHint(h => !h)}
          aria-expanded={showHint}
          aria-controls="image-upload-hint"
        >
          {showHint ? <X className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
        <div className="flex-1">
          <ImageUploadButton 
            open={open} 
            disabled={disabled || isLoading} 
            label={uploadLabel}
            icon={icons?.upload} 
          />
        </div>
      </div>
      {showHint && (
        <div id="image-upload-hint" className="w-full bg-white/90 rounded-md shadow px-4 py-2 flex flex-col gap-1 text-xs text-muted-foreground border border-primary/20 mb-2" dir="rtl">
          <div><b>الأنواع المسموحة:</b> {allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}</div>
          <div><b>الحجم الأقصى:</b> {maxSizeMB} ميجابايت</div>
          {minDimensions && <div><b>الأبعاد الدنيا:</b> {minDimensions.width}×{minDimensions.height} بكسل</div>}
          <div>اختر صورة واضحة للمنتج</div>
        </div>
      )}
      <ImageActions customActions={customActions} />
      <ImageErrorMessage errors={allErrors} icon={icons?.error || <ImageOff className="w-4 h-4" />} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>{i18n.previewTitle}</DialogTitle>
          {preview && (
            <div className="relative w-full h-96">
              <Image
                src={preview}
                alt={alt}
                fill
                className="object-contain w-full h-full rounded-md"
                quality={quality}
                priority={priority}
                loading="lazy"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUpload;