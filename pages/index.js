import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useAPI } from "../hooks/useAPI";
import { useTuning } from "../context/TuningContext";

const Index = () => {
  const [recentQuestions, setRecentQuestions] = useState([]);
  const { startTimestamp } = useTuning();
  let {
    data,
    error,
    refresh,
    loading: questions_loading,
  } = useAPI(`/questions?start_timestamp=${startTimestamp}`);
  let { data: recent, loading: recent_loading } = useAPI(
    "/recent/questions?limit=100"
  );

  useEffect(() => {
    console.log(recent);
    setRecentQuestions(recent?.questions);
  }, [recent]);

  return (
    <Dashboard
      data={data}
      recent={recentQuestions}
      error={error}
      loading={questions_loading || recent_loading}
    />
  );
};

export default Index;
