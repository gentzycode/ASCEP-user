import useScreenWidth from "@/hooks/useScreenWidth";
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
  const { screenWidth } = useScreenWidth();

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
          gap: screenWidth > 768 ? 6 : 8,
        }}
        inputStyle={{
          borderColor: "transparent",
          backgroundColor: "#F5F5f5",
          borderRadius: screenWidth > 758 ? 20 : 12,
          height: screenWidth > 1024 ? 52 : screenWidth > 768 ? 44 : 36,
          width: screenWidth > 1024 ? 52 : screenWidth > 768 ? 44 : 36,
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
