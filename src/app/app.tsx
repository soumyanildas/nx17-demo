import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import { Products } from '@nx17-demo/products';
import { useAtom } from 'jotai';
import { authAtom } from './store';
import { RESET } from 'jotai/utils';

export const Home = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const onLogin = () => {
    setAuth({
      isAuthenticated: true
    });
    navigate('/products');
  };

  return (
    <>
      {!auth?.isAuthenticated ? <button onClick={onLogin}>Login</button> : null}
      <h1>Home</h1>
    </>
  );
};

export const NotFound = () => {
  return <h1>Not Found</h1>;
};

export const UnprotectedRoute = ({ children }: RouteProps) => {

  const [auth] = useAtom(authAtom);
  const navigate = useNavigate();

  if (auth?.isAuthenticated) {
    navigate('/products');
  }

  return children ? children : <Outlet />;
};

export const ProtectedRoute = ({ children }: RouteProps) => {

  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  if (!auth?.isAuthenticated) {
    navigate('/');
  }

  const onLogout = () => {
    setAuth(RESET);
    navigate('/');
  };

  return (
    <>
      {auth?.isAuthenticated ? <button onClick={onLogout}>Logout</button> : null}
      Sidebar
      {children ? children : <Outlet />}
    </>
  );
};

export function App() {

  return (
    <Routes>
      <Route index element={
        <UnprotectedRoute>
          <Home />
        </UnprotectedRoute>
      } />
      <Route path="/products" element={<ProtectedRoute />}>
        <Route index element={<Products />} />
        <Route path="home" element={<Products />} />
        <Route path="dashboard" element={<Products />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;

interface RouteProps {
  children?: React.ReactNode;
}
