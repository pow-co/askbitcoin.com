import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useAPI } from "../../hooks/useAPI";
import { useTuning } from "../../context/TuningContext";

const Questions = () => {
  const [recentQuestions, setRecentQuestions] = useState([]);
  const { startTimestamp } = useTuning();
  let { data, error, refresh, loading } = useAPI(
    `/questions?start_timestamp=${startTimestamp}`
  );
  let { data: recent } = useAPI("/recent/questions?limit=100");

  useEffect(() => {
    setRecentQuestions(recent?.questions);
  }, [recent]);

  return (
    <Dashboard
      data={data}
      recent={recentQuestions}
      error={error}
      loading={loading}
    />
  );
};

export default Questions;
