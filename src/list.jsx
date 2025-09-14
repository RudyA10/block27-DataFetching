import useQuery from "./const";

export default function GuestList({ setGuestId }) {
  const { data, error } = useQuery("/guests");
  // redefine 'data' for easier coding. 'guests' should be used any time we want to use the 'data' information from the api
  const guests = data;

  if (error) {
    return <p>Sorry! {error}</p>;
  }

  // returns early while we wait for the data to arrive. If this is not added, the app will display blank since ther is no logic to handle what happens if the data does not arrive quick enough
  if (!guests) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Guest List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id} onClick={() => setGuestId(guest.id)}>
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>{guest.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Select a guest to see more details.</p>
    </>
  );
}
