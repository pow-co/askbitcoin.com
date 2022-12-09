import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { PanelLayout } from "../components";
import { useRelay } from "../context/RelayContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { useBitcoin } from "../context/BitcoinContext";

export default function Features() {
  const { relayOne, relayPaymail } = useRelay();
  const { authenticated } = useBitcoin();
  const router = useRouter();
  const [amount, setAmount] = useState(0.218);
  const [balance, setBalance] = useState(0);
  const featureAddress = "16oWWdfgsoFXKfWo27vDHDVEaTUshqFr1h";

  useEffect(() => {
    //get address balance
    axios
      .get(
        `https://api.whatsonchain.com/v1/bsv/main/address/${featureAddress}/balance`
      )
      .then((resp) => {
        console.log(resp.data);
        setBalance(resp.data.confirmed * 1e-8);
      });
  }, []);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePayFeature = async () => {
    const opReturn = [
      "onchain",
      "1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN",
      "feature",
      JSON.stringify({
        paymail: relayPaymail,
      }),
    ];
    const outputs = {
      opReturn,
      to: featureAddress,
      amount,
      currency: "BSV",
    };
    console.log(outputs);

    let resp = await toast.promise(
      relayOne.send(outputs),
      {
        pending: "Transaction is pending 🚀",
        success: "Transaction successful 🥳",
        error: {
          render({ data }) {
            return `${data}`;
          },
        },
      },
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    console.log(resp);
    router.reload();
  };

  return (
    <>
      <PanelLayout>
        <div className="mb-[200px] min-h-screen">
          <div className="bg-gray-100 dark:bg-gray-600 lg:rounded-lg mt-7 py-8 px-7 w-full flex flex-col lg:flex-row justify-between">
            <div>
              <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white text-center lg:text-left">
                Ask Bitcoin Features
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base mt-2 text-center lg:text-left">
                If you boost it, we will build it. Help us decide on our next big feature
                release and who knows, you might even get a reward 🙃.
              </p>
            </div>
          </div>
          <div className="px-4 my-4 ">
            <div className="flex">
              <Link href="/features">
                <a className="bg-gray-100 dark:bg-gray-600 font-semibold text-gray-900 dark:text-white text-sm py-2 px-3 mr-2 cursor-pointer rounded-md whitespace-nowrap">
                  In Progress
                </a>
              </Link>
              <Link href="/features/completed">
                <a className=" text-gray-700 dark:text-gray-300 text-sm py-2 px-3 mr-2 cursor-pointer rounded-md whitespace-nowrap">
                  Requests
                </a>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-600 rounded-xl p-4 w-full relative flex flex-col">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Support tags/categories
              </p>
              <p className="text-sm text-gray-900 opacity-70 dark:text-white mt-2">
                Post, Boost and Search by tags will help you find the most relevant information in your domain of interest. 
              </p>
              <div className="grow" />
              <div className="mt-3">
                <div className="flex items-center">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Progress
                  </p>
                  <div className="grow" />
                  <p className="text-xs text-gray-900 dark:text-white">
                    {balance.toFixed(2)}/21.8 Difficulty
                  </p>
                </div>
                <div className="relative w-full bg-green-900 bg-opacity-50  h-2 rounded-lg">
                  <div
                    className="h-2 absolute top-0 left-0 bg-green-500 rounded-lg"
                    style={{ width: `${(balance * 100) / 21.8}%` }} // dynamically render based on address balance
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <div className="mr-3 flex items-center">
                    <input
                      className="border-none rounded-l-md text-gray-900 dark:text-white bg-gray-300 dark:bg-gray-800 py-1 pl-2.5 text-base focus:outline-none"
                      type="number"
                      autoComplete="off"
                      min={0.1}
                      step={0.1}
                      value={amount}
                      onChange={handleChange}
                    />
                    <div className="bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-r-md py-1 pr-2.5">
                      Difficulty
                    </div>
                  </div>
                  <button
                    disabled={!authenticated}
                    onClick={handlePayFeature}
                    className="py-1 px-4 sm:px-10 border-none rounded-md text-white bg-gradient-to-tr from-blue-400 to-blue-500 cursor-pointer flex items-center text-center justify-center disabled:opacity-50 transition duration-500 transform hover:-translate-y-1"
                  >
                    Boost
                  </button>
                </div>
              </div>
            </div>
            
            
            <div className="bg-gray-100 dark:bg-gray-600 rounded-xl p-4 w-full relative flex flex-col">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Twetch Wallet integration
              </p>
              <p className="text-sm text-gray-900 opacity-70 dark:text-white mt-2">
                Sign in, Post and Boost from Twetch Wallet
              </p>
              <div className="grow" />
              <div className="mt-3">
                <div className="flex items-center">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Progress
                  </p>
                  <div className="grow" />
                  <p className="text-xs text-gray-900 dark:text-white">
                    {balance.toFixed(2)}/21.8 Difficulty
                  </p>
                </div>
                <div className="relative w-full bg-green-900 bg-opacity-50  h-2 rounded-lg">
                  <div
                    className="h-2 absolute top-0 left-0 bg-green-500 rounded-lg"
                    style={{ width: `${(balance * 100) / 21.8}%` }} // dynamically render based on address balance
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <div className="mr-3 flex items-center">
                    <input
                      className="border-none rounded-l-md text-gray-900 dark:text-white bg-gray-300 dark:bg-gray-800 py-1 pl-2.5 text-base focus:outline-none"
                      type="number"
                      autoComplete="off"
                      min={0.1}
                      step={0.1}
                      value={amount}
                      onChange={handleChange}
                    />
                    <div className="bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-r-md py-1 pr-2.5">
                      Difficulty
                    </div>
                  </div>
                  <button
                    disabled={!authenticated}
                    onClick={handlePayFeature}
                    className="py-1 px-4 sm:px-10 border-none rounded-md text-white bg-gradient-to-tr from-blue-400 to-blue-500 cursor-pointer flex items-center text-center justify-center disabled:opacity-50 transition duration-500 transform hover:-translate-y-1"
                  >
                    Boost
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-600 rounded-xl p-4 w-full relative flex flex-col">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Handcash integration
              </p>
              <p className="text-sm text-gray-900 opacity-70 dark:text-white mt-2">
                Sign in, Post and Boost from Handcash
              </p>
              <div className="grow" />
              <div className="mt-3">
                <div className="flex items-center">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Progress
                  </p>
                  <div className="grow" />
                  <p className="text-xs text-gray-900 dark:text-white">
                    {balance.toFixed(2)}/21.8 Difficulty
                  </p>
                </div>
                <div className="relative w-full bg-green-900 bg-opacity-50  h-2 rounded-lg">
                  <div
                    className="h-2 absolute top-0 left-0 bg-green-500 rounded-lg"
                    style={{ width: `${(balance * 100) / 21.8}%` }} // dynamically render based on address balance
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <div className="mr-3 flex items-center">
                    <input
                      className="border-none rounded-l-md text-gray-900 dark:text-white bg-gray-300 dark:bg-gray-800 py-1 pl-2.5 text-base focus:outline-none"
                      type="number"
                      autoComplete="off"
                      min={0.1}
                      step={0.1}
                      value={amount}
                      onChange={handleChange}
                    />
                    <div className="bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-r-md py-1 pr-2.5">
                      Difficulty
                    </div>
                  </div>
                  <button
                    disabled={!authenticated}
                    onClick={handlePayFeature}
                    className="py-1 px-4 sm:px-10 border-none rounded-md text-white bg-gradient-to-tr from-blue-400 to-blue-500 cursor-pointer flex items-center text-center justify-center disabled:opacity-50 transition duration-500 transform hover:-translate-y-1"
                  >
                    Boost
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PanelLayout>
    </>
  );
}
