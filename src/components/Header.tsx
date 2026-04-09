import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { UtensilsCrossed } from "lucide-react";

const Header = () => {
  return (
    <div className="border-b-2 border-b-purple-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-2">
          <UtensilsCrossed className="stroke h-9 w-9 stroke-purple-500 stroke-[2.5]" />
          <Link
            to="/"
            className="text-3xl font-bold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-800 relative"
          >
            BobChows
          </Link>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
