'use strict';
const shim = require('fabric-shim');

let TradeContract = class {

    async Init(stub) {
        return shim.success();
    }

    async Invoke(stub) {
        return shim.success();
    }

};

shim.start(new TradeContract());
