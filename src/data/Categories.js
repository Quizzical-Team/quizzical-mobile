import Category from "./dataTemplate/Category";

export const gameModes = [
    new Category(1, "Ranked", "#EE657E", "RANKED"),
    new Category(2, "One o One", "#FFF2AC", "ONE-O-ONE"),
    new Category(3, "Speed Run", "#f7594a", "SPEEDRUN"),
    new Category(4, "Streak", "#f7a840", "STREAK")
]

export const categories = [
    new Category(1, "History", "#EE657E", "HISTORY", "calendar"),
    new Category(2, "Sports", "#FFF2AC", "SPORTS", "dribbble"),
    new Category(3, "Entertainment", "#b885ff", "ENTERTAINMENT", "smileo"),
    new Category(4, "General", "#ACB0FF", "GENERAL", "earth"),
    new Category(5, "Math", "#ff926e", "MATH", "areachart"),
    new Category(6, "Art", "#ffabf1", "ART", "picture"),
]
