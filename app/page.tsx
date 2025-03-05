"use client"
import { Suspense, useEffect, useState } from "react";

interface WaferData {
  waferMap: number[][];
  dieSize: number;
  lotName: string;
  trianTestLabel: string;
  failureType: string;
  waferMapDim: number[];
}

interface WaferMapDisplayProps {
  waferMap: number[][];
}

function WaferMapDisplay({ waferMap }: WaferMapDisplayProps) {
  return (
    <div>
      {waferMap.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, cellIndex) => {
            let color = 'white';
            if (cell === 1) {
              color = 'lightgreen';
            } else if (cell === 2) {
              color = 'red';
            }
            return (
              <div
                key={cellIndex}
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: color,
                  border: '1px solid #eee',
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function WaferList() {
  const [wafers, setWafers] = useState<WaferData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 14;

  useEffect(() => {
    const fetchWafer = async () => {
      const response = await fetch('/api/waferMaps');
      const data = await response.json();
      setWafers(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    };
    fetchWafer();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWafers = wafers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {currentWafers.map((wafer, index) => (
        <div key={index}>
          <h2>Wafer {indexOfFirstItem + index + 1}</h2>
          <p>Die Size: {wafer.dieSize}</p>
          <p>Lot Name: {wafer.lotName}</p>
          <p>Label: {wafer.trianTestLabel}</p>
          <p>Failure Type: {wafer.failureType}</p>
          <p>Wafer Map Dimensions: {wafer.waferMapDim.join(' x ')}</p>
          <WaferMapDisplay waferMap={wafer.waferMap} />
        </div>
      ))}
      <div>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function LoadingAnimation() {
  return <div>Loading...</div>;
}

export default function Home() {
  return (
    <div className="">
      <h1>Wafer Data</h1>
      <Suspense fallback={<LoadingAnimation />}>
        <WaferList />
      </Suspense>
    </div>
  );
}
