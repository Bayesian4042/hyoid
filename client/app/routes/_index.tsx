import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Voice-Workflow" },
    { name: "description", content: "Welcome to Voice-Workflow" },
  ];
};

export default function Index() {
  return (
    <div className="text-2xl font-semibold">Welcome</div>
  );
}
