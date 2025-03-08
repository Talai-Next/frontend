import React, { createContext, useContext, useState, ReactNode } from "react";

const PluginContext = createContext({
  plugins: [],
  registerPlugin: () => {},
});

export const usePlugins = () => useContext(PluginContext);

export const PluginProvider = ({ children }) => {
  const [plugins, setPlugins] = useState([]);

  const registerPlugin = (plugin) => {
    setPlugins((prev) => [...prev, plugin]);
  };

  return (
    <PluginContext.Provider value={{ plugins, registerPlugin }}>
      {children}
    </PluginContext.Provider>
  );
};