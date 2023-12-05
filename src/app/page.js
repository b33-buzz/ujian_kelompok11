"use client";

import AddTodo from "@/components/AddTodo";
import Title from "@/components/Title";
import ListTodo from "@/components/ListTodo";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen">
        <div className="flex justify-center flex-col items-center py-[100px]">
          <Title />
          <div className="mt-[40px] flex flex-row">
            <AddTodo />
          </div>
          <ListTodo />
        </div>
      </div>
    </>
  );
}
