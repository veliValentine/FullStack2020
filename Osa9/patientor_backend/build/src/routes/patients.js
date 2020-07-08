"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getPatients());
});
router.post('/', (req, res) => {
    try {
        const newPatient = utils_1.default(req.body);
        const addedPatient = patientsService_1.default.newPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
        else {
            throw e;
        }
    }
});
exports.default = router;
