import { createContext, useContext, useState } from "react";

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

  const unregisterPlugin = (pluginName) => {
    setPlugins((prev) => prev.filter((p) => p.name !== pluginName));
  };

  return (
    <PluginContext.Provider value={{ plugins, registerPlugin, unregisterPlugin }}>
      {children}
    </PluginContext.Provider>
  );
};