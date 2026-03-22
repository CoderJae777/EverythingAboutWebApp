

// Child that takes in props, in this case its firstname = 'Jae'
function Header(props) {
  // const example = function () {};
  let name = "Bob";
  const exampleFunction = () => {
    if (name == "Bob") {
      console.log("Hello, Bob");
    } else {
      console.log("Hello, Friend");
    }
  };
  return (
    <div>
      <h1>Hello, {props.firstname}</h1>

      {/* 
      
      props.children is the content the parent wants
      the rendered inside the child component

      However, the child (Header) needs to know the name "firstname" to
      render the props properly, thats when props.children comes in,
      with props.children, the child just needs to choose what to render
      
      */}
      {props.children}
    </div>
  );
}

export default Header;
