import L, { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";

import { heroes, personalities } from "./personalities";
import { CustomMarker } from "./CustomMarker";

export const feminismSymbol = new L.Icon({
  iconUrl: "markerNou.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

  iconSize: [42, 42],
  iconAnchor: [21, 42],
  popupAnchor: [-1, -34],
  shadowSize: [41, 41],
});

export const heroIcon = new L.Icon({
  iconUrl: "drapelGaurit.jpg",
  // shadowUrl:
  //   "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

  iconSize: [30, 20],
  iconAnchor: [15, 20],
  popupAnchor: [1, -14],
  // shadowSize: [41, 41],
});

export default function App() {
  console.log("render");
  return (
    <MapContainer
      center={[45.75754, 21.22891]}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: `90vh`,
        width: "90vh",
        justifySelf: "center",
        display: "flex",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {personalities.map((personality) => (
        <CustomMarker
          key={personality.name}
          icon={feminismSymbol}
          title={personality.title}
          imageSrc={personality.imageSrc}
          place={personality.place}
          name={personality.name}
          position={personality.position as LatLngExpression}
          details={personality.details}
        />
      ))}
      {heroes.map((hero) => (
        <CustomMarker
          key={hero.name}
          icon={heroIcon}
          title={hero.title}
          imageSrc={hero.imageSrc}
          place={hero.place}
          name={hero.name}
          position={hero.position as LatLngExpression}
          details={hero.details}
        />
      ))}
    </MapContainer>
  );
}
