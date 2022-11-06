"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
class Link {
    constructor(nodeId, socketName) {
        this.nodeId = nodeId;
        this.socketName = socketName;
        //if (nodeId.length === 0) throw new Error('nodeId can not be empty');
        //if (socketName.length === 0) throw new Error('socketName can not be empty');
    }
}
exports.Link = Link;
