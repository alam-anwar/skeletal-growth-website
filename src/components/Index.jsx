import React from 'react'
import { phyloTree } from '../data/TreeStructure'

export default function Index() {
    function generateIndex(obj, stack, ret) {
        const delimiter = '.'

        { /* this isn't acting right. phyloTree clearly has 'children' defined, but it always returns undefined. */ }
        if (obj.children === undefined) {
            ret.push(stack + delimiter + (obj['name'] === "" ? "<no name>" : obj['name']))
            return
        } else {
            let child = obj.children
            for (var item in child) {
                generateIndex(child[item], stack + delimiter + (obj['name'] === "" ? "<no name>" : obj['name']), ret)
            }
        }

        return ret
    }

    let flatTree = []
    generateIndex(phyloTree, 'root', flatTree)
    console.log(flatTree)
    
    return (
        <div>
            <ul>
                {flatTree.map(x => <li>{x}</li>)}
            </ul>
        </div>
    )
}
  