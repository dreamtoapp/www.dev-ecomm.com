import { Home, Phone, Store, Tag, Users } from "lucide-react";
import Link from "next/link";

const QuickLinks = () => {
  const links = [
    {
      name: "المتجر",
      href: "/",
      icon: <Store size={16} className="inline-block mr-2" />,

    },

    {
      name: "من نحن",
      href: "/about",
      icon: <Users size={16} className="inline-block mr-2" />,
    },
    {
      name: "تواصل معنا",
      href: "/contact",
      icon: <Phone size={16} className="inline-block mr-2" />,
    },
  ];

  return (
    <div className="text-center sm:text-right">
      <h3 className="text-lg font-semibold mb-4">روابط</h3>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={{ pathname: link.href }}
              className="hover:text-primary transition-colors duration-300 flex items-center gap-2"
              aria-label={link.name}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
