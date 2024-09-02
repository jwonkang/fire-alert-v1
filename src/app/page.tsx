// app/page.js
'use client';

import { useState } from 'react';
import { useBluetoothConnection } from '../hooks/useBluetoothConnection';

export default function Home() {
  const [gasLevel, setGasLevel] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { connectToESP32 } = useBluetoothConnection();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      gas_level: parseFloat(gasLevel),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    });
    const response = await fetch('/api', {
      body: data,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gas Sensor and GPS Data Collection</h1>
      <button
        onClick={connectToESP32}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Connect to ESP32
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={gasLevel}
          onChange={(e) => setGasLevel(e.target.value)}
          placeholder="Gas Level"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Send Data
        </button>
      </form>
    </div>
  );
}