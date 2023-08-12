// eslint-disable-next-line import/prefer-default-export
export const adjustHexColor = (hexColor, amount) => {
    const color = hexColor.replace(/^#/, '');

    const newColor = color.replace(/../g, (originalColor: string) => {
        const computedColor = Math.min(255, Math.max(0, parseInt(originalColor, 16) + amount)).toString(16);

        return `0${computedColor}`.substr(-2);
    });

    return `#${newColor}`;
};
