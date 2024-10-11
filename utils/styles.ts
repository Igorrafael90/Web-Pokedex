export function getTypeImage(typeName: string): string {
    const colors: { [key: string]: string } = {
        fire: "/icons/fire.svg",
        flying: "/icons/flying.svg",
        bug: "/icons/bug.svg",
        water: "/icons/water.svg",
        steel: "/icons/steel.svg",
        normal: "/icons/normal.svg",
        psychic: "/icons/psychic.svg",
        ghost: "/icons/ghost.svg",
        ice: "/icons/ice.svg",
        dark: "/icons/dark.svg",
        dragon: "/icons/dragon.svg",
        poison: "/icons/poison.svg",
        electric: "/icons/electric.svg",
        fairy: "/icons/fairy.svg",
        fighting: "/icons/fighting.svg",
        grass: "/icons/grass.svg",
        ground: "/icons/ground.svg",
        rock: "/icons/rock.svg",
    };
    return colors[typeName] || "/public/fire.png";
}
