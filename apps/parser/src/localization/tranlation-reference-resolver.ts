import { readAsset } from '../util/read-asset';
import { TranslationReference } from '@mistria-guide/data-types';

export class TranslationReferenceResolver {
  static #translationReferences: Record<
    TranslationReference,
    TranslationReference
  > = {};

  static resolve(reference: TranslationReference) {
    return this.#translationReferences[reference] ?? reference;
  }

  static readTranslationFile(path: string) {
    const asset =
      readAsset<
        Record<
          'eng' | 'jpn',
          Record<TranslationReference, TranslationReference>
        >
      >(path);

    Object.assign(this.#translationReferences, asset.eng);
  }
}
