"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import type GlobeComponent from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";

// Globe loads only on the client — react-globe.gl touches `window` at module
// scope, so it must never be evaluated during SSR.
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => null,
}) as typeof GlobeComponent;

type Hub = {
  lat: number;
  lng: number;
  label: string;
  radius: number;
  color: string;
  isHQ?: boolean;
};

const HQ: Hub = {
  lat: 47.37,
  lng: 8.55,
  label: "Switzerland — HQ",
  radius: 0.7,
  color: "#E8B86D",
  isHQ: true,
};

const HUBS: Hub[] = [
  HQ,
  { lat: 40.71, lng: -74.0, label: "North America", radius: 0.4, color: "#FFFFFF" },
  { lat: -23.55, lng: -46.63, label: "South America", radius: 0.4, color: "#FFFFFF" },
  { lat: 6.45, lng: 3.4, label: "West Africa", radius: 0.4, color: "#FFFFFF" },
  { lat: 25.2, lng: 55.27, label: "Middle East", radius: 0.4, color: "#FFFFFF" },
  { lat: 19.07, lng: 72.87, label: "South Asia", radius: 0.4, color: "#FFFFFF" },
  { lat: 31.23, lng: 121.47, label: "East Asia", radius: 0.4, color: "#FFFFFF" },
  { lat: -33.86, lng: 151.21, label: "Oceania", radius: 0.4, color: "#FFFFFF" },
];

type Arc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

const ARCS: Arc[] = HUBS.slice(1).map((h) => ({
  startLat: HQ.lat,
  startLng: HQ.lng,
  endLat: h.lat,
  endLng: h.lng,
}));

const ARC_GRADIENT = ["rgba(232,184,109,0.9)", "rgba(232,184,109,0.1)"] as const;

type GeoJsonFeature = { type: "Feature"; geometry: object; properties: object };
type GeoJsonCollection = { type: "FeatureCollection"; features: GeoJsonFeature[] };

type NetworkGlobeProps = {
  /**
   * "compact" → 400 / 600 max-height; "default" → 400 / 600 / 700.
   * Use compact when the globe shares a section with other content blocks.
   */
  height?: "compact" | "default";
};

export default function NetworkGlobe({
  height = "default",
}: NetworkGlobeProps = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [features, setFeatures] = useState<GeoJsonFeature[]>([]);

  // Load country shapes once on mount.
  useEffect(() => {
    let cancelled = false;
    fetch("/data/world-countries.geojson")
      .then((r) => r.json() as Promise<GeoJsonCollection>)
      .then((data) => {
        if (!cancelled) setFeatures(data.features ?? []);
      })
      .catch(() => {
        // Network failure: globe still renders without hex-polygon overlay.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Track container size for responsive globe canvas.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Configure auto-rotate, zoom-lock and default camera once the globe and
  // country data are both ready. Pull the camera further out on mobile so
  // the entire sphere stays visible inside the smaller container.
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || features.length === 0) return;
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
    }
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;
    globe.pointOfView(
      { lat: 20, lng: 10, altitude: isMobile ? 2.6 : 2.2 },
      0
    );
  }, [features]);

  // Solid navy globe surface — no Earth texture, abstract look.
  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: new THREE.Color("#011125"),
        shininess: 0,
      }),
    []
  );

  const ready = features.length > 0 && size.width > 0;

  const heightClass =
    height === "compact"
      ? "h-[320px] md:h-[600px]"
      : "h-[320px] md:h-[600px] lg:h-[700px]";

  return (
    <div ref={containerRef} className={`relative w-full ${heightClass}`}>
      {/* Loading placeholder — subtle pulse on navy until globe + data ready. */}
      {!ready && (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-64 w-64 animate-pulse rounded-full bg-[var(--navy-900)] md:h-96 md:w-96"
            style={{
              boxShadow: "0 0 80px -10px rgba(232,184,109,0.18)",
            }}
          />
        </div>
      )}

      {size.width > 0 && (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          globeMaterial={globeMaterial}
          showAtmosphere
          atmosphereColor="#E8B86D"
          atmosphereAltitude={0.18}
          hexPolygonsData={features}
          hexPolygonResolution={3}
          hexPolygonMargin={0.3}
          hexPolygonUseDots
          hexPolygonColor={() => "rgba(255,255,255,0.15)"}
          pointsData={HUBS}
          pointLat={(d: object) => (d as Hub).lat}
          pointLng={(d: object) => (d as Hub).lng}
          pointAltitude={0.02}
          pointRadius={(d: object) => (d as Hub).radius}
          pointColor={(d: object) => (d as Hub).color}
          arcsData={ARCS}
          arcStartLat={(d: object) => (d as Arc).startLat}
          arcStartLng={(d: object) => (d as Arc).startLng}
          arcEndLat={(d: object) => (d as Arc).endLat}
          arcEndLng={(d: object) => (d as Arc).endLng}
          arcColor={() => [...ARC_GRADIENT]}
          arcAltitude={0.3}
          arcStroke={0.5}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          enablePointerInteraction={false}
        />
      )}
    </div>
  );
}

export const NETWORK_HUBS = HUBS;
