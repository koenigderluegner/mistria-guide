import { EnvironmentConfig } from "./environment-config.interface";
import path from "path";

export const environment: EnvironmentConfig = {
    assetPath: path.join(__dirname, '..', 'assets',),
    generatedOutputPath: path.join(__dirname, '..', 'generated',)
};
