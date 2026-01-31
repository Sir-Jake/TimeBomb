import "./HomePage.css";

function HomePage() {
  return (
    <div className="landing">
      <div className="logo">💣</div>

      <h1 className="title">
        <span className="time">TIME</span>
        <span className="bomb">BOMB</span>
      </h1>

      <h2 className="subtitle">TODO</h2>

      <p className="tagline">
        Turn your tasks into high-stakes missions. Complete them
        before time runs out, or face the consequences.
      </p>

      <button className="start-btn">
        START YOUR MISSION
      </button>
    </div>
  );
}

export default HomePage;
