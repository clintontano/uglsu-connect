import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  latitude, 
  longitude, 
  zoom = 15 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // You'll need to add your Mapbox token here
    // For now, we'll show a placeholder
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: zoom,
      });

      // Add marker
      new mapboxgl.Marker({ color: '#1e40af' })
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3 style="margin: 0; font-weight: bold;">University of Ghana School of Law</h3>')
        )
        .addTo(map.current);

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [latitude, longitude, zoom]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-[400px] rounded-lg"
      style={{ minHeight: '400px' }}
    />
  );
};

export default MapComponent;
