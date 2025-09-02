export default function Footer() {

  return (
    <footer className="flex lg:px-12 w-full h-[40vh] text-start items-center  ">
        <aside>
            <p>
              Designed in Excalidraw <br />
              Made in Visual Studio Code <br />
              Built with Next.js Tailwind <br />
              Deployed in Vercel <br />
            </p>
            <br />
            <p>Copyright © {new Date().getFullYear()} Denver Dela Masa - All rights Reserved</p>
        </aside>
    </footer>
  );
}