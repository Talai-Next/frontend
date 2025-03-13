import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const SettingPage = () => {
  return (
    <div className="flex items-center space-x-2">
      <Switch />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}

export default SettingPage