import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/ThemeProvider';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from "react-i18next";

const SettingPage = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const { t, i18n } = useTranslation();
  const isDark = theme === 'dark'
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const changeLanguage = (value) => {
    i18n.changeLanguage(value);
    localStorage.setItem("lang", value); 
  };

  return (
    <div className="flex w-full h-screen bg-[radial-gradient(circle_at_top_left,#0096FF52,#FFDE6A42)] overflow-hidden justify-center">
        
      <div className='flex flex-col bg-white text-black w-[25rem] h-[15rem] rounded-xl shadow-xl mt-24 item-center'>
        <div className='my-10 mx-10'>
      {t('setting')}
      <Select onValueChange={changeLanguage} value={i18n.language}>
        <SelectTrigger className="w-[80%] bg-white mt-5">
          <SelectValue placeholder={t("lang_text")}  />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem className="hover:bg-gray-100 text-black "value="th">{t("lang_th")}</SelectItem>
          <SelectItem className="hover:bg-gray-100 text-black" value="en">{t("lang_en")}</SelectItem>
        </SelectContent>
      </Select>
      <div className='flex mt-5 items-center'>
      <Switch checked={isDark} onCheckedChange={toggleTheme} /> 
        <h3 className='px-3'>{t('dark_mode')}</h3>
      </div>
      
      </div>

      </div>
    </div>
    
  )
}

export default SettingPage