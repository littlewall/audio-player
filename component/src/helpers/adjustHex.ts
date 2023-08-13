// eslint-disable-next-line import/prefer-default-export
export const adjustHex = (color: string, amount: number) => {
    const finalColor = color.replace(/^#/, '').replace(/../g, tempColor => (`0${Math.min(255, Math.max(0, parseInt(tempColor, 16) + amount)).toString(16)}`).substr(-2));

    return (`#${finalColor}`);
};
