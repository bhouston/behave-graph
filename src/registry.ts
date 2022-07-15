
import { NodeSpec } from "./spec";

export class NodeSpecRegistry {
    public nodeSpecs : NodeSpec[] = [];

    constructor() {
    }

    add( nodeSpec: NodeSpec ) {
        if( this.getByName( nodeSpec.name ) !== undefined ) {
            throw new Error( `nodeSpec with name ${nodeSpec.name} is already added to registry` );
        }
        this.nodeSpecs.push( nodeSpec );

        return this;
    }

    getByName( nodeSpecName: string ): NodeSpec | undefined {
        return this.nodeSpecs.find( ( nodeSpec ) => nodeSpec.name === nodeSpecName );
    }
}


export const GlobalNodeSpecRegistry = new NodeSpecRegistry();