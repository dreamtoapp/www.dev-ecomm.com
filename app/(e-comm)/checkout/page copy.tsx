"use client";
import { useState } from "react";
import { checkUserExists } from "./actions/userActions";
import Step1Phone from "./components/Step1Phone";
import Step2Address from "./components/Step2Address";
import MiniCartSummary from "./components/MiniCartSummary";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    phone: "",
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneSubmit = async (phone: string) => {
    setLoading(true);
    setError("");

    try {
      const result = await checkUserExists(phone);

      if (result.exists && result.data) {
        setUserExists(true);
        setUserData({
          id: result.data.id,
          phone: phone,
          name: result.data.name as string,
          address: result.data.address as string,
          latitude: result.data.latitude,
          longitude: result.data.longitude,
        });
      } else {
        setUserExists(false);
        setUserData({
          id: "",
          phone: phone,
          name: "",
          address: "",
          latitude: "",
          longitude: "",
        });
      }

      setPhone(phone);
      setStep(2);
    } catch (err) {
      setError("حدث خطأ أثناء التحقق من رقم الهاتف. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center md:items-start justify-center bg-background p-4 gap-4">
      {/* Form Container */}
      <div className="w-full max-w-md bg-background rounded-xl shadow-lg p-6 border border-muted">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6 gap-4">
          {[
            { step: 1, title: "رقم الجوال" }, // Step 1: Phone Number
            { step: 2, title: "العنوان" }, // Step 2: Address
          ].map(({ step: s, title }) => (
            <div key={s} className="flex flex-col items-center gap-2">
              {/* Step Number */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-foreground ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {s}
              </div>
              {/* Step Title */}
              <span className="text-sm text-muted-foreground">{title}</span>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-error/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step === 1 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === 1 ? -50 : 50 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <Step1Phone
                onNext={handlePhoneSubmit}
                loading={loading} // Pass loading state
              />
            )}

            {step === 2 && (
              <Step2Address
                phone={phone}
                userExists={userExists}
                userData={userData}
                setUserData={setUserData}
                onNext={() => setStep(3)}
                onPrevious={() => setStep(1)}
              />
            )}

            {/* {step === 3 && (
              <Step3Complete />
            )} */}
          </motion.div>
        </AnimatePresence>

        {/* Loading Spinner */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="h-12 w-12 text-background animate-spin" />
          </div>
        )}
      </div>
      {/* Cart Summary */}
      <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0 md:mr-8">
        <MiniCartSummary />
      </div>
    </div>
  );
};

export default MultiStepForm;
