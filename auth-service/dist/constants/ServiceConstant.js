"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY = exports.CONCERT_SERVICE_CREATE_CART_ENDPOINT = exports.CONCERT_SERVICE_PATH = exports.CONCERT_SERVICE_BASEURL = exports.CONCERT_SERVICE_PORT = exports.CONCERT_SERVICE_HOST = exports.ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS = exports.ACCOUNT_SERVICE_PATH = exports.ACCOUNT_SERVICE_BASEURL = exports.ACCOUNT_SERVICE_PORT = exports.ACCOUNT_SERVICE_HOST = void 0;
const process = __importStar(require("node:process"));
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const envFilePath = '../../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });
exports.ACCOUNT_SERVICE_HOST = process.env.ACCOUNT_SERVICE_HOST;
exports.ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT;
exports.ACCOUNT_SERVICE_BASEURL = `http://${exports.ACCOUNT_SERVICE_HOST}:${exports.ACCOUNT_SERVICE_PORT}`;
exports.ACCOUNT_SERVICE_PATH = '/api/v1/account';
exports.ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS = '/users';
exports.CONCERT_SERVICE_HOST = process.env.CONCERT_SERVICE_HOST;
exports.CONCERT_SERVICE_PORT = process.env.CONCERT_SERVICE_PORT;
exports.CONCERT_SERVICE_BASEURL = `http://${exports.CONCERT_SERVICE_HOST}:${exports.CONCERT_SERVICE_PORT}`;
exports.CONCERT_SERVICE_PATH = '/api/v1/business';
exports.CONCERT_SERVICE_CREATE_CART_ENDPOINT = '/carts';
exports.API_KEY = process.env.API_KEY;
//# sourceMappingURL=ServiceConstant.js.map