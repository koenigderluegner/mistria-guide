import { pascalCaseToKebabCase } from '../util/string-utils';
import { environment } from '../environments/environment';
import { createPathIfNotExists } from '../util/create-path-if-not-exists';
import path from 'path';
import fs from 'fs';

export class TypesGenerator {
  private static enums: {
    values: string[];
    enumName: string;
    valuesName?: string;
  }[] = [];

  private static fileBaseNames: string[] = [];

  static addEnum(values: string[], enumName: string, valuesName?: string) {
    const existingEnum = this.enums.find((e) => e.enumName === enumName);
    if (existingEnum) {
      existingEnum.values = [...new Set([...existingEnum.values, ...values])];
    } else {
      this.enums.push({ values, enumName, valuesName });
    }
  }

  static generate() {
    this.generateEnums();
    this.generateIndexFile();
  }

  private static generateEnums() {
    this.enums.forEach((enumEntry) => {
      const valuesName = enumEntry.valuesName ?? enumEntry.enumName + 's';
      const content = `export const ${valuesName} = ${JSON.stringify(
        enumEntry.values
      ).replaceAll('"', "'")} as const;

export type ${enumEntry.enumName} = typeof ${valuesName}[number];`;
      const fileBaseName = pascalCaseToKebabCase(enumEntry.enumName);
      this.fileBaseNames.push(fileBaseName);
      const fileName = fileBaseName + '.ts';
      this.writeFile(fileName, content);
    });
  }

  private static generateIndexFile() {
    const content = this.fileBaseNames
      .map((fileName) => `export * from './${fileName}';`)
      .join('\n');
    const fileName = 'index.ts';
    this.writeFile(fileName, content);
  }

  private static writeFile(fileName: string, content: string) {
    const targetPath = environment.generatedDataTypesPath;

    createPathIfNotExists(targetPath);

    const filePath = path.join(targetPath, fileName);

    fs.writeFileSync(filePath, content, {
      encoding: 'utf8',
      flag: 'w+',
    });
  }
}
