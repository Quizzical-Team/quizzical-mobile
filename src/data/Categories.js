import Category from "./dataTemplate/Category";

export const gameModes = [
    new Category(1, "Ranked", ["#ffd5c9", "#ffd5c9"], "RANKED", "earth"),
    new Category(2, "One o One",  ["#c9ffc2", "#c9ffc2"], "ONEOONE", "addusergroup"),
    new Category(3, "Speed Run",  ["#ccecff", "#ccecff"], "SPEEDRUN", "hourglass"),
    new Category(4, "Streak",  ["#ffca8a", "#ffca8a"], "STREAK", "rocket1")
]

export const categories = [
    new Category(1, "History", "#EE657E", "HISTORY", "calendar"),
    new Category(2, "Sports", "#FFF2AC", "SPORTS", "dribbble"),
    new Category(3, "Entertainment", "#b885ff", "ENTERTAINMENT", "smileo"),
    new Category(4, "General", "#ACB0FF", "GENERAL", "earth"),
    new Category(5, "Math", "#ff926e", "MATH", "areachart"),
    new Category(6, "Art", "#ffabf1", "ART", "picture"),
]
