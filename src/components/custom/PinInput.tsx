import PinInput from "react-pin-input";

interface CustomPinInputProps {
  length: number;
  error?: string;
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
        inputStyle={{
          borderColor: "transparent",
          backgroundColor: "#F5F5f5",
          borderRadius: 20,
          height: 52,
          width: 52,
        }}
        inputFocusStyle={{ borderColor: "#FFC334", borderWidth: 2 }}
        //   onComplete={(value, index) => {}}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <p className="px-4 mt-2 text-sm font-semibold text-red-500">{error}</p>
    </div>
  );
}
