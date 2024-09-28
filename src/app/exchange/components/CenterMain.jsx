"use client";
import React, { useState, useEffect } from "react";
import Cricket from "./events/Cricket";
import Loading from "./Loading";

export default function CenterMain({ active }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [active]);

  return (
    <section className="">
      {loading ? (
        <div className="flex  text-white items-center justify-center">
          <Loading stylings={"min-h-[80vh]"} />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-y-1 my-1">
          <Cricket />
        </div>
      )}
    </section>
  );
}
