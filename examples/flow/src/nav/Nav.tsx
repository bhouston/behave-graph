import { publicUrl } from '../hooks/useBehaveGraphFlow';
import Web3Login from '../web3/Web3Login';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { AiFillGithub } from 'react-icons/ai';

const menuItems: [string, string][] = [['Build Behave Graph', '/']];

const MenuItem = ({ name, link }: { name: string; link: string }) => (
  <li>
    <NavLink
      to={link}
      className={({ isActive }) =>
        clsx({
          'block py-2 pl-3 pr-4 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white':
            isActive,
          'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700':
            !isActive,
        })
      }
      aria-current="page"
    >
      {name}
    </NavLink>
  </li>
);

const MenuButton = () => (
  <button
    data-collapse-toggle="navbar-cta"
    type="button"
    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    aria-controls="navbar-cta"
    aria-expanded="false"
  >
    <span className="sr-only">Open main menu</span>
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </button>
);

const Nav = ({ isWeb3Enabled }: { isWeb3Enabled?: boolean }) => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-0 dark:bg-gray-800 w-full">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <img src={publicUrl('/interx.png')} className="h-12" alt="Interx Logo" />
        </a>
        <div className="flex md:order-2">
          {isWeb3Enabled && <Web3Login />}
          <MenuButton />
          <a href="https://github.com/oveddan/interX" className="inline-flex items-center ml-2 px-1 shadow rounded-2xl">
            <AiFillGithub className="h-8 w-8" />
          </a>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menuItems.map(([name, link]) => (
              <MenuItem name={name} link={link} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
