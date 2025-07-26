import Header from '../navbar/Header.jsx';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout;
