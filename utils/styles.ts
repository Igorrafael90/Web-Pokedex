export function getTypeImage(typeName: string): string {
    const colors: {[key: string]: string } = {
        fire: "/icons/fire.svg"
    };
    return colors[typeName] || "/public/fire.png"
  }