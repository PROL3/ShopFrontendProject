import DarkModeToggle from '../../DarkModeToggle';

export default function Header() {
  return (
    <header className='bg-pink-200 shadow-sm dark:bg-gray-800 dark:shadow-dark-sm pt-5'>
      <DarkModeToggle  size={15} />
    </header>
  );
}
