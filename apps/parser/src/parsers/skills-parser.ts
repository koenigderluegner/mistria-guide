import { Skill } from '@mistria-guide/data-types';
import { TypesGenerator } from '../types-generator/types-generator';
import { TranslationReferenceResolver } from '../localization/tranlation-reference-resolver';

// TODO proper typing
export function skillsParser(
  ui: Record<string, any>,
  perks: Record<string, any>,
  skills: Record<string, { sprite: string }>
) {
  const res: Record<string, Skill> = {};
  const skillIds = Object.keys(skills);
  const perkIds: string[] = [];
  const iconSprites: string[] = [];
  skillIds.forEach((skillId) => {
    const skillSprite = skills[skillId];
    const skillUi = ui[skillId];

    const skill = {
      ...skillUi,
      icon_sprite_key: skillUi.icon_sprite_key + '_enabled',
      sprite: skillSprite.sprite,
    };
    iconSprites.push(skill.sprite);
    iconSprites.push(skill.icon_sprite_key);
    const tierKeys = Object.keys(skill).filter((key) =>
      key.startsWith('tier_')
    );

    tierKeys.forEach((tierKey) => {
      const tier = skill[tierKey];
      tier.forEach((perk) => {
        iconSprites.push(perk.icon);
        perkIds.push(perk.perk);
        console.log();
        Object.assign(perk, perks[perk.perk], {
          name: TranslationReferenceResolver.resolve(perks[perk.perk].name),
          description: TranslationReferenceResolver.resolve(
            perks[perk.perk].description
          ),
        });
      });
    });
    delete skill.default_lut_index;
    delete skill.hovered_lut_index;
    delete skill.disabled_lut_index;
    skill.name = TranslationReferenceResolver.resolve(skill.name);
    res[skillId] = skill satisfies Skill;
  });

  TypesGenerator.addEnum([...new Set(skillIds)], 'SkillId');
  TypesGenerator.addEnum([...new Set(perkIds)], 'PerkId');
  TypesGenerator.addEnum([...new Set(iconSprites)], 'IconSprite');
  return res;
}
