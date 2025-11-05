import { darken } from "@/utils";
import { FaGear } from "react-icons/fa6";
import { GiAlienFire } from "react-icons/gi";

export default function Matcha() {
  return (
    <>
      <div style={{
        height: "52px",
        width: "100%",
        padding: "6px",
        outlineWidth: "2px",
        outlineOffset: "-2px",
        /* backgroundColor: darken("hsla(var(--black))", 0.4), */
      }}>
        <FaGear style={{
          marginLeft: "auto",
          width: "36px",
          height: "36px",
        }}/>
      </div>
      <div style={{
        display: "flex",
      }}>
        <div style={{
          width:  "calc((1920px - (0.25 * var(--tile_size) + 8 * 1.25 * var(--tile_size))) / 2)",
          height: "calc(0.25 * var(--tile_size) + 5 * 1.25 * var(--tile_size))",
          padding: "6px",
          outlineWidth: "2px",
          outlineOffset: "-2px",
        }}>
        </div>
        <div style={{
          /* margin: "auto", */
          width:  "calc(0.25 * var(--tile_size) + 8 * 1.25 * var(--tile_size))",
          height: "calc(0.25 * var(--tile_size) + 5 * 1.25 * var(--tile_size))",
          /* height: "calc(10 * var(--tile_size))", */
          backgroundColor: darken("hsla(var(--black))", 0.6),
          display: "flex",
          flexDirection: "column",
          gap: "calc(0.25 * var(--tile_size))",
          padding: "calc(0.25 * var(--tile_size))",
          /* borderRadius: "0.5rem", */
          outlineWidth: "2px",
          outlineOffset: "-2px",
        }}>
        </div>
        <div style={{
          width:  "calc((1920px - (0.25 * var(--tile_size) + 8 * 1.25 * var(--tile_size))) / 2)",
          height: "calc(0.25 * var(--tile_size) + 5 * 1.25 * var(--tile_size))",
          padding: "6px",
          outlineWidth: "2px",
          outlineOffset: "-2px",
        }}>
        </div>
      </div>
      a
    </>
  );
}
