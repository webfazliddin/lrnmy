import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import { BLUE_THEME} from '@/theme/LightTheme';
import { BLUE_THEME, RED_THEME, PURPLE_THEME, GREEN_THEME, INDIGO_THEME, ORANGE_THEME } from "@/app/config/layouts/theme/LightTheme";
import {
  DARK_BLUE_THEME,
  DARK_RED_THEME,
  DARK_ORANGE_THEME,
  DARK_PURPLE_THEME,
  DARK_GREEN_THEME,
  DARK_INDIGO_THEME
} from "@/app/config/layouts/theme/DarkTheme";
export default createVuetify({
  components,
  directives,

  theme: {
    defaultTheme: "ORANGE_THEME",
    themes: {
      BLUE_THEME,
      RED_THEME,
      PURPLE_THEME,
      GREEN_THEME,
      INDIGO_THEME,
      ORANGE_THEME,
      DARK_BLUE_THEME,
      DARK_RED_THEME,
      DARK_ORANGE_THEME,
      DARK_PURPLE_THEME,
      DARK_GREEN_THEME,
      DARK_INDIGO_THEME
    }
  },
  defaults: {
    VCard: {
      rounded: "md"
    },
    VTextField: {
      variant: "outlined",
      density: "comfortable",
      color: "primary"
    },
    VTextarea: {
      variant: "outlined",
      density: "comfortable",
      color: "primary"
    },
    VSelect: {
      variant: "outlined",
      density: "comfortable",
      color: "primary"
    },
    VListItem: {
      minHeight: "45px"
    },
    VTooltip: {
      location: "top"
    }
  }
});
