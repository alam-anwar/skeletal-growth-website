export function treeMaker(obj) {
    let ret = []
    // base case: current node has no children.
    if (!obj.parent_of || obj.parent_of.length === 0) {
        // add the name of the node, its long name, and any other keys that are there.
        ret.push({
            name: obj.name,
            longName: obj.long_name
        });
        // return.
        return ret;
    }

    // recursive case: node has children.
    if (obj.parent_of && obj.parent_of.length > 0) {
        // if there's a gap between child node and last seen node (i.e. Order -> Family):
        // add empty objects until the levels are in line with each other.
        // (Assuming we have a way to determine the level and last seen node)

        let childrenItems = []
        // for each child:
        for (let child of obj.parent_of) {
            // call treeMaker() on the child node.
            childrenItems.push(treeMaker(child));
        }

        // add the node.
        ret.push({
            name: obj.name,
            children: childrenItems.flat(1)
        });
    }

    return ret;
}