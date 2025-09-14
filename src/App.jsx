import { useState } from "react";

import GuestDetails from "./details";
import GuestList from "./list";

export default function App() {
  // initilaizes state: guestId
  const [guestId, setGuestId] = useState(null);
  return (
    <main>
      {/* if guestId is truthy, then render GuestDetails. if it is falsy, return the guest list*/}
      {guestId ? (
        <GuestDetails guestId={guestId} setGuestId={setGuestId} />
      ) : (
        <GuestList setGuestId={setGuestId} />
      )}
    </main>
  );
}
