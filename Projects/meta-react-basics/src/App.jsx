import "./App.css";
import Header from "./Header.jsx";
import picture from "./images/gay-black.png";

function Image(props) {
  const image = <img src={picture} />;
  return image;
}

// Parent
function App() {
  return (
    // Parent want Header child to take in firstname = "Jae"
    <Header firstname="Jae">
      <p>Here's a gay autistic children</p>
      <Image />
    </Header>
  );
}

export default App;
