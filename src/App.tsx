import NotFound from 'pages/404'
import Login from 'pages/login'
import Register from 'pages/register'
import Todo from 'pages/todo'
import ScrollToTop from 'hooks/useScrollToTop'
import RequireAuth from 'hooks/useRequireAuth'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Navigate to='/v1/todo' />} />
          <Route path='/v1' element={<Outlet />}>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route
              path='todo'
              element={
                <RequireAuth redirectTo='/v1/login'>
                  <Todo />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  )
}
