import Logo from "../Logo/Logo";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      {/* Логотип */}
      <Logo />

      {/* Навігація */}
      <nav>
        <ul className="flex gap-4">
          <li><a href="#" className="text-gray-700">Home</a></li>
          <li><a href="#" className="text-gray-700">Teachers</a></li>
        </ul>
      </nav>

      {/* Кнопки */}
      <div>
        <button className="mr-2">Log in</button>
        <button className="bg-black text-white px-4 py-2 rounded">Registration</button>
      </div>
    </header>
  );
};

export default Header;
