'use client';
import { useState, useEffect } from 'react';

const LocationComponent: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
          },
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation(); // Panggil fungsi getLocation() saat komponen dimuat
  }, []); // Gunakan array kosong sebagai dependencies agar useEffect() hanya dipanggil sekali saat komponen dimuat

  return (
    <div>
      {location ? (
        <div>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </div>
      ) : (
        <div>Meminta izin lokasi...</div>
      )}
    </div>
  );
};

export default LocationComponent;
