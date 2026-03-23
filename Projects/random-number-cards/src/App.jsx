import "./App.css";
import Button from "./Button.jsx";
import Card from "./Card.jsx";

function App() {
  return (
    <div>
      <Card h2="First card's h2" h3="First card's h3" />
      <Card h2="Second card's h2" h3="Second card's h3" />
      <Card h2="Third card's h2" h3="Third card's h3" />
      <Button />
    </div>
  );
}

export default App;
