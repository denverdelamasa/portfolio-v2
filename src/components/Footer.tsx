export default function Footer() {

  return (
    <footer className="flex px-12 w-full h-[30vh] text-center items-center border-2 border-accent">
        <aside>
            <p>Copyright © {new Date().getFullYear()} Denver Dela Masa - All rights Reserved</p>
        </aside>
    </footer>
  );
}