"use client";
import Preview from "./preview";
import Sidebar from "./sidebar";

const Main = ({ content }: { content: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex">
        <main className="flex-1 p-6 max-lg:mt-7 lg:p-[17px_17px] overflow-y-auto">
          <div className="mx-auto">{content}</div>
        </main>

        <Preview />
      </div>
    </div>
  );
};

export default Main;
