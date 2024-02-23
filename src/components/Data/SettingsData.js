
const timerSettings = [
  {
    title: "Pause Duration (seconds)",
    description: "Time to hold the space bar before the timer starts.",
    inputType: "integer",
    settingValue: "freezeTime",
  },
  {
    title: "WCA Inspection",
    description:
      "Use timed inspections to improve your skills,ideal for competition preparation.",
    inputType: "checkbox",
    settingValue: "isInspectionEnabled",
  },
  {
    title: "Inspection Time (seconds)",
    description: "Customize Inspection time as per your need.",
    inputType: "integer",
    settingValue: "inspectionTime",
    isSubSetting: true,
  },
  {
    title: "Voice alerts of WCA inspection.",
    description: "Activate voice alerts at 8 and 12 seconds.",
    inputType: "select",
    options: ["male", "female", "none"],
    settingValue: "inspectionVoiceAlerts",
    isSubSetting: true,
  },
  {
    title: "Keep time hidden while solving.",
    description: "",
    inputType: "checkbox",
    settingValue: "hideTimer",
  },
  {
    title: "Confirm Delete Solves",
    description: "Confirmation will be asked before deleting the solve.",
    inputType: "checkbox",
    settingValue: "isConfirmBeforeDelete",
  },

  // {
  //   title: "Adjust Volume",
  //   description: "Adjust the volume level",
  //   inputType: "range",
  //   settingValue: "justtest",
  // },
  // {
  //   title: "Adjust Volume",
  //   description: "Adjust thdfe volume level",
  //   inputType: "button",
  //   settingValue: "click me",
  // }
];
const themeSettings = [
  {
    title: "Colors", //resolve this later
  },
  {
    title: "font color(global)",
    description: "",
    inputType: "color",
    settingValue: "fontColor",
    isSubSetting: true,
  },
  {
    title: "font color(timer)",
    description: "",
    inputType: "color",
    settingValue: "timerFontColor",
    isSubSetting: true,
  },
  {
    title: "Background color",
    description: "",
    inputType: "color",
    settingValue: "backColor",
    isSubSetting: true,
  },
  {
    title: "Board color",
    description: "",
    inputType: "color",
    settingValue: "boardColor",
    isSubSetting: true,
  },
  {
    title: "font",
    description: "",
    inputType: "select",
    options:[
      "Roboto, sans-serif",
      "Zilla Slab Highlight, cursive",
      "Open Sans, sans-serif",
      "Spectral, serif",
      "Slabo 27px, serif",
      "Lato, sans-serif",
      "Roboto Condensed, sans-serif",
      "Oswald, sans-serif",
      "Source Sans Pro, sans-serif",
      "Raleway, sans-serif",
      "Zilla Slab, serif",
      "Montserrat, sans-serif",
      "PT Sans, sans-serif",
      "Roboto Slab, serif",
      "Merriweather, serif",
      "Saira Condensed, sans-serif",
      "Saira, sans-serif",
      "Open Sans Condensed, sans-serif",
      "Saira Semi Condensed, sans-serif",
      "Saira Extra Condensed, sans-serif",
      "Julee, cursive",
      "Archivo, sans-serif",
      "Ubuntu, sans-serif",
      "Lora, serif",
      "Manuale, serif",
      "Asap Condensed, sans-serif",
      "Faustina, serif",
      "Cairo, sans-serif",
      "Playfair Display, serif",
      "Droid Serif, serif",
      "Noto Sans, sans-serif",
      "PT Serif, serif",
      "Droid Sans, sans-serif",
      "Arimo, sans-serif",
      "Poppins, sans-serif",
      "Sedgwick Ave Display, cursive",
      "Titillium Web, sans-serif",
      "Muli, sans-serif",
      "Sedgwick Ave, cursive",
      "Indie Flower, cursive",
      "Mada, sans-serif",
      "PT Sans Narrow, sans-serif",
      "Noto Serif, serif",
      "Bitter, serif",
      "Dosis, sans-serif",
      "Josefin Sans, sans-serif",
      "Inconsolata, monospace",
      "Bowlby One SC, cursive",
      "Oxygen, sans-serif",
      "Arvo, serif",
      "Hind, sans-serif",
      "Cabin, sans-serif",
      "Fjalla One, sans-serif",
      "Anton, sans-serif",
      "Acme, sans-serif",
      "Archivo Narrow, sans-serif",
      "Mukta Vaani, sans-serif",
      "Play, sans-serif",
      "Cuprum, sans-serif",
      "Maven Pro, sans-serif",
      "EB Garamond, serif",
      "Passion One, cursive",
      "Ropa Sans, sans-serif",
      "Francois One, sans-serif",
      "Archivo Black, sans-serif",
      "Pathway Gothic One, sans-serif",
      "Exo, sans-serif",
      "Vollkorn, serif",
      "Libre Franklin, sans-serif",
      "Crete Round, serif",
      "Alegreya, serif",
      "PT Sans Caption, sans-serif",
      "Alegreya Sans, sans-serif",
      "Source Code Pro, monospace"
    ],
    settingValue: "fontFamily",
  },
  {
    title:"Timer Background"
  },
  {
    title:"Background Type",
    inputType:"select",
    options:[
      "image url",
      "image upload",
      "Gif",
      "none"
    ],
    settingValue: "backgroundType",
    isSubSetting:true

  },
 {
    title: "Background Image Url",
    description: "",
    inputType: "text",
    settingValue: "backgroundImageUrl",
    conditionRule:["backgroundType","image url"],
    isSubSetting: true
 },
  {
    title: "Gif as timer background",
    description: "",
    inputType: "gif",
    settingValue: "backgroundImageUrl",
    conditionRule:["backgroundType","Gif"],
    isSubSetting:true


  },
  {
    title: "upload Image",
    description: "",
    inputType: "file",
    settingValue: "backgroundImageUrl",
    conditionRule:["backgroundType","image upload"],
    isSubSetting:true


  }
];


export { timerSettings, themeSettings };
