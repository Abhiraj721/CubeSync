const oll = [
  {
    name: "Runway",
    a: "(R U2') (R2' F R F') U2' (R' F R F')",
    a2: "",
  },
  {
    name: "Zamboni",
    a: "F (R U R' U') F' f (R U R' U') f'",
    a2: "y (r U r') U2 R U2' R' U2 (r U' r')",
  },
  {
    name: "Anti-Mouse",
    a: "f (R U R' U') f' U' F (R U R' U') F'",
    a2: "",
  },
  {
    name: "Mouse",
    a: "f (R U R' U') f' U F (R U R' U') F'",
    a2: "",
  },
  {
    name: "Lefty Square",
    a: "(r' U2' R U R' U r)",
    a2: "",
  },
  {
    name: "Righty Square",
    a: "(r U2 R' U' R U' r')",
    a2: "",
  },
  {
    name: "Fat Sune",
    a: "(r U R' U R U2' r')",
    a2: "",
  },
  {
    name: "Fat Antisune",
    a: "(r' U' R U' R' U2 r)",
    a2: "y2 l' U' L U' L' U2 l",
  },
  {
    name: "Kite",
    a: "(R U R' U') R' F (R2 U R' U') F'",
    a2: "(R' U' R) y r U' r' U r U r'",
  },
  {
    name: "Anti-Kite",
    a: "(R U R' U) (R' F R F') (R U2' R')",
    a2: "(R U R') y (R' F R U') (R' F' R)",
  },
  {
    name: "Downstairs",
    a: "r' (R2 U R' U R U2 R') U M'",
    a2: "",
  },
  {
    name: "Upstairs",
    a: "M' (R' U' R U' R' U2 R) U' M",
    a2: "y F (R U R' U') F' U F (R U R' U') F'",
  },
  {
    name: "Gun",
    a: "(r U' r') (U' r U r') y' (R' U R)",
    a2: "F U R U' R2' F' R U (R U' R')",
  },
  {
    name: "Anti-Gun",
    a: "(R' F R) (U R' F' R) (F U' F')",
    a2: "",
  },
  {
    name: "Squeegee",
    a: "(r' U' r) (R' U' R U) (r' U r)",
    a2: "",
  },
  {
    name: "Anti-Squeegee",
    a: "(r U r') (R U R' U') (r U' r')",
    a2: "",
  },
  {
    name: "Slash",
    a: "(R U R' U) (R' F R F') U2' (R' F R F')",
    a2: "",
  },
  {
    name: "Crown",
    a: "y R U2' (R2' F R F') U2' M' (U R U' r')",
    a2: "(r U R' U R U2 r') (r' U' R U' R' U2 r)",
  },
  {
    name: "Bunny",
    a: "M U (R U R' U') M' (R' F R F')",
    a2: "",
  },
  {
    name: "Checkers",
    a: "M U (R U R' U') M2' (U R U' r')",
    a2: "(r U R' U') M2' (U R U' R') U' M'",
  },
  {
    name: "Double Headlights",
    a: "(R U2 R') (U' R U R') (U' R U' R')",
    a2: "y (R U R' U) (R U' R' U) (R U2' R')",
  },
  {
    name: "Pi-Shape",
    a: "R U2' R2' U' R2 U' R2' U2' R",
    a2: "",
  },
  {
    name: "U-Shape",
    a: "R2 D (R' U2 R) D' (R' U2 R')",
    a2: "y2 R2' D' (R U2 R') D (R U2 R)",
  },
  {
    name: "Hammerhead",
    a: "(r U R' U') (r' F R F')",
    a2: "y (R U R D) (R' U' R D') R2'",
  },
  {
    name: "L-Shape",
    a: "y F' (r U R' U') r' F R",
    a2: "x (R' U R) D' (R' U' R) D x'",
  },
  {
    name: "Antisune",
    a: "R U2 R' U' R U' R'",
    a2: "y' R' U' R U' R' U2 R",
  },
  {
    name: "Sune",
    a: "R U R' U R U2' R'",
    a2: "y' R' U2' R U R' U R",
  },
  {
    name: "Stealth",
    a: "(r U R' U') M (U R U' R')",
    a2: "",
  },
  {
    name: "Spotted Chameleon",
    a: "y (R U R' U') (R U' R') (F' U' F) (R U R')",
    a2: "M U (R U R' U')(R' F R F') M'",
  },
  {
    name: "Anti-Spotted Chameleon",
    a: "y' F U (R U2 R' U') (R U2 R' U') F'",
    a2: "y' (F R' F) (R2 U' R' U') (R U R') F2",
  },
  {
    name: "Couch",
    a: "(R' U' F) (U R U' R') F' R",
    a2: "",
  },
  {
    name: "Anti-Couch",
    a: "R U B' (U' R' U) (R B R')",
    a2: "S (R U R' U') (R' F R f')",
  },
  {
    name: "Key",
    a: "(R U R' U') (R' F R F')",
    a2: "",
  },
  {
    name: "City",
    a: "(R U R2' U') (R' F R U) R U' F'",
    a2: "",
  },
  {
    name: "Fish Salad",
    a: "(R U2') (R2' F R F') (R U2' R')",
    a2: "",
  },
  {
    name: "Sea Mew",
    a: "(R' U' R U') (R' U R U) l U' R' U x",
    a2: "y2 (R U R' F') (R U R' U') (R' F R U') (R' F R F')",
  },
  {
    name: "Mounted Fish",
    a: "F (R U' R' U') (R U R' F')",
    a2: "",
  },
  {
    name: "Mario",
    a: "(R U R' U) (R U' R' U') (R' F R F')",
    a2: "",
  },
  {
    name: "Fung",
    a: "(L F') (L' U' L U) F U' L'",
    a2: "F (R U R' U') F' (R' U' R U' R' U2 R)",
  },
  {
    name: "Anti-Fung",
    a: "(R' F) (R U R' U') F' U R",
    a2: "",
  },
  {
    name: "Awkward Fish",
    a: "(R U R' U R U2' R') F (R U R' U') F'",
    a2: "",
  },
  {
    name: "Anti-Awkward Fish",
    a: "(R' U' R U' R' U2 R) F (R U R' U') F'",
    a2: "y (R' F R F') (R' F R F') (R U R' U') (R U R')",
  },
  {
    name: "Anti-P",
    a: "y R' U' F' U F R",
    a2: "f' (L' U' L U) f",
  },
  {
    name: "P-Shape",
    a: "f (R U R' U') f'",
    a2: "y2 F (U R U' R') F'",
  },
  {
    name: "T-Shape",
    a: "F (R U R' U') F'",
    a2: "",
  },
  {
    name: "Seein' Headlights",
    a: "R' U' (R' F R F') U R",
    a2: "",
  },
  {
    name: "Anti-Breakneck",
    a: "F' (L' U' L U) (L' U' L U) F",
    a2: "R' U' (R' F R F') (R' F R F') U R",
  },
  {
    name: "Breakneck",
    a: "F (R U R' U') (R U R' U') F'",
    a2: "",
  },
  {
    name: "Right back squeezy",
    a: "r U' r2' U r2 U r2' U' r",
    a2: "",
  },
  {
    name: "Right front squeezy",
    a: "r' U r2 U' r2' U' r2 U r'",
    a2: "y' (R U2 R' U' R U' R') F (R U R' U') F'",
  },
  {
    name: "Bottlecap",
    a: "f (R U R' U') (R U R' U') f'",
    a2: "y2 F (U R U' R') (U R U' R') F'",
  },
  {
    name: "Rice Cooker",
    a: "(R' U' R U' R' U) y' (R' U R) B",
    a2: "(R U R' U R U') y (R U' R') F'",
  },
  {
    name: "Frying Pan",
    a: "(r' U' R U') (R' U R U') R' U2 r",
    a2: "y r' U2' R (U R' U' R) (U R' U r)",
  },
  {
    name: "Anti-Frying Pan",
    a: "(r U R' U) (R U' R' U) R U2' r'",
    a2: "y' (r U2 R' U') (R U R' U') R U' r'",
  },
  {
    name: "Highway",
    a: "y (R' F R U) (R U' R2' F') R2 U' R' (U R U R')",
    a2: "",
  },
  {
    name: "Streetlights",
    a: "r' U' r (U' R' U R) (U' R' U R) r' U r",
    a2: "",
  },
  {
    name: "H-Shape",
    a: "(R U R' U') M' (U R U' r')",
    a2: "",
  },
];
const pll = [
  {
    name: "Aa Perm (Anti-Sune)",
    a: "x L2 D2 L' U' L D2 L' U L' x'"
  },
  {
    name: "Ab Perm (Sune)",
    a: "x' L2 D2 L U L' D2 L U' L x"
  },
  {
    name: "F Perm",
    a: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R"
  },
  {
    name: "Ga Perm",
    a: "R2 U R' U R' U' R U' R2 U' D R' U R D'"
  },
  {
    name: "Gb Perm",
    a: "R' U' R U D' R2 U R' U R U' R U' R2 D"
  },
  {
    name: "Gc Perm",
    a: "R2 U' R U' R U R' U R2 U D' R U' R' D"
  },
  {
    name: "Gd Perm",
    a: "R U R' U' D R2 U' R U' R' U R' U R2 D'"
  },
  {
    name: "Ja Perm",
    a: "x R2 F R F' R U2 r' U r U2 x'"
  },
  {
    name: "Jb Perm",
    a: "R U R' F' R U R' U' R' F R2 U' R'"
  },
  {
    name: "Ra Perm",
    a: "R U' R' U' R U R D R' U' R D' R' U2 R'"
  },
  {
    name: "Rb Perm",
    a: "R2 F R U R U' R' F' R U2 R' U2 R"
  },
  {
    name: "T Perm",
    a: "R U R' U' R' F R2 U' R' U' R U R' F'"
  },
  {
    name: "E Perm",
    a: "x' L' U L D' L' U' L D L' U' L D' L' U L D x"
  },
  {
    name: "Na Perm",
    a: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'"
  },
  {
    name: "Nb Perm",
    a: "R' U R U' R' F' U' F R U R' F R' F' R U' R"
  },
  {
    name: "V Perm",
    a: "R' U R' U' y R' F' R2 U' R' U R' F R F"
  },
  {
    name: "Y Perm",
    a: "F R U' R' U' R U R' F' R U R' U' R' F R F'"
  },

  {
    name: "H Perm",
    a: "M' U M2 U M2 U M' U2 M2"
  },
  {
    name: "Ua Perm",
    a: "M2 U M2 U2 M2 U M2"
  },
  {
    name: "Ub Perm",
    a: "M2 U M U2 M' U M2"
  },
  {
    name: "Z Perm",
    a: "M2 U' M U2 M' U' M2"
  },

];

var algsInfo = {
  "3x3x3": {
    OLL: {
      algos: oll,
      // imageSource: "local",
      // prefixPath:"../utility/pic/"
      // experimentalSetupAnchor:"end",
      experimentalStickering:"OLL",
      visualization:"experimental-2D-LL"
    },
    PLL: {
        algos: pll,
        imageSource: "global",
        experimentalStickering:"PLL",
        visualization:"experimental-2D-LL"
    },
  },
  "skewb":{   // add any more puzzle here
    3334:{ 
      algos: oll,
      experimentalStickering:"OLL",
      visualization:"experimental-2D-LL"
    }
  }

};

const puzzles = ["3x3x3", "skewb"];

const methodOptions = {
  "3x3x3": ["OLL", "PLL"],
  "skewb": ["3334"],
};

export { algsInfo, puzzles, methodOptions };
