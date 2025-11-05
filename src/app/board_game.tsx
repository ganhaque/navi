import { darken } from "@/utils";
import { FaGear } from "react-icons/fa6";
import { GiAlienFire } from "react-icons/gi";

export default function Home() {
  return (
    <>
      <div style={{
        position: "absolute",
        display: "flex",
        width: "1920px",
        height: "1080px",
        flexDirection: "column",
        backgroundColor: "hsla(var(--black))",
      }}>
        <div style={{
          height: "64px",
          width: "100%",
          padding: "6px",
          outlineWidth: "2px",
          outlineOffset: "-2px",
          /* backgroundColor: darken("hsla(var(--black))", 0.4), */
        }}>
          <FaGear style={{
            marginLeft: "auto",
            width: "48px",
            height: "48px",
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
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <div key={rowIndex} style={{
                display: "flex",
                flexDirection: "row",
                gap: "calc(0.25 * var(--tile_size))",
              }}>
                {Array.from({ length: 8 }).map((_, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} style={{
                    width: "var(--tile_size)",
                    height: "var(--tile_size)",
                    backgroundColor: darken("hsla(var(--black))", 0.2),
                    borderWidth: "2px",
                    borderRadius: "0.5rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  </div>
                ))}
              </div>
            ))}
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
      </div>
    </>
  );
}
