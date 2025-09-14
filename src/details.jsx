import useQuery from "./const";

export default function GuestDetails({ guestId, setGuestId }) {
  const { data, error } = useQuery(`/guests/${guestId}`);
  // redefine 'data' for easier coding. 'guest' should be used any time we want to use the 'data' information from the api
  const guest = data;

  // returns an early error if there is an error before the data arrives
  if (error) {
    return <p>Sorry! {error}</p>;
  }

  // returns early while we wait for the data to arrive. If this is not added, the app will display blank since ther is no logic to handle what happens if the data does not arrive quick enough
  if (!guest) {
    return <p>Loading...</p>;
  }

  // returns all guest information after data arrives
  return (
    <section className="details">
      <h1>{guest.name}</h1>
      <h3>{guest.email}</h3>
      <h3>{guest.phone}</h3>
      <br />
      <p>{guest.job}</p>
      <p>{guest.bio}</p>
      <button onClick={() => setGuestId(null)}>Clear</button>
    </section>
  );
}
