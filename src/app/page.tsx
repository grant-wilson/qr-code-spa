"use client";

import Image from "next/image";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const highlightCodeOutlineRef = useRef<HTMLDivElement>(null);
  let qrScanner = useRef<QrScanner | null>(null);
  const [scannedValue, setScannedValue] = useState<string | null>(null);
  const [showingQrScanner, setShowingQrScanner] = useState(false);

  const handleButtonClick = async () => {
    videoRef.current!.hidden = false;
    qrScanner.current = new QrScanner(
      videoRef.current!,
      (result) => {
        setScannedValue(result.data);
      },
      {
        highlightScanRegion: true,
        overlay: highlightCodeOutlineRef.current!,
      }
    );
    await qrScanner.current?.start();
    setShowingQrScanner(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <video hidden ref={videoRef}></video>
      {!showingQrScanner ? (
        <button
          onClick={handleButtonClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Start QR Scanner
        </button>
      ) : (
        <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="font-normal">
            {" "}
            {scannedValue != null
              ? scannedValue
              : "Focus the QR code in highlighed region"}
          </p>
        </a>
      )}
    </main>
  );
}
