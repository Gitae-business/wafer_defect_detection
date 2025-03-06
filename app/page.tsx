"use client"
import WaferDefectPredict from "@/components/WaferDefectPredict";
import WaferMapDisplay from "@/components/WaferMapDisplay";
import { Suspense, useEffect, useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight
} from "react-icons/md";

interface WaferData {
  waferMap: number[][];
  dieSize: number;
  lotName: string;
  trianTestLabel: string;
  failureType: string;
  waferMapDim: number[];
}

function WaferList() {
  const [wafers, setWafers] = useState<WaferData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

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
        <div
          key={indexOfFirstItem + index + 1}
          className="p-4 mb-3 bg-white rounded-lg shadow-md border border-gray-200"
        >
          {/* Wafer Header */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Wafer {indexOfFirstItem + index + 1}
          </h2>

          {/* Wafer Details */}
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium text-gray-800">Failure Type:</span> {wafer.failureType}
            </p>
            <p>
              <span className="font-medium text-gray-800">Lot Name:</span> {wafer.lotName}
            </p>
            <p>
              <span className="font-medium text-gray-800">Label:</span> {wafer.trianTestLabel}
            </p>
            <p>
              <span className="font-medium text-gray-800">Die Size:</span> {wafer.dieSize}
            </p>
            <p>
              <span className="font-medium text-gray-800">Wafer Map Dimensions:</span>{" "}
              {wafer.waferMapDim.join(" x ")}
            </p>
          </div>

          {/* Wafer Map Display */}
          <div className="mt-4 mx-auto flex justify-center w-full max-w-lg h-auto aspect-square">
            <WaferMapDisplay waferMap={wafer.waferMap} />
          </div>

          {/* Predict */}
          <WaferDefectPredict
            waferMap={wafer.waferMap}
            failureType={wafer.failureType}
          />
        </div>
      ))}


      {/** Pagenation */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 h-12 rounded flex flex-row shadow-md">
        <button
          className="rounded-l size-12 cursor-pointer border border-neutral-200 bg-white hover:bg-neutral-200 flex items-center justify-center text-2xl text-red-500"
          onClick={() => setCurrentPage(prev => Math.max(prev - 10, 1))}
          disabled={currentPage === 1}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button
          className="size-12 cursor-pointer border border-neutral-200 bg-white hover:bg-neutral-200 flex items-center justify-center text-2xl text-red-500"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <div
          className="px-6 h-full flex items-center border border-neutral-200 bg-white font-bold text-md"
        > {currentPage} OF {totalPages}
        </div>
        <button
          className="size-12 cursor-pointer border border-neutral-200 bg-white hover:bg-neutral-200 flex items-center justify-center text-2xl text-red-500"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
        <button
          className="rounded-r size-12 cursor-pointer border border-neutral-200 bg-white hover:bg-neutral-200 flex items-center justify-center text-2xl text-red-500"
          onClick={() => setCurrentPage(prev => Math.min(prev + 10, totalPages))}
          disabled={currentPage === totalPages}
        >
          <MdOutlineKeyboardDoubleArrowRight />
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
      <div className='font-bold text-2xl'>Wafer Map Defect Detection</div>
      <div className="mb-4">
        <p>모든 불량 종류에 따라 100개씩 무작위 샘플링한 데이터입니다.</p>
        <p>{`'Predict'`} 버튼을 통해 모델을 직접 동작시켜 볼 수 있습니다.</p>
      </div>

      <Suspense fallback={<LoadingAnimation />}>
        <WaferList />
      </Suspense>
    </div>
  );
}
