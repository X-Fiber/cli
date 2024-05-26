import { injectable } from "~packages";
import type { IAbstractMenu } from "~types";

@injectable()
export abstract class AbstractMenu implements IAbstractMenu {
  public abstract publicMenu(): Promise<void>;

  protected get separator() {
    return console.log("");
  }
}
