import { FaBars } from 'react-icons/fa';

type MainHeaderProps = {
  title: string;
};

const MainHeader = ({ title }: MainHeaderProps) => {
  return (
    <header className="sticky top-0 z-5 bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button className="text-gray-500 text-xl mr-4 md:hidden">
          <FaBars />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
    </header>
  );
};

export default MainHeader;
