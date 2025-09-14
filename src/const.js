import { useEffect, useState } from "react";

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2507";
const API = BASE + COHORT;

// useQuery
export default function useQuery(resource) {
  // Create 2 state values with setter functions that will each begin with null states (nothing happening yet)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Side effect runs when 'resource' changes
  useEffect(() => {
    // If there is no resource return nothing
    if (!resource) return;

    // Create async function for fetching api data (side effects cannot be an async function in react)
    const query = async () => {
      // sets the Error state to null for clearing errors before making a new request
      setError(null);
      try {
        // request and wait for response
        const response = await fetch(API + resource);
        // a non 'ok' response will throw an error
        if (!response.ok) throw Error(`Could not query ${resource}.`);
        const result = await response.json();
        // updates the data state with the result of the data pulled from the api
        // Line 31 object notation needs to contain ".data" because it is 'data' that is used in the api documentation or else this will not update the data state with the data pulled from the api. This is what originally caused the error where the app was stuck with the 'loading' return statement in the details and list components.
        // This line puts the api data into state
        setData(result.data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    };
    // Calls the async query to perform everything that was just defined
    query();
    // Dependency array will rerun whenever 'resource' changes. This can be left empty if the function does not need to run when 'resource' changes
  }, [resource]);
  // Makes the api results available whenever the useQuery function gets called
  return { data, error };
}
