import React from "react";
import { Drawer } from "antd";
import { useTheme } from "../../../context/theme.context";
import { themesData } from "../../../helpers/constants/theme.data";


const ThemeDrawer = ({ onClose, open }) => {
  const { themeChanger: handleChange } = useTheme();

  return (
    <Drawer
      title="Theme Settings"
      placement="bottom"
      onClose={onClose}
      open={open}>
      <div className="d-flex justify-content-center gap-2 flex-wrap">
        {Object.keys(themesData).map((themeKey) => {
          const theme = themesData[themeKey];
          return (
            <div
              key={themeKey}
              style={{
                height: "100px",
                width: "100px",
                backgroundColor: theme.primary,
              }}
              onClick={() => handleChange(themeKey)}
              className="rounded-3"
            />
          );
        })}
      </div>
    </Drawer>
  );
};

export default ThemeDrawer;
