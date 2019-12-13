"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Retrospective = /** @class */ (function () {
    function Retrospective(id, title, description, retroColumns) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.retroColumns = retroColumns;
    }
    ;
    Retrospective.prototype.addRetroColumn = function (retrocolumn) {
        this.retroColumns.push(retrocolumn);
    };
    Retrospective.prototype.removeRetroColumn = function (retrocolumnId) {
        if (function (retrocolumnId) { return 0; }) {
            this.retroColumns.filter(function (rc) { return rc.id != retrocolumnId; });
        }
    };
    return Retrospective;
}());
exports.Retrospective = Retrospective;
//# sourceMappingURL=retrospective.js.map