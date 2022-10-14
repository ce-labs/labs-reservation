import Reservations from "components/Cards/Home/Reservations";
import React from "react";

export default function Home() {
  return (
    <>
      <div
        className="flex flex-wrap"
        style={{
          paddingTop: "150px",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}
      >
        <div className="w-full ">
          <Reservations color="light" />
        </div>
      </div>
    </>
  );
}
