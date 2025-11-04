import React from "react";
import { Toggle } from "./components/ui/toggle";

export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">AI Expense Transparency</h1>
      <Toggle>Click me</Toggle>
    </div>
  );
}