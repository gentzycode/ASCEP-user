import {
  ResponseComment,
  ResponseDetails,
  ResponseImageSelect,
} from "@/components/Response";

export default function ViewResponsepage() {
  return (
    <div className="min-h-screen px-6 space-y-7">
      <h3 className="text-2xl">View Response</h3>
      <ResponseImageSelect />
      <ResponseDetails />
      <ResponseComment />
      <ResponseComment />
      <ResponseComment />
    </div>
  );
}
