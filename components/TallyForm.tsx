"use client";

interface TallyFormProps {
  formId?: string;
}

export default function TallyForm({ formId = "rXXXXX" }: TallyFormProps) {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <iframe
        src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
        loading="lazy"
        width="100%"
        height="700"
        title="Wedding Enquiry Form"
        style={{
          border: "none",
          background: "transparent",
        }}
      />
    </div>
  );
}