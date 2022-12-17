import { useRouter, Link } from "next/router";
import React, { useState, useEffect } from "react";
import { ThreeColumnLayout, Loader, SimplePostCard } from "../components";
import { useAPI } from "../hooks/useAPI";

import { FormattedMessage, useIntl } from "react-intl";

const Search = () => {
  const [tag, setTag] = useState("question");

  const intl = useIntl();

  const router = useRouter();
  const query = router.query;
  console.log(query);
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (query.q) {
      setSearchInput(query.q);
      setSearchText(query.q);
    }
  }, [query]);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        // Trigger API call here
        searchText.length > 0 && router.push(`/search?q=${searchText}`);
        searchText.length > 0 && setSearchInput(searchText);
      }, 1000)
    );
  }, [searchText]);

  const { data, loading, error } = useAPI(`/search`, `?q=${searchInput}`);
  console.log({ data, loading, error });

  let { questions } = data || [];
  let { answers } = data || [];

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChangeTab = (value) => {
    setTag(value);
  };

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
        <div className="mt-8">
          <div className="relative flex flex-col mb-4">
            <div className="mb-0 flex items-center">
              <input
                className="rounded-lg bg-gray-100 dark:bg-gray-600 appearance-none border-none focus:outline-none text-gray-900 dark:text-white w-full py-2.5 px-4 text-lg"
                placeholder={intl.formatMessage({ id: "Search" })}
                id="search-input"
                autoComplete="off"
                value={searchText}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="px-4 mt-2">
          <div className="flex my-6">
            <div className="flex">
              <div
                //onClick={() => handleChangeTab("1F9E9")}
                onClick={() => handleChangeTab("question")}
                className={
                  //tag === "1F9E9"
                  tag === "question"
                    ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                    : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                }
              >
                <FormattedMessage id="Questions" />
              </div>
              <div
                //onClick={() => handleChangeTab("1F4A1")}
                onClick={() => handleChangeTab("answer")}
                className={
                  //tag === "1F4A1"
                  tag === "answer"
                    ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                    : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                }
              >
                <FormattedMessage id="Answers" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mb-[200px]">
          <div className="relative">
            {!loading &&
              !error &&
              tag === "question" &&
              questions?.map((post) => {
                return <SimplePostCard key={post.tx_id} post={post} />;
              })}
            {!loading &&
              !error &&
              tag === "answer" &&
              answers?.map((post) => {
                return <SimplePostCard key={post.tx_id} post={post} />;
              })}
            {loading && <Loader />}
            {!searchInput.length > 0 && (
              <div className="flex flex-col justify-center items-center">
                <p className="text-5xl">gm 🌞</p>
                <p className="mt-10 text-3xl font-semibold opacity-70">
                  <FormattedMessage id="Nothing to see there ..." />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThreeColumnLayout>
  );
};

export default Search;
