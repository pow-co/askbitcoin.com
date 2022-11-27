import React, { useContext, useState, useEffect } from "react";
import { postDetailQuery } from "../../services";
import { BigNumber } from "bignumber.js";
import Link from "next/link";
import {
  ThreeColumnLayout,
  PostDetailCard,
  PostReplyCard,
  Composer,
  SimplePostCard,
  DetailPostCard,
  Loader,
} from "../../components";
import { useRouter } from "next/router";
import { useTuning } from "../../context/TuningContext";
import { useAPI } from "../../hooks/useAPI";
import { useBitcoin } from "../../context/BitcoinContext";
import { useEvents } from "../../hooks/useEvents";

/* export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const postDetail = await postDetailQuery(id);
  return { props: { postDetail } };
} */

export default function DetailPage() {
  const router = useRouter();
  const query = router.query;
  const { authenticated } = useBitcoin();
  const { startTimestamp } = useTuning();

  let { data, error, refresh, loading } = useAPI(
    `/questions/${query.tx_id}` //?start_timestamp=${startTimestamp}`
  );

  const events = useEvents(`questions.${query.tx_id}.answer`, onAnswer);

  function onAnswer(answer) {
    console.log("on answer", answer);
    //enqueueSnackbar(`new answer: ${answer.content}`);
  }

  if (!data) {
    return (
      <ThreeColumnLayout>
        <div className="mt-4 lg:mt-10">
          <Loader />
        </div>
      </ThreeColumnLayout>
    );
  }

  const { question } = data;
  console.log(question);

  var { answers } = question;

  answers = answers.map((answer) => {
    return Object.assign(answer, {
      difficulty: answer.boostpow_proofs.reduce((sum, { difficulty }) => {
        return new BigNumber(sum).plus(difficulty).toNumber();
      }, 0),
    });
  });

  answers = answers.sort((a, b) => (a.difficulty < b.difficulty ? 1 : -1));

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen pb-20">
        <div className="mt-4 lg:mt-10">
          {loading && <Loader />}
          {!loading && !error && <DetailPostCard post={question} />}
          {!loading && !error && (
            <div className="bg-gray-100 dark:bg-gray-600 rounded-b-lg py-3 px-4 mb-1">
              <Composer reply_tx={query.tx_id} />
            </div>
          )}
          {answers?.map((answer) => (
            <DetailPostCard key={answer.tx_id} post={answer} />
          ))}
          {/* {parents.edges.map((post) => (
              <PostReplyCard key={post.node.transaction} post={post.node} />
            ))}
            <PostDetailCard post={OP} />
            {me.id && (
              <div className="bg-gray-100 dark:bg-gray-600 rounded-b-lg py-3 px-4 mb-1">
                <Composer postDetail={OP} />
              </div>
            )}
            {firstchild && <PostReplyCard post={firstchild.node} isChild />}
            {children.edges.map((post) => (
              <PostReplyCard key={post.node.transaction} post={post.node} />
            ))}  */}
        </div>
      </div>
    </ThreeColumnLayout>
  );
}
