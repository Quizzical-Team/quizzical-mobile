import Category from "./dataTemplate/Category";

export const gameModes = [
    new Category(1, "Ranked", ["#ff4b2b", "#ff8c78"], "RANKED", "earth"),
    new Category(2, "One o One",  ["#1cff42", "#63ff7d"], "ONEOONE", "addusergroup"),
    new Category(3, "Speed Run",  ["#008cf7", "#5eb9ff"], "SPEEDRUN", "hourglass"),
    new Category(4, "Streak",  ["#ff8000", "#ffad5c"], "STREAK", "rocket1")
]

export const categories = [
    new Category(1, "History", "#EE657E", "HISTORY", "calendar"),
    new Category(2, "Sports", "#FFF2AC", "SPORTS", "dribbble"),
    new Category(3, "Entertainment", "#b885ff", "ENTERTAINMENT", "smileo"),
    new Category(4, "General", "#ACB0FF", "GENERAL", "earth"),
    new Category(5, "Math", "#ff926e", "MATH", "areachart"),
    new Category(6, "Art", "#ffabf1", "ART", "picture"),
]
