const timerSettings = [
    {
      title: "Pause Duration (seconds)",
      description: "Time to hold the space bar before the timer starts.",
      inputType: "integer",
      settingValue: "freezeTime",
    },
    {
      title: "WCA Inspection",
      description: "Use timed inspections to improve your skills,ideal for competition preparation.",
      inputType: "checkbox",
      settingValue: "isInspectionEnabled",
    },
    {
      title: "Inspection Time (seconds)",
      description: "Customize Inspection time as per your need.",
      inputType: "integer",
      settingValue: "inspectionTime",
      isSubSetting:true
    },
    {
      title: "Voice alerts of WCA inspection.",
      description: "Activate voice alerts at 8 and 12 seconds.",
      inputType: "select",
      options:[
        "male",
        "female",
        "none"
      ],
      settingValue: "inspectionVoiceEnabled",
      isSubSetting:true
      
    },
    {
      title: "Keep time hidden while solving.",
      description: "",
      inputType: "checkbox",
      settingValue: "hideTimer",
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
  
  export { timerSettings };
  