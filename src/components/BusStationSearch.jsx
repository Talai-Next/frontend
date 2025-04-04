"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import api from "@/api";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";

export function BusStationSearch({ busStop, setBusStop, nearestStation }) {
  const [open, setOpen] = useState(false);
  const [allStations, setAllStations] = useState([]);
  const { i18n } = useTranslation(); 

  useEffect(() => {
    async function fetchAllStations() {
      try {
        const response = await api.get("/api/bus-stop-location/");
        if (response.status !== 200) {
          throw new Error("Failed to fetch all stations");
        }
        setAllStations(response.data);
        setBusStop(nearestStation?.station_code);
      } catch (error) {
        console.error(`Failed to fetch all stations : ${error}`);
      }
    }
    fetchAllStations();
  }, [nearestStation]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between px-4 py-2 text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800 truncate"
        >
          {busStop
            ? allStations.find((station) => station.station_code === busStop)
              ? `${busStop}: ${
                  allStations.find(
                    (station) => station.station_code === busStop
                  )?.name
                }`
              : "Select a bus stop"
            : nearestStation
            ? `${nearestStation.station_code}: ${i18n.language == 'th' ? nearestStation.name : nearestStation.name_eng}`
            : "Select a bus stop"}
          <ChevronsUpDown className="opacity-50 h-4 w-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <Command>
          <CommandInput placeholder="Search bus stop..." className="h-9" />
          <CommandList className="max-h-56 overflow-y-auto">
            <CommandEmpty className="p-3 text-gray-500 dark:text-gray-400">
              No bus stop found.
            </CommandEmpty>
            <CommandGroup>
              {allStations.map((station) => (
                <CommandItem
                  key={station.id}
                  value={`${station.station_code} ${i18n.language == 'th' ? station.name : station.name_eng}`}
                  onSelect={() => {
                    setBusStop(station.station_code);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between px-3 py-2 cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {station.station_code}: {i18n.language == 'th' ? station.name : station.name_eng}{i18n.language == 'th' ? station.name : station.name_eng}
                  <Check
                    className={cn(
                      "h-4 w-4 text-blue-500 dark:text-blue-400 transition-opacity",
                      busStop === station.station_code ||
                        (!busStop &&
                          nearestStation?.station_code === station.station_code)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
