import { Switch } from "@/components/ui/switch";
import { FaBus } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import { MdOutlineSpeed } from "react-icons/md";

const MarkerSetting = ({
  showBusstop,
  showCrosswalk,
  showSpeedBump,
  setShowBusstop,
  setShowCrosswalk,
  setShowSpeedBump,
}) => {
  const markerSettings = [
    {
      id: "busstop-switch",
      icon: <FaBus size={28} className="text-primary" />,
      title: "Busstop Marker",
      description: "Show or hide bus stops on the map.",
      checked: showBusstop,
      onChange: (value) => setShowBusstop(value),
    },
    {
      id: "crosswalk-switch",
      icon: <FaPersonWalking size={28} className="text-primary" />,
      title: "Crosswalk Marker",
      description: "Show crosswalk locations for pedestrians.",
      checked: showCrosswalk,
      onChange: (value) => setShowCrosswalk(value),
    },
    {
      id: "speedbounce-marker",
      icon: <MdOutlineSpeed size={28} className="text-primary" />,
      title: "Speed Bump Marker",
      description: "Highlight speed bump locations to slow down vehicles.",
      checked: showSpeedBump,
      onChange: (value) => setShowSpeedBump(value),
    },
  ];

  return (
    <div className="px-5 py-6 max-w-2xl mx-auto bg-white dark:bg-gray-500 rounded-2xl shadow-xl inset-shadow-gray-600 dark:border-white  mt-10 border border-border">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Marker Setting
        </h2>

        <div className="space-y-6">
          {markerSettings.map(
            ({ id, icon, title, description, checked, onChange }) => (
              <div
                key={id}
                className="flex items-center justify-between rounded-xl bg-muted/40 dark:border-white dark:border-1 p-4 hover:bg-muted/60 dark:hover:bg-gray-400 transition-all shadow-lg hover:shadow-xl hover:bg-gray-100"
              >
                <div className="flex items-center gap-4">
                  {icon}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {description}
                    </span>
                  </div>
                </div>

                <Switch
                  id={id}
                  checked={checked}
                  onCheckedChange={(value) => {
                    onChange(value);
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkerSetting;
