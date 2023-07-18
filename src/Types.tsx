import { LatLngExpression } from "leaflet";

export type PersonalityType = {
  position: LatLngExpression;
  imageSrc: string;
  name: string;
  place: string;
  title: string;
  details: string;
};

export type Personality = {
  personality: PersonalityType;
};
