import { ConfigProvider, FloatButton } from "antd";
import AppRouting from "./AppRouting";
import { useState } from "react";
import ThemeDrawer from "./component/common/theme.drawer";
import { useTheme } from "../context/theme.context";
import { useAuth } from "../context/auth.context";

const data = {
  borderRadius: 6,
  colorPrimary: "#083344",
  Button: {
    colorPrimary: "#164e63",
  },
};

const App = () => {
  const [toggle, setToggle] = useState(false);
  const { theme } = useTheme();
  const [auth] = useAuth();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.primary,
        },
        components: {
          Button: {
            colorPrimary: theme?.primary,
            colorFillSecondary: theme?.secondary,
          },
        },
      }}>
      <AppRouting />
      <FloatButton
        type="primary"
        style={{
          right: 50,
        }}
        onClick={() => setToggle(!toggle)}
      />

      <ThemeDrawer open={toggle} onClose={() => setToggle(false)} />
    </ConfigProvider>
  );
};
export default App;
