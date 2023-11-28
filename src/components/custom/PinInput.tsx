import PinInput from "react-pin-input";

interface CustomPinInputProps {
  length: number;
  error?: string | null;
  onChange: (value: string) => void;
}

export default function CustomPinInput({
  length,
  error,
  onChange,
}: CustomPinInputProps) {
  return (
    <div>
      <PinInput
        length={length}
        initialValue=""
        secret
        secretDelay={100}
        onChange={(value) => {
          onChange(value);
        }}
        type="numeric"
        inputMode="number"
        style={{
          // backgroundColor: "red",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 400,
          gap: 8,
        }}
        inputStyle={{
          borderColor: "transparent",
          backgroundColor: "#F5F5f5",
          borderRadius: 20,
          height: 52,
          width: 55,
        }}
        // style={{
        //   gap: 20,
        // }}
        inputFocusStyle={{ borderColor: "#FFC334", borderWidth: 2 }}
        //   onComplete={(value, index) => {}}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <p className="px-4 mt-2 text-sm font-semibold text-red-500">{error}</p>
    </div>
  );
}
