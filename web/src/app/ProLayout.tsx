import React from "react";

interface Props {
  children: React.ReactNode;
}
const ProLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="min-h-screen bg-gray-100 pt-16 pb-32 px-16">
      {children}
    </main>
  );
};

export default ProLayout;
