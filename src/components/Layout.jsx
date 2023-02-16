import bg from "../assets/wood-bg.jpg";

export default function Layout({ children }) {
  const divStyle = {
    backgroundImage: `url(${bg})`,
  };
  return (
    <div className="p-5" style={divStyle}>
      {children}
    </div>
  );
}
