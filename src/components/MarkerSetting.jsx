import { Switch } from "@/components/ui/switch";
import { FaBus } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import { MdOutlineSpeed } from "react-icons/md";
import { useTranslation } from "react-i18next";

const MarkerSetting = ({
  showBusstop,
  showCrosswalk,
  showSpeedBump,
  setShowBusstop,
  setShowCrosswalk,
  setShowSpeedBump,
}) => {
  const { t, i18n } = useTranslation();
  const markerSettings = [
    {
      id: "busstop-switch",
      icon: <FaBus size={28} className="text-primary" />,
      title: t('bus_stop_marker'),
      description: t('bus_stop_marker_des'),
      checked: showBusstop,
      onChange: (value) => setShowBusstop(value),
    },
    {
      id: "crosswalk-switch",
      icon: <FaPersonWalking size={28} className="text-primary" />,
      title: t('crosswalk_marker'),
      description: t('crosswalk_marker_des'),
      checked: showCrosswalk,
      onChange: (value) => setShowCrosswalk(value),
    },
    {
      id: "speedbounce-marker",
      icon: <MdOutlineSpeed size={28} className="text-primary" />,
      title: t('speed_bump_marker'),
      description: t('speed_bump_marker_des'),
      checked: showSpeedBump,
      onChange: (value) => setShowSpeedBump(value),
    },
  ];

  return (
    <div className="px-5 py-6 max-w-2xl mx-auto bg-white dark:bg-gray-500 rounded-2xl shadow-xl inset-shadow-gray-600 dark:border-white  mt-10 border border-border">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          {t('marker_setting')}
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
