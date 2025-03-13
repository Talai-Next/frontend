"use client";

import { Switch } from "@/components/ui/switch";
import { FaBus } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import { MdOutlineSpeed } from "react-icons/md";

const SettingPage = () => {
  return (
    <div className="px-5 py-6 max-w-2xl mx-auto bg-white dark:bg-muted rounded-2xl shadow-xl inset-shadow-gray-600 mt-10 border border-border">
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-foreground">UI Settings</h2>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-muted-foreground">
            Marker Display
          </h3>

          {/* Busstop Marker */}
          <div className="flex items-center justify-between rounded-xl bg-muted/40 p-4 hover:bg-muted/60 transition-all shadow-lg hover:shadow-xl hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <FaBus size={28} className="text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  Busstop Marker
                </span>
                <span className="text-xs text-muted-foreground">
                  Show or hide bus stops on the map.
                </span>
              </div>
            </div>
            <Switch id="busstop-switch" />
          </div>

          {/* Crosswalk Marker */}
          <div className="flex items-center justify-between rounded-xl bg-muted/40 p-4 hover:bg-muted/60 transition-all shadow-lg hover:shadow-xl hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <FaPersonWalking size={28} className="text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  Crosswalk Marker
                </span>
                <span className="text-xs text-muted-foreground">
                  Show crosswalk locations for pedestrians.
                </span>
              </div>
            </div>
            <Switch id="crosswalk-switch" />
          </div>

          {/* Speed Bounce Marker */}
          <div className="flex items-center justify-between rounded-xl bg-muted/40 p-4 hover:bg-muted/60 transition-all shadow-lg hover:shadow-xl hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <MdOutlineSpeed size={28} className="text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  Speed Bump Marker
                </span>
                <span className="text-xs text-muted-foreground">
                  Highlight speed bump locations to slow down vehicles.
                </span>
              </div>
            </div>
            <Switch id="speedbounce-marker" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
