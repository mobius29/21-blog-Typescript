import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/@:username" element={<PostListPage />} />
        <Route path="/@:username/:postId" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/write" element={<WritePage />} />
      </Routes>
    </div>
  );
};

export default App;
