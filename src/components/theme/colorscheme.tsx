interface Theme {
  label: string;
  colors: { [key: string]: string };
}

export const ThemeMap : { [key: string]: Theme } = {
  "galana" : {
    label: "galana",
    colors: {
      "pure-black": "black",
      "pure-white": "white",
      "black": "240, 21%, 7%",
      "white": "226, 64%, 88%",

      "red": "346, 77%, 63%",
      "orange": "22, 100%, 70%",
      "yellow": "41, 89%, 69%",
      "teal-green": "181, 50%, 43%",
      "green": "134, 75%, 72%",
      "blue": "218, 100%, 74%",
      "purple": "263, 100%, 79%",

      "primary": "var(--teal-green)",
      "secondary": "var(--green)",
    }
  },
  "lsu" : {
    label: "LSU Purple & Gold",
    colors: {
      "pure-black": "black",
      "pure-white": "white",
      "black": "266, 61%, 15%",
      "white": "260, 4%, 84%",

      "red": "346, 82%, 62%",
      "orange": "22, 74%, 57%",
      "yellow": "48, 98%, 56%",
      "green": "89, 66%, 58%",
      "teal-green": "157, 75%, 57%",
      "blue" : "217, 84%, 57%",
      "purple": "266, 62%, 52%",

      "primary": "var(--yellow)",
      "secondary": "var(--purple)",
    }
  },
  "catppuccin-mocha" : {
    label: "Catppuccin (Mocha)",
    colors: {
      "pure-black": "black",
      "pure-white": "white",
      "black": "240, 21%, 15%",
      "white": "226, 64%, 88%",

      "red": "343, 81%, 75%",
      "orange": "23, 92%, 75%",
      "yellow": "41, 86%, 83%",
      "green": "115, 54%, 76%",
      "teal-green": "170, 57%, 73%",
      "blue" : "217, 92%, 76%",
      "purple": "267, 84%, 81%",
      "primary": "var(--green)",
      "secondary": "var(--teal-green)",
    }
  },
  "catppuccin-latte" : {
    label: "Catppuccin (Latte)",
    colors: {
      "pure-black": "white",
      "pure-white": "black",
      "black": "220, 23%, 95%",
      "white": "234, 16%, 35%",

      "red": "347, 76%, 59%",
      "orange": "22, 99%, 52%",
      "yellow": "35, 77%, 49%",
      "green": "109, 58%, 40%",
      "teal-green": "183, 74%, 35%",
      "blue" : "220, 91%, 54%",
      "purple": "266, 85%, 58%",
      "primary": "var(--green)",
      "secondary": "var(--teal-green)",
    }
  },
  "gruvbox-dark" : {
    label: "GruvBox (Dark)",
    colors: {
      "pure-black": "black",
      "pure-white": "white",
      "black": "0, 0%, 16%",
      "white": "49, 87%, 88%",

      "red": "6, 96%, 59%",
      "orange": "27, 99%, 55%",
      "yellow": "43, 95%, 58%",
      "green": "61, 66%, 44%",
      "teal-green": "104, 35%, 62%",
      "blue" : "157, 36%, 58%", // sat is turned up
      "purple": "344, 47%, 68%",

      "primary": "var(--green)",
      "secondary": "var(--teal-green)",
    }
  },
  "gruvbox-light" : {
    label: "GruvBox (Light)",
    colors: {
      "pure-black": "white",
      "pure-white": "black",
      "black": "48, 87%, 88%",
      "white": "0, 0%, 16%",

      "red": "358, 100%, 38%",
      "orange": "19, 97%, 35%",
      "yellow": "37, 80%, 39%",
      "green": "57, 79%, 27%",
      "teal-green": "143, 30%, 37%",
      "blue" : "190, 89%, 25%",
      "purple": "323, 39%, 40%",

      "primary": "var(--green)",
      "secondary": "var(--teal-green)",
    }
  },
}

export const changeTheme = (themeName: string) => {
  const theme = ThemeMap[themeName];
  if (theme) {
    Object.entries(theme.colors).forEach(([name, value]) => {
      document.documentElement.style.setProperty(`--${name}`, value);
    });
  } else {
    console.error(`Theme "${themeName}" not found.`);
  }
}
