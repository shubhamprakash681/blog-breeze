import { Client } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66dc55c9002a974ade62");

function App() {
  return <h1>App</h1>;
}

export default App;
