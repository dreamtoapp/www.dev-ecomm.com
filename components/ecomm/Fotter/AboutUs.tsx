const AboutUs = ({ aboutus, companyName }: { aboutus?: string, companyName?: string }) => {
  console.log("Debug - companyName:", companyName);

  return (
    <div className="text-center sm:text-right flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold  text-right">نحن</h3>
        <p className="text-muted-foreground text-sm">
          {companyName}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold  text-right">روئيتنا</h3>
        <p className="text-muted-foreground text-sm">
          {aboutus}
        </p>
      </div>
    </div>
  );
};
export default AboutUs;
