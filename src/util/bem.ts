type Modifiers = Record<string, boolean>;
type Block = boolean | Modifiers;
type Blocks = Record<string, Block>;

const modifiersFor = (block: Block, clss: string): string[] =>
  Object.entries(block)
    .filter(([_, active]: [string, boolean]) => active)
    .map(([key]: [string, boolean]) => `${clss}${key}`);

const classListFor = (blocks: Blocks): string[] =>
  Object.entries(blocks)
    .filter(([_, block]: [string, Block]): Block => block)
    .reduce((classes: string[], [clss, block]: [string, Block]): string[] => {
      return typeof block === "object"
        ? classes.concat(clss, modifiersFor(block, clss))
        : classes.concat(clss);
    }, []);

const bem = (blocks: Blocks): string => classListFor(blocks).join(" ");

export default bem;
