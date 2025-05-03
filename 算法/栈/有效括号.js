function validParentheses(str) {
    let map = {
        "{": "}",
        "[": "]",
        "(": ")"
    }
    const stack = [];

    if (str % 2) {
        return false
    }

    for (let i = 0; i < str.length; i++) {
        //从栈里拿一个
        let current = stack?.pop()
        if (current) {
            if (map[current] !== str[i]) {
                stack.push(current)
                stack.push(str[i])
            }
        } else {

            stack.push(str[i])
        }
    }

    return stack?.length === 0


}