import BasicMenu from './BasicMenu/BasicMenu';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router';


function Header() {

  const isMobile = useMediaQuery('(max-width: 639px)');
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <header className="text-white bg-gray-800 flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6 md:p-8 lg:p-10">
      <div
      className='flex justify-between w-full items-center'
      >
      <h1 className='sm:text-sm md:text-xl lg:text-2xl'>
        Bem vindo à <span className="gradient-hover">OnlineStore!</span>
      </h1>
      { isMobile && <BasicMenu/>}
      { isTablet && 
      
      <nav className="flex px-4">
        <ul className="flex gap-8">
          <li className='opacity-80 text-xl hover:opacity-100 hover:transition hover:duration-700 hover:ease-in-out'>
            <Link to="/">Home</Link>
          </li>
          <li className='opacity-80 text-xl hover:opacity-100 hover:transition hover:duration-700 hover:ease-in-out'>
            <Link to="/login">Perfil</Link>
          </li>
          <li className='opacity-80 text-xl hover:opacity-100 hover:transition hover:duration-700 hover:ease-in-out'>
            <Link to="/cart">Carrinho</Link>
          </li>
        </ul>
      </nav>
      
      }

      { isDesktop &&
      
      <nav className="flex px-4">
        <ul className="flex gap-8">
          <li className='opacity-80 text-xl hover:opacity-100 hover:transition hover:duration-700 hover:ease-in-out'>
            <Link to="/">Home</Link>
          </li>
          <li className='opacity-80 text-xl hover:opacity-100 hover:transition hover:duration-700 hover:ease-in-out'>
            <Link to="/login">Perfil</Link>
          </li>
          <li className='opacity-80 text-xl hover:opacity-100 hover:transition hover:duration-700 hover:ease-in-out'>
            <Link to="/cart">Carrinho</Link>
          </li>
        </ul>
      </nav>
      
      }
      </div>
    </header>
  );
}

export default Header;