import { Button } from "../../../../components/ui/button";

// Submit Button Component
const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <Button type="submit" className="w-full" disabled={isSubmitting}>
    {isSubmitting ? (
      <div className="flex items-center justify-center">
        <span className="animate-spin mr-3">🌀</span>
        جاري الحفظ...
      </div>
    ) : (
      "حفظ التغييرات"
    )}
  </Button>
);

export default SubmitButton;