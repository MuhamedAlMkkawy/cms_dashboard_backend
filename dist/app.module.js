"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const projects_module_1 = require("./projects/projects.module");
const typeorm_1 = require("@nestjs/typeorm");
const projects_entities_1 = require("./projects/entities/projects.entities");
const config_1 = require("@nestjs/config");
const pages_module_1 = require("./pages/pages.module");
const pages_entities_1 = require("./pages/entities/pages.entities");
const components_module_1 = require("./components/components.module");
const components_entities_1 = require("./components/entities/components.entities");
const uploads_controller_1 = require("./uploads/uploads.controller");
const statistics_module_1 = require("./statistics/statistics.module");
const users_module_1 = require("./users/users.module");
const auth_service_1 = require("./auth/auth.service");
const auth_module_1 = require("./auth/auth.module");
const users_entities_1 = require("./users/entities/users.entities");
const jwt_1 = require("@nestjs/jwt");
const auth_guard_1 = require("./guards/auth.guard");
const nestjs_i18n_1 = require("nestjs-i18n");
const path_1 = require("path");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(nestjs_i18n_1.I18nMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: process.env.MONGO_URL,
                synchronize: true,
                autoLoadEntities: true,
                entities: [projects_entities_1.Projects, pages_entities_1.Pages, components_entities_1.Components, users_entities_1.Users],
            }),
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: 'en',
                loaderOptions: {
                    path: (0, path_1.join)(process.cwd(), 'src/i18n/'),
                    watch: true,
                },
                resolvers: [
                    new nestjs_i18n_1.QueryResolver(['lang', 'l']),
                    new nestjs_i18n_1.AcceptLanguageResolver(),
                    new nestjs_i18n_1.HeaderResolver(['x-custom-lang']),
                ],
            }),
            projects_module_1.ProjectsModule,
            pages_module_1.PagesModule,
            components_module_1.ComponentsModule,
            statistics_module_1.StatisticsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '60m' },
            }),
        ],
        controllers: [app_controller_1.AppController, uploads_controller_1.UploadsController],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            auth_guard_1.AuthGuard,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map