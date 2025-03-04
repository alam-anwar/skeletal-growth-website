export function treeMaker(obj, ret = []) {
    let temp = obj._fields[0]

    // base case: current node has no children.
    if (!temp.parent_of || temp.parent_of.length === 0) {
        // add the name of the node, its long name, and any other keys that are there.
        ret.push({
            name: temp.name,
            longName: temp.long_name
        });
        // return.
        return ret;
    }

    // recursive case: node has children.
    if (temp.parent_of && temp.parent_of.length > 0) {
        // if there's a gap between child node and last seen node (i.e. Order -> Family):
        // add empty objects until the levels are in line with each other.
        // (Assuming we have a way to determine the level and last seen node)

        // add the node.
        ret.push({
            name: temp.name
        });

        // for each child:
        for (let child of temp.parent_of) {
            // call treeMaker() on the child node.
            treeMaker(temp[child], ret);
        }
    }

    return ret;
}