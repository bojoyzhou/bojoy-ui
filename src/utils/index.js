function prefix(name) {
    return `zi-${name}`
}

function except(obj1, obj2) {
    var obj3 = {}
    for (var i in obj1) {
        if (!obj2.hasOwnProperty(i)) {
            obj3[i] = obj1[i]
        }
    }
    return obj3
}

function classnames() {
    return Array.prototype.slice.call(arguments).join(' ')
}
export {
    prefix,
    except,
    classnames
}
