import { testData } from "./sample.mjs";

export function treeMaker(obj, arr = []) {

    // base case: current node has no children.
    if (!obj.parent_of || obj.parent_of.length === 0) {
        // add the name of the node, its long name, and any other keys that are there.
        arr.push({
            name: obj.name,
            longName: obj.long_name
        });
        // return.
        return arr;
    }

    // recursive case: node has children.
    if (obj.parent_of && obj.parent_of.length > 0) {
        // if there's a gap between child node and last seen node (i.e. Order -> Family):
        // add empty objects until the levels are in line with each other.
        // (Assuming we have a way to determine the level and last seen node)

        // add the node.
        arr.push({
            name: obj.name
        });

        // for each child:
        for (let child in obj.parent_of) {
            // call treeMaker() on the child node.
            treeMaker(obj.parent_of[child], arr);
        }
    }

    return ret;
}

let result = []

for (let child in testData) {
    result.push(treeMaker(testData[child]._fields[0], []))
}