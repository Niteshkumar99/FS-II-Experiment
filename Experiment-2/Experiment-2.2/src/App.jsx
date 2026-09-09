import "./index.css";
import PostsList from "./components/PostsList";
import PublishedPosts from "./components/PublishedPosts";

function App() {
  return (
    <div className="container">
      <h1> Redux Memoized Selectors Demo</h1>

      <PostsList />

      <PublishedPosts />
    </div>
  );
}

export default App;