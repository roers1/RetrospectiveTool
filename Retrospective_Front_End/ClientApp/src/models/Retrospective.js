"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Retrospective = /** @class */ (function () {
    function Retrospective(id, title, description, retroColumns) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.retroColumns = retroColumns;
    }
    Retrospective.prototype.addRetroColumn = function (column) {
        this.retroColumns.push(column);
    };
    Retrospective.prototype.removeRetroColumn = function (columnId) {
        this.retroColumns.filter(function (rc) { return rc.id !== columnId; });
    };
    return Retrospective;
}());
exports.Retrospective = Retrospective;
//# sourceMappingURL=retrospective.js.map