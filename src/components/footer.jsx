function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-black px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row">
        <h3 className="text-xl font-black tracking-widest text-white">
          <span className="text-sky-400">B</span>rigth
        </h3>
        <p className="text-xs text-white/25 uppercase tracking-widest">
          © 2026 Brigtht. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Twitter", "Discord", "LinkedIn"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs text-white/35 uppercase tracking-widest transition hover:text-sky-400"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="text-xs text-white/25 uppercase">
          Made by Samuel Ntekim
        </div>
      </div>
    </footer>
  );
}
export default Footer;