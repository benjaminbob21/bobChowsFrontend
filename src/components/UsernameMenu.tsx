import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {useNavigate } from "react-router-dom";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-purple-500 gap-2">
        <CircleUserRound className="text-purple-500" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => navigate("/manage-restaurant")}
          className="font-bold hover:text-purple-500"
        >
          Manage Restaurant
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          onClick={() => navigate("/user-profile")}
          className="font-bold hover:text-purple-500"
        >
          User Profile
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-purple-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
