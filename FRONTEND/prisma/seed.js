"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var faker_1 = require("@faker-js/faker");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var users, categories, paymentTypes, _loop_1, _i, users_1, user, statuses, _loop_2, _a, users_2, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Seeding database...");
                    return [4 /*yield*/, Promise.all(Array.from({ length: 3 }).map(function () {
                            return prisma.user.create({
                                data: {
                                    id: faker_1.faker.string.uuid(),
                                    name: faker_1.faker.person.fullName(),
                                    email: faker_1.faker.internet.email(),
                                    password: faker_1.faker.internet.password(),
                                    createdAt: faker_1.faker.date.past(),
                                },
                            });
                        }))];
                case 1:
                    users = _b.sent();
                    categories = ["Alimentação", "Transporte", "Salário", "Lazer", "Educação"];
                    paymentTypes = ["cartao", "pix", "boleto"];
                    _loop_1 = function (user) {
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, Promise.all(Array.from({ length: faker_1.faker.number.int({ min: 5, max: 15 }) }).map(function () {
                                        return prisma.transaction.create({
                                            data: {
                                                id: faker_1.faker.string.uuid(),
                                                description: faker_1.faker.lorem.words(3),
                                                amount: parseFloat(faker_1.faker.finance.amount({ min: 10, max: 5000, dec: 2 })), // Correção aqui
                                                type: faker_1.faker.helpers.arrayElement(["income", "expense"]),
                                                date: faker_1.faker.date.past(),
                                                category: faker_1.faker.helpers.arrayElement(categories),
                                                paymentType: faker_1.faker.helpers.arrayElement(paymentTypes),
                                                userId: user.id,
                                            },
                                        });
                                    }))];
                                case 1:
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, users_1 = users;
                    _b.label = 2;
                case 2:
                    if (!(_i < users_1.length)) return [3 /*break*/, 5];
                    user = users_1[_i];
                    return [5 /*yield**/, _loop_1(user)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    statuses = ["paid", "pending"];
                    _loop_2 = function (user) {
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, Promise.all(Array.from({ length: faker_1.faker.number.int({ min: 3, max: 10 }) }).map(function () {
                                        return prisma.account.create({
                                            data: {
                                                id: faker_1.faker.string.uuid(),
                                                title: faker_1.faker.commerce.productName(),
                                                amount: parseFloat(faker_1.faker.finance.amount({ min: 50, max: 3000, dec: 2 })), // Correção aqui
                                                dueDate: faker_1.faker.date.future(),
                                                status: faker_1.faker.helpers.arrayElement(statuses),
                                                userId: user.id,
                                            },
                                        });
                                    }))];
                                case 1:
                                    _d.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = 0, users_2 = users;
                    _b.label = 6;
                case 6:
                    if (!(_a < users_2.length)) return [3 /*break*/, 9];
                    user = users_2[_a];
                    return [5 /*yield**/, _loop_2(user)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9:
                    console.log("Database seeded successfully!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
