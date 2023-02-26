const NoteColourMapper = (colour, theme) => {
    console.log(colour);
    switch (colour) {
        case "light":
            return "white";
        case "dark":
            return "black";

        case "danger":
            return theme === "light" ? "#ffcccc" : "#ff9999";

        case "success":
            return theme === "light" ? "#ccffcc" : "#99ff99";

        case "primary":
            return theme === "light" ? "#ccf5ff" : "#99ebff";

        case "warning":
            return theme === "light" ? "#ffffb3" : "#ffff80";

        default:
            return "blank";
    }
}

export default NoteColourMapper;
