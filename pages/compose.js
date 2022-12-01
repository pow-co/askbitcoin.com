import React from "react";
import Head from "next/head";
import { Composer, ThreeColumnLayout } from "../components";
import { useRouter } from "next/router";

export default function Compose() {
  const router = useRouter();
  const navigate = (txid) => {
    router.push(`/questions/${txid}`);
  };
  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
        <div className="mt-3 lg:mt-8 mb-[200px] lg:rounded-xl bg-gray-100 dark:bg-gray-700 px-4 pt-4 pb-3">
          <Composer />
        </div>
      </div>
    </ThreeColumnLayout>
  );
}
