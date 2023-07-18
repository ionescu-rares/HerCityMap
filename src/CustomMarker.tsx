import { Typography } from "@mui/material";
import { Icon, LatLngExpression, LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, Tooltip, useMap, useMapEvents } from "react-leaflet";

type IProps = {
  position: LatLngExpression;
  imageSrc: string;
  name: string;
  place: string;
  title: string;
  details: string;
  icon: Icon;
};

export const CustomMarker = ({
  position,
  imageSrc,
  name,
  title,
  place,
  details,
  icon,
}: IProps) => {
  const map = useMap();

  const [zoom, setZoom] = useState(map.getZoom());
  console.log(zoom);

  const [coordZoom, setCoordZoom] = useState(0.015);

  useMapEvents({
    zoomend: () => {
      setZoom(map.getZoom());
    },
  });

  useEffect(() => {
    switch (zoom) {
      case 18:
        setCoordZoom(0.0006);
        break;
      case 17:
        setCoordZoom(0.0008);
        break;
      case 16:
        setCoordZoom(0.002);
        break;
      case 15:
        setCoordZoom(0.004);
        break;
      case 14:
        setCoordZoom(0.008);
        break;
      case 13:
        setCoordZoom(0.02);
        break;
      default:
        setCoordZoom(0.06);
    }
  }, [zoom, position]);
  const customPosition: LatLngExpression = [
    (position as LatLngTuple)[0] + coordZoom,
    (position as LatLngTuple)[1],
  ];

  const handleClick = () => {
    map.flyTo(customPosition, map.getZoom());
  };
  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{ click: handleClick }}
    >
      <Popup>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid gray",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#752995", lineHeight: 1.2 }}
            >
              {name}
            </Typography>
            <Typography variant="subtitle2">{place}</Typography>
          </section>

          <img
            src={imageSrc}
            style={{
              alignSelf: "center",
              borderRadius: 5,
              maxWidth: 300,
              maxHeight: 200,
            }}
          />

          <Typography
            style={{
              textAlign: "center",
              fontWeight: "bold",
              lineHeight: "1.4",
              color: "#752995",
            }}
            variant="subtitle1"
          >
            {title}
          </Typography>
          <p style={{ textAlign: "center" }}>{details}</p>
        </div>
      </Popup>
      <Tooltip direction="bottom" offset={[0, 0]} opacity={1}>
        {name}
      </Tooltip>
    </Marker>
  );
};
