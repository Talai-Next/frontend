import { Box, Card, CardActions, CardContent } from "@mui/material";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdDepartureBoard,
} from "react-icons/md";
import { useState } from "react";
import { GoAlertFill } from "react-icons/go";
import { FaBusAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LineCardInfo({ data, line, state, bus, time, setSelectLine }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // find current station
  const [searchParams] = useSearchParams();
  const encodedCur = searchParams.get("cur") || null;
  const cur = encodedCur ? atob(encodedCur) : null;
  const curArrivalTime = time?.time?.find((t) => t.station_id == cur)?.time ?? null;

  const handleClick = () => {
    setSelectLine((prev) => (isOpen ? undefined : line));
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-full">
      <Box>
        <Card className="shadow-none" elevation={0}>
        <div className='dark:bg-[#2C2C2C]'>
          <CardContent
            onClick={handleClick}
            className={`flex flex-col cursor-pointer rounded-3xl ${
              state === "choose"
                ? "lineCardChoosed"
                : state === "disable"
                ? "lineCardDisable"
                : "lineCard"
            }`}
          >
            <div className="flex py-3 px-5 justify-between items-center">
              <div className="w-full">
                <h2 className="font-semibold">{t("line")} {line}</h2>
                {state === "disable" ? (
                  <div className="flex justify-between">
                    <p className="mt-2 text-red-700">{t("not_reach")}</p>
                    <div className="px-5">
                      <GoAlertFill color="red" size={30} />
                    </div>
                  </div>
                ) : state === "choose" && curArrivalTime ? (
                  <div>
                    <div className="flex justify-between">
                      <p className="mt-2">{curArrivalTime} {t("arrival_time")}</p>
                      <div className="px-5">
                        <div className="flex">
                          <p className="text-white font-bold text-2xl mr-2">{t("bus_route")}</p>
                          <MdDepartureBoard color="white" size={30} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : curArrivalTime ? (
                  <p className="mt-2">{curArrivalTime} {t("arrival_time")}</p>
                ) : (
                  <p className="mt-2">{t("not_available")}</p>
                )}
              </div>
              <div>
                {isOpen ? (
                  <MdKeyboardArrowRight size={48} />
                ) : (
                  <MdKeyboardArrowDown size={48} />
                )}
              </div>
            </div>
          </CardContent>
          <div
            className={`mt-2 px-5 transition-all duration-500 ease-in-out ${
              isOpen ? "max-h-[3500px]" : "max-h-0"
            }`}
          >
            {data.map((stop, index) => {
              const isBusHere = Array.isArray(bus) && bus.some((b) => b.station_id === stop.station.id);
              const foundTime = time?.time?.find((t) => t.station_id === stop.station.id);
              return (
                <CardContent
                  key={index}
                  sx={{ mt: 0, padding: "0 !important" }}
                  className="flex h-36 items-center"
                >
                  {/* Timeline Column */}
                  <div className="flex flex-col flex-1 items-center w-[50px] h-full">
                    <div className="w-[4px] flex-1 bg-[#19854B]"></div>
                    {isBusHere ? (
                      <div className="flex relative">
                        <div className="w-12 h-12 bg-[#428cf1] rounded-full animate-bounce flex items-center justify-center">
                          <FaBusAlt color="white" size={28} />
                        </div>
                        <div className="absolute bottom-[-70%] left-1/2 -translate-x-1/2 w-10 h-10 bg-transparent flex items-center justify-center z-10 animate-bounce">
                          <MdKeyboardDoubleArrowDown size={72} color={"#19854B"} />
                        </div>
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-[#19854B] rounded-full"></div>
                    )}
                    <div className="w-[4px] flex-1 bg-[#19854B]"></div>
                  </div>
                  <div className="flex px-5 h-full w-full justify-between items-center font-semibold">
                    <div>
                      <h2 className='dark:text-white'>[{stop.station.station_code}] {i18n.language === 'th' ? stop.station.name : stop.station.name_eng}</h2>
                    </div>
                    <div>
                      <h2 className="text-[#19854B] dark:text-white">~{foundTime?.time ?? "N/A"} {t('minute')}</h2>
                    </div>
                  </div>
                </CardContent>
              );
            })}
          </div>
          </div>
        </Card>
        
      </Box>
    </div>
  );
}

export default LineCardInfo;
