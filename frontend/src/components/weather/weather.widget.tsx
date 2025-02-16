import LoadingEllipsis from "@/components/ui/loaders/LoadingEllipsis";
import { useEffect } from "react";
import WeatherIcon from "./assets/weather.svg?react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";

const weather: { temperature: number | null } = observable({
  temperature: null,
});

export const WeatherWidget = observer(() => {
  useEffect(() => {
    const fetchWeather = async () => {
      const res: {
        current: {
          time: string;
          temperature_2m: number;
        };
        elevation: number;
        generationtime_ms: number;
        latitude: number;
        longitude: number;
        timezone: string;
        timezone_abbreviation: string;
        utc_offset_seconds: number;
      } = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.62&current=temperature_2m",
      ).then((r) => r.json());

      weather.temperature = res.current.temperature_2m;
    };

    if (!weather.temperature) {
      fetchWeather();
    }
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="appear flex items-center justify-center bg-card border rounded-xl px-2 gap-2 cursor-default h-10">
          <WeatherIcon />
          {weather.temperature ? (
            `${weather.temperature}°С`
          ) : (
            <LoadingEllipsis className="*:bg-slate-300" size={48} />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>Погода в Москве</TooltipContent>
    </Tooltip>
  );
});
