module.exports = {
    "env": {
        "browser": true,
        "jquery": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 5
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-global-assign": ["off"],
        "no-undef": ["off"],
        "no-unused-vars": ["off"],
        "no-console": ["warn"],
        
    },
    // "globals": {
    //     "Barba": false,
    //     "Cookies": false,
    //     "progressCookieName": false,
    //     "instantiateSlider": false,
    //     "instantiateIntro": false,
    //     "darkBackground": false,
    //     "lightBackground": false,
    //     "initializeBranching": false,
    //     "baseurl": false,
    //     "createProgress": false,
    //     "lastmoduleSlide": false,
    //     "clearBackground": false,
    //     "setBackground": false,
    //     "initializeCaseStudy": false,
    //     "finalizeCaseStudy": false,
    //     "instantiateModule": false,
    //     "lastmoduleSlide": false,
    //     "updateMoreOnTopicUI": false,
    //     "instantiateMore": false,
    //     "updateProgress": false,
    //     "Promise": false,
    //     "lastElementClicked": false,
    //     "introInstantiated": false,
    //     "currentPage": false,
    // }
};