import React, { useState } from 'react';

interface WaferDefectPredictProps {
  waferMap: number[][];
  failureType: string;
}

function WaferDefectPredict({ waferMap, failureType }: WaferDefectPredictProps) {
  const [predict, setPredict] = useState<string>("");
  const [loadPredict, setLoadPredict] = useState<boolean>(false);

  const fetchPredict = async () => {
    try {
      setLoadPredict(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      // Flask 서버로 JSON 데이터 전송
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ waferMap }),
      });

      const data = await response.json();
      console.log(data);

      setPredict(data.predicted_class);
    } catch (error) {
      console.error("Prediction error:", error);
      setPredict("Error occurred during prediction");
    } finally {
      setLoadPredict(false);
    }
  };

  return (
    <div className="mt-4 flex flex-row items-center gap-3">
      <button
        onClick={fetchPredict}
        disabled={loadPredict}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
      >
        {loadPredict ? 'Predicting...' : 'Predict'}
      </button>
      {predict && (
        <p className="font-bold">
          <span className="">{predict}, </span>
          {failureType == predict 
          ? <span className='text-green-500'>예측 성공</span> 
          : <span className='text-red-500'>예측 실패</span>}
        </p>
      )}
    </div>
  );
}

export default WaferDefectPredict;
