import Link from 'next/link';
import {
  FaChartLine,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaUsers,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';

type SidebarProps = {
  activeItem?: string;
};

const Sidebar = ({ activeItem }: SidebarProps) => {
  const menuItems = [
    // {
    //   name: 'dashboard',
    //   label: 'Dashboard',
    //   icon: <FaHome />,
    //   href: '/platform/dashboard',
    // },
    // {
    //   name: 'bank-accounts',
    //   label: 'Contas Bancárias',
    //   icon: <FaUniversity />,
    //   href: '/platform/bank-accounts',
    // },
    {
      name: 'payables',
      label: 'Contas a Pagar',
      icon: <FaMoneyBillWave />,
      href: '/platform/payables',
    },
    {
      name: 'receivables',
      label: 'Contas a Receber',
      icon: <FaHandHoldingUsd />,
      href: '/platform/receivables',
    },
    // {
    //   name: 'cashflow',
    //   label: 'Fluxo de Caixa',
    //   icon: <FaExchangeAlt />,
    //   href: '/platform/cashflow',
    // },
    // { name: 'invoices', label: 'Faturas', icon: <FaFileInvoice />, href: '#' },
    // {
    //   name: 'remittances',
    //   label: 'Remessas',
    //   icon: <FaFileExport />,
    //   href: '/platform/remittances',
    // },
    // { name: 'reports', label: 'Relatórios', icon: <FaChartPie />, href: '/platform/reports' },
    {
      name: 'users',
      label: 'Usuários',
      icon: <FaUsers />,
      href: '/platform/users',
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col z-10 transition-all">
      <div className="p-6 flex items-center">
        <div className="text-2xl mr-3 text-green-700">
          <FaChartLine />
        </div>
        <h1 className="text-xl font-bold text-gray-800">
          Isadora<span className="font-light">Belmont</span>
        </h1>
      </div>

      <nav className="flex-1 py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-6 py-3 text-gray-500 hover:text-green-700 hover:bg-green-50 transition-colors ${
                  activeItem === item.name
                    ? 'text-green-700 bg-green-100 border-r-3 border-green-700'
                    : ''
                }`}
              >
                <span className="mr-3 w-5 text-center">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center mr-3">
            <FaUser />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">
              Administrador
            </span>
            <span className="text-xs text-gray-500">
              admin@isadorabelmont.com
            </span>
          </div>
        </div>
        <Link
          href="/auth/login"
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <FaSignOutAlt />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
