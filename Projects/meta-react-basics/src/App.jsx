import "./App.css";
import Header from "./Header.jsx";
import Button from "./Button.jsx";

// Parent
function App() {
  return (
    // Parent want Header child to take in firstname = "Jae"
    <Header firstname="Jae">
      <p>Here's a gay autistic children</p>
      {/* <Image /> */}
      <Button />
    </Header>
  );
}

export default App;
