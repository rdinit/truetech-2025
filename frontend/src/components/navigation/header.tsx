import { Logo } from "@/assets/logo";
import { Notifications } from "./notification";
import { WeatherWidget } from "../weather/weather.widget";

export const Header = () => {
  return (
    <header className="flex items-center px-3 py-2">
      <Logo />
      <ul className="ml-auto flex items-center gap-2">
        <li>
          <WeatherWidget />
        </li>
        <li>
          <Notifications />
        </li>
      </ul>
    </header>
  );
};
