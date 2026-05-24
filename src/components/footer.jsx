const socialLinks = [
  { name: "Twitter", url: "https://x.com/brightben0" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/bright-ben-8085112a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Telegram", url: "https://t.me/brightben0" },
];


function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-black px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row">
        <h3 className="text-xl font-black tracking-widest text-white">
          <span className="text-sky-400">B</span>right
        </h3>
        <p className="text-xs text-white/25 uppercase tracking-widest">
          © 2026 Bright. All rights reserved.
        </p>
        <div className="flex gap-6">
          {socialLinks.map((item, i) => (
            <a
              key={i}
              href={item.url}
              className="text-xs text-white/35 uppercase tracking-widest transition hover:text-sky-400"
            >
              {item.name}
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