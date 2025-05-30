export const ToolTypes = ['axe','fishing_rod','hoe','net','pick_axe','shovel','watering_can'] as const;

export type ToolType = typeof ToolTypes[number];