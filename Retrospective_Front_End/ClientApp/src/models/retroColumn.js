"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RetroColumn = /** @class */ (function () {
    function RetroColumn(id, title, retrocards) {
        this.id = id;
        this.title = title;
        this.retrocards = retrocards;
    }
    RetroColumn.prototype.addRetroCard = function (retrocard) {
        this.retrocards.push(retrocard);
    };
    RetroColumn.prototype.removeRetroCard = function (retrocardId) {
        if (retrocardId >= 0) {
            this.retrocards.filter(function (rc) { return rc.id != retrocardId; });
        }
    };
    return RetroColumn;
}());
exports.RetroColumn = RetroColumn;
//# sourceMappingURL=retroColumn.js.map