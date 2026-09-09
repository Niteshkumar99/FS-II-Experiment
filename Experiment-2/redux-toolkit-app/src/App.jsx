import AddPost from "./components/AddPost";
import PostList from "./components/PostList";
import AddPlatform from "./components/AddPlatform";
import PlatformList from "./components/PlatformList";

function App() {
  return (
    <div className="container">
      <h1 className="title">
         Redux Toolkit CRUD Dashboard
      </h1>

      <div className="grid">
        <div>
          <AddPost />
          <PostList />
        </div>

        <div>
          <AddPlatform />
          <PlatformList />
        </div>
      </div>
    </div>
  );
}

export default App;