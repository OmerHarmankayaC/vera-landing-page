with open("styles.css", "r") as f:
    text = f.read()

opens = text.count("{")
closes = text.count("}")
print("Opens:", opens, "Closes:", closes)
