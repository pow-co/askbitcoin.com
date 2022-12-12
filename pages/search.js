import { useRouter, Link } from "next/router";
import React, { useState } from "react";
import { ThreeColumnLayout } from "../components";

const Search = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(router.query.v);
  const [postResults, setPostResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [cursorPosts, setCursorPosts] = useState(null);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [cursorUsers, setCursorUsers] = useState(null);

  const handleChange = async (e) => {
    clearTimeout(SearchTimeOut);
    e.preventDefault();
    setSearchTerm(e.target.value);
    router.push(`/search?v=${searchTerm}&p=posts`, undefined, {
      shallow: true,
    });

    const SearchTimeOut = setTimeout(() => {
      console.log("here");
      setSearchInput(searchTerm);
    }, 1000);
  };

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
        <div className="mt-8">
          <div className="relative flex flex-col mb-4">
            <div className="mb-0 flex items-center">
              <input
                className="rounded-lg bg-gray-100 dark:bg-gray-600 appearance-none border-none focus:outline-none text-gray-900 dark:text-white w-full py-2.5 px-4 text-lg"
                placeholder="Search"
                id="search-input"
                autoComplete="off"
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-100 dark:bg-gray-600 w-full mb-4">
          {/* <div className="flex flex-row  py-0 px-4 h-[50px] items-center">
            <p className="text-lg font-bold text-gray-700 dark:text-white text-left ">
              People
            </p>
            <div className="grow" />
            <Link href={`/search?v=${searchInput}&p=users`}>
              <p className="text-blue-500 font-semibold text-xs cursor-pointer ">
                View all
              </p>
            </Link> 
          </div> */}
        </div>
        <div className="w-full">
          <div className="relative">
            {/* <InfiniteScroll
              dataLength={postResults.length}
              hasMore={hasMorePosts}
              next={fetchMorePosts}
              loader={<Loader />}
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
              refreshFunction={refreshPosts}
            >
              {postResults.map((post) => (
                <PostCard key={post.transaction} post={post} />
              ))}
            </InfiniteScroll> */}
          </div>
        </div>
      </div>
    </ThreeColumnLayout>
  );
};

export default Search;
