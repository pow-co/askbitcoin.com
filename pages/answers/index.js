import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useAPI } from "../../hooks/useAPI";
import { useTuning } from "../../context/TuningContext";

const Answers = () => {
  const [recentAnswers, setRecentAnswers] = useState([]);
  const { startTimestamp } = useTuning();
  let {
    data,
    error,
    refresh,
    loading: answers_loading,
  } = useAPI(`/answers?start_timestamp=${startTimestamp}`);
  let { data: recent, loading: recent_loading } = useAPI(
    "/recent/answers?limit=100"
  );

  useEffect(() => {
    setRecentAnswers(recent?.answers);
  }, [recent]);
  return (
    <Dashboard
      data={data}
      recent={recentAnswers}
      error={error}
      loading={answers_loading || recent_loading}
    />
  );
};

export default Answers;
