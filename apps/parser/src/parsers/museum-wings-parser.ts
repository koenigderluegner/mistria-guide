import { TypesGenerator } from '../types-generator/types-generator';
import { TranslationReference, WingId } from '@mistria-guide/data-types';
import { TranslationReferenceResolver } from '../localization/tranlation-reference-resolver';

// TODO proper typing
export function museumWingsParser(
  ui: Record<string, any> & {
    wings: {
      wing: string;
      icon_key: string;
    }[];
  },
  musuem_wings: Record<
    WingId,
    { name: TranslationReference; rewards: any[]; sets: Record<string, any> }
  >
) {
  const res: Record<string, any> = {};
  const wingIds = ui.wings.map((wing) => wing.wing);

  const iconSprites: string[] = [];
  const wingSetIds: string[] = [];
  ui.wings.forEach((wing) => {
    const wingIconKey = wing.icon_key.replace(
      'wing_button',
      'wing_button_default'
    );
    wing.icon_key = wingIconKey;
    iconSprites.push(wing.icon_key);
    const sets = ui[`${wing.wing}_order`]
      .map((order) => {
        const setId = `${wing.wing}-${order}`;
        wingSetIds.push(setId);
        const resolvedSet = musuem_wings[wing.wing].sets[order];
        return {
          orderId: order,
          setId,
          ...resolvedSet,
          name: TranslationReferenceResolver.resolve(resolvedSet.name),
          description: TranslationReferenceResolver.resolve(
            resolvedSet.description
          ),
        };
      })
      .reduce((acc, set) => {
        acc[set.orderId] = set;
        return acc;
      }, {});

    Object.assign(wing, {
      sets,
      name: TranslationReferenceResolver.resolve(musuem_wings[wing.wing].name),
    });

    res[wing.wing] = wing;
  });

  TypesGenerator.addEnum([...new Set(iconSprites)], 'IconSprite');
  TypesGenerator.addEnum([...new Set(wingIds)], 'WingId');
  TypesGenerator.addEnum([...new Set(wingSetIds)], 'WingSetId');
  return res;
}
