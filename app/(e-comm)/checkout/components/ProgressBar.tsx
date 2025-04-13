"use client";

export const ProgressBar = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-center space-x-4 mb-6">
    {[1, 2, 3].map((step) => (
      <div
        key={step}
        className={`flex items-center space-x-2 ${
          currentStep === step ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full ${
            currentStep === step ? "bg-primary" : "bg-muted"
          }`}
        ></div>
        <span className="text-sm">الخطوة {step}</span>
      </div>
    ))}
  </div>
);
