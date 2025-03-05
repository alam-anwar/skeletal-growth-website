export function treeMaker(obj) {
    const taxonomyLevels = ["Order", "Infraorder", "Level3", "Parvorder", "Family", "GenusSpecies"] 
    // todo: pull from DB to get all taxonomy levels.
    // todo: update list of taxonomy levels if levels change in the future.

    let ret = []
    // base case: current node has no children.
    if (!obj.parent_of || obj.parent_of.length === 0) {
        // add the name of the node, its long name, and any other keys that are there.
        ret.push({
            name: obj.name
        });
        // return.
        return ret;
    }

    // recursive case: node has children.
    if (obj.parent_of && obj.parent_of.length > 0) {
        // if there's a gap between child node and parent node (i.e. Order -> Family):
        // add empty objects until the levels are in line with each other.

        let childrenItems = []
        // for each child:
        for (let child of obj.parent_of) {
            // call treeMaker() on the child node.
            childrenItems.push(treeMaker(child)); // ! adding node between existing nodes causes issues with children nodes. need to investigate.
        }

        // add the node.
        ret.push({
            name: obj.name,
            children: childrenItems.flat(1)
        });
    }

    return ret;
}